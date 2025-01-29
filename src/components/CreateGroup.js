import React, { useState, useEffect } from 'react';
import './CreateGroup.css';

function CreateGroup({ onClose, onlineUsers, currentUserId, socket }) {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [error, setError] = useState('');

  // Handle group creation
 
  const handleCreateGroup = () => {
    if (!groupName.trim() || selectedMembers.length === 0) {
      setError('Group name and members are required');
      return;
    }
  
    const validMembers = selectedMembers
      .filter(id => id && id !== 'undefined' && id !== currentUserId);
  
    const groupData = {
      groupId: `group_${Date.now()}`,
      groupName: groupName.trim(),
      members: [...validMembers, currentUserId]
    };
  
    console.log('Creating group with data:', groupData);
    socket.emit('createGroup', groupData);
    onClose();
  };

  // Handle error during socket communication
  useEffect(() => {
    if (!socket) return;

    const handleError = (error) => {
      console.error('Group creation error:', error);
      setError(error.message || 'Failed to create group');
    };

    socket.on('error', handleError);

    return () => {
      socket.off('error', handleError);
    };
  }, [socket]);

  // Toggle member selection
  const toggleMemberSelection = (userId) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Group</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          {error && <div className="error-message">{error}</div>}
          
          <div className="input-group">
            <label>Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>

          <div className="members-list">
            <label>Select Members</label>
            {Object.entries(onlineUsers)
              .filter(([id]) => id !== currentUserId)  // Filter out current user from the list
              .map(([id, user]) => (
                <div key={id} className="member-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(id)}
                      onChange={() => toggleMemberSelection(id)}
                    />
                    <span>{user.username || user.name || 'Unknown User'}</span>
                  </label>
                </div>
              ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="create-button" onClick={handleCreateGroup}>
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;
