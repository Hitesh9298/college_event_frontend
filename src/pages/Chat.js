import React, { useState, useEffect, useRef, useMemo } from 'react';
import { io } from 'socket.io-client';
import { MessageCircle, Send, Upload, User, Smile, Download } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import CreateGroup from '../components/CreateGroup';
import { useNavigate } from 'react-router-dom';
import './Chat.css';
import { SOCKET_URL } from '../config';

function Chat() {
  const navigate = useNavigate();
  const socketRef = useRef(null);
  const chatEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const [authData] = useState(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const profileName = localStorage.getItem('profileName');
    
    if (!username && !profileName) {
      console.warn('No username or profileName found in localStorage');
    }
    
    return { userId, token, username, profileName };
  });

  const [state, setState] = useState({
    messages: [],
    onlineUsers: {},
    selectedUser: null,
    selectedGroup: null,
    error: null,
    connectionStatus: 'connecting',
    typingUsers: new Set(),
    groups: [],
    showEmojiPicker: false,
    showCreateGroup: false,
  });

  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (!authData.userId || !authData.token) {
        navigate('/login');
        return;
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [authData.userId, authData.token, navigate]);
  
  useEffect(() => {
    if (!authData.userId || !authData.token) return;
  
    socketRef.current = io(SOCKET_URL, {
      auth: {
        token: authData.token,
        userId: authData.userId,
        username: authData.username || 'User',
        profileName: authData.profileName
      },
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Connected with auth data:', authData);
      setState((prev) => ({ ...prev, connectionStatus: 'connected' }));
      socket.emit('online', {
        userId: authData.userId,
        username: authData.username,
        profileName: authData.profileName
      });
    });

    socket.on('disconnect', () => {
      setState((prev) => ({ ...prev, connectionStatus: 'disconnected' }));
    });

    socket.on('updateUsers', (users) => {
      const formattedUsers = users.reduce((acc, user) => {
        if (user.userId !== authData.userId) {
          acc[user.userId] = {
            id: user.userId,
            username: user.username,
            profileName: user.profileName,
            name: user.profileName || user.username,
            online: true
          };
        }
        return acc;
      }, {});
      setState((prev) => ({ ...prev, onlineUsers: formattedUsers }));
    });

    socket.on('groupCreated', (groupData) => {
      console.log('Group created event received:', groupData);
      setState((prev) => ({
        ...prev,
        groups: [...prev.groups, {
          id: groupData.groupId,
          name: groupData.name,
          members: groupData.members
        }]
      }));

      // Automatically join the group
      socket.emit('joinGroup', { groupId: groupData.groupId });
    });

   // Update receiveMessage handler in useEffect
socket.on('receiveMessage', (message) => {
  setState((prev) => {
    // Avoid duplicate messages
    const messageExists = prev.messages.some(m => m.id === message.id);
    if (messageExists) return prev;

    return {
      ...prev,
      messages: [...prev.messages, message]
    };
  });
});

socket.on('messageSent', ({ status, message }) => {
  setState((prev) => {
    // Only update status for existing message
    return {
      ...prev,
      messages: prev.messages.map(msg =>
        msg.id === message.id ? { ...msg, status } : msg
      )
    };
  });
});

    socket.on('receiveFile', (message) => {
      setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    });

    socket.on('fileSent', ({ message }) => {
      setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, [authData]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  const handleUserSelect = (userId) => {
    setState((prev) => ({
      ...prev,
      selectedUser: userId,
      selectedGroup: null,
    }));
  };

  const handleTyping = () => {
    const socket = socketRef.current;
    if (!socket || (!state.selectedUser && !state.selectedGroup)) return;

    socket.emit('typing', {
      receiver: state.selectedUser || state.selectedGroup,
      sender: authData.userId,
    });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stopTyping', {
        receiver: state.selectedUser || state.selectedGroup,
        sender: authData.userId,
      });
    }, 2000);
  };

  const sendMessage = () => {
    const socket = socketRef.current;
    if (!socket || !message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: authData.userId,
      senderName: authData.profileName || authData.username,
      receiver: state.selectedGroup || state.selectedUser,
      message: message.trim(),
      timestamp: Date.now(),
      type: state.selectedGroup ? 'group' : 'direct',
      status: 'sending',
      profileName: authData.profileName
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));

    socket.emit('sendMessage', newMessage);
    setMessage('');
  };

  const handleEmojiButtonClick = () => {
    setState((prev) => ({ ...prev, showEmojiPicker: !prev.showEmojiPicker }));
  };

  const handleEmojiPickerClose = () => {
    setState((prev) => ({ ...prev, showEmojiPicker: false }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = {
          file: {
            name: file.name,
            type: file.type,
            data: reader.result,
          },
          receiver: state.selectedUser || state.selectedGroup,
          type: state.selectedUser ? 'private' : 'group',
          sender: authData.userId,
        };
        socketRef.current.emit('sendFile', fileData);
        setFile(null); // Clear the file input after upload
      };
      reader.readAsDataURL(file);
    }
  };

  const onlineUsersList = useMemo(() => {
    return Object.entries(state.onlineUsers).map(([userId, user]) => (
      userId !== authData.userId && (
        <button
          key={userId}
          className={`user-item ${state.selectedUser === userId ? 'active' : ''}`}
          onClick={() => handleUserSelect(userId)}
        >
          <div className="user-info">
            <User className="icon" />
            <span className="user-name">
              {user.displayName || user.profileName || user.username || 'Unknown User'}
            </span>
            <span className={`status-dot ${user.online ? 'online' : 'offline'}`} />
          </div>
        </button>
      )
    ));
  }, [state.onlineUsers, state.selectedUser, authData.userId]);
  return (
    <div className="chat-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <User className="icon" />
          <h2>Chats</h2>
        </div>

        <div className={`connection-status ${state.connectionStatus}`}>
          {state.connectionStatus === 'connected' ? 'Connected' : 'Connecting...'}
        </div>

        <div className="section-header">
          <h3>Direct Messages</h3>
        </div>
        <div className="users-list">
          {onlineUsersList.length === 0 ? (
            <div className="no-users">No users online</div>
          ) : (
            onlineUsersList
          )}
        </div>

        <div className="section-header">
          <h3>Groups</h3>
          <button
            className="create-group-button"
            onClick={() => setState(prev => ({ ...prev, showCreateGroup: true }))}
          >
            + New Group
          </button>
        </div>
        <div className="groups-list">
          {state.groups.map(group => (
            <button
              key={group.id}
              onClick={() => setState(prev => ({
                ...prev,
                selectedGroup: group.id,
                selectedUser: null
              }))}
              className={`group-item ${state.selectedGroup === group.id ? 'active' : ''}`}
            >
              <div className="group-info">
                <div className="group-name">{group.name || group.id}</div>
                <span className="member-count">{group.members.length} members</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="chat-area">
        <div className="chat-header">
          <MessageCircle className="icon" />
          <h2>
          {state.selectedGroup
      ? `Group: ${state.groups.find(g => g.id === state.selectedGroup)?.name || state.selectedGroup}`
      : state.selectedUser
        ? `Chat with ${state.onlineUsers[state.selectedUser]?.displayName || 
            state.onlineUsers[state.selectedUser]?.profileName || 
            state.onlineUsers[state.selectedUser]?.username || 
            'Unknown User'}`
        : 'Select a chat to start messaging'}
          </h2>
        </div>

        {state.error && (
          <div className="error-message">
            {state.error}
          </div>
        )}

        <div className="messages-container">
          <div className="messages">
            {state.messages
              .filter(msg => {
                if (state.selectedGroup) {
                  return msg.receiver === state.selectedGroup;
                }
                return (msg.sender === authData.userId && msg.receiver === state.selectedUser) ||
                  (msg.receiver === authData.userId && msg.sender === state.selectedUser);
              })
              .map((msg, index) => (
                <div
                  key={index}
                  className={`message-wrapper ${msg.sender === authData.userId ? 'sent' : 'received'}`}
                >
                  <div className="message">
                    <div className="message-sender">
                      {msg.sender === authData.userId ? 'You' : (
                        msg.senderName ||
                        state.onlineUsers[msg.sender]?.profileName ||
                        state.onlineUsers[msg.sender]?.username ||
                        'Unknown User'
                      )}
                    </div>
                    <div className="message-content">
                      {msg.messageType === 'file' ? (
                        <div>
                          <strong>{msg.sender === authData.userId ? 'You' : msg.senderName}</strong>: 
                          <a href={msg.file.data} download={msg.file.name}>
                            <Download className="icon" /> {msg.file.name}
                          </a>
                        </div>
                      ) : (
                        <p>{msg.message}</p>
                      )}
                    </div>
                    <div className="message-info">
                      <span className="timestamp">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      {msg.status && (
                        <span className="status">{msg.status}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            <div ref={chatEndRef} />
          </div>
        </div>

        <div className="chat-input">
          {state.typingUsers.size > 0 && (
            <div className="typing-indicator">
              {Array.from(state.typingUsers)
                .map(userId => state.onlineUsers[userId]?.profileName || state.onlineUsers[userId]?.username || userId)
                .join(', ')} is typing...
            </div>
          )}

          <div className="message-input">
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && sendMessage()}
              onInput={handleTyping}
              placeholder="Type your message..."
              disabled={!state.selectedUser && !state.selectedGroup}
            />
            <button
              onClick={handleEmojiButtonClick}
              className="emoji-button"
              disabled={!state.selectedUser && !state.selectedGroup}
            >
              <Smile className="icon" />
            </button>
            {state.showEmojiPicker && (
              <div className="emoji-picker-container">
                <EmojiPicker
                  onEmojiClick={(emojiObject) => {
                    setMessage(prev => prev + emojiObject.emoji);
                    handleEmojiPickerClose();
                  }}
                  disableAutoFocus
                  native
                />
              </div>
            )}
            <button
              onClick={sendMessage}
              disabled={!message.trim() || (!state.selectedUser && !state.selectedGroup)}
              className="send-button"
            >
              <Send className="icon" />
              Send
            </button>
          </div>

          <div className="file-input">
            <input
              type="file"
              onChange={handleFileChange}
            />
            <button
              onClick={handleFileUpload}
              disabled={(!state.selectedUser && !state.selectedGroup) || !file}
              className="upload-button"
            >
              <Upload className="icon" />
              Upload
            </button>
          </div>
        </div>
      </div>

      {state.showCreateGroup && (
        <CreateGroup
          onClose={() => setState((prev) => ({ ...prev, showCreateGroup: false }))}
          onlineUsers={state.onlineUsers}
          currentUserId={authData.userId}
          socket={socketRef.current}
        />
      )}
    </div>
  );
}

export default Chat;