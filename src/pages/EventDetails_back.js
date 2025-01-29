import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Avatar,
  Divider,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import {
  CalendarToday,
  LocationOn,
  Group,
  BookmarkBorder,
  Share
} from '@mui/icons-material';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [saved, setSaved] = useState(false); // State to track if the event is saved
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummyEvent = {
        id,
        title: 'Tech Workshop 2024',
        date: '2024-02-15',
        time: '10:00 AM',
        location: 'Main Auditorium',
        category: 'workshop',
        description: `Join us for an immersive tech workshop where industry experts will share insights about the latest technologies and trends.
        
        What you'll learn:
        • Latest web technologies
        • Cloud computing
        • AI and Machine Learning
        • Best practices in software development
        
        This workshop includes hands-on sessions and networking opportunities.`,
        image: 'https://source.unsplash.com/random/1200x400/?technology',
        organizer: {
          name: 'Tech Club',
          image: 'https://source.unsplash.com/random/100x100/?profile'
        },
        maxParticipants: 100,
        currentParticipants: 65,
        schedule: [
          { time: '10:00 AM', activity: 'Registration & Welcome' },
          { time: '10:30 AM', activity: 'Keynote Speech' },
          { time: '11:30 AM', activity: 'Hands-on Workshop' },
          { time: '1:00 PM', activity: 'Lunch Break' },
          { time: '2:00 PM', activity: 'Interactive Sessions' },
          { time: '4:00 PM', activity: 'Networking' }
        ]
      };
      setEvent(dummyEvent);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleRegister = () => {
    if (registered) {
      setSnackbarMessage('You are already registered for this event.');
      setOpenSnackbar(true);
      return;
    }

    if (event.currentParticipants < event.maxParticipants) {
      setRegistered(true);
      setEvent((prevEvent) => ({
        ...prevEvent,
        currentParticipants: prevEvent.currentParticipants + 1
      }));
      setSnackbarMessage('You have successfully registered for the event!');
    } else {
      setSnackbarMessage('Registration is full. Please try another event.');
    }
    setOpenSnackbar(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out this event: ${event.title}`,
        url: window.location.href // Current URL of the event
      })
      .then(() => setSnackbarMessage('Event shared successfully!'))
      .catch((error) => setSnackbarMessage('Error sharing the event.'));
    } else {
      setSnackbarMessage('Sharing is not supported in this browser.');
    }
    setOpenSnackbar(true);
  };

  const handleSave = () => {
    const savedEvents = JSON.parse(localStorage.getItem('savedEvents')) || [];
    const eventExists = savedEvents.find((savedEvent) => savedEvent.id === event.id);

    if (eventExists) {
      // Remove event from saved events
      const updatedSavedEvents = savedEvents.filter((savedEvent) => savedEvent.id !== event.id);
      localStorage.setItem('savedEvents', JSON.stringify(updatedSavedEvents));
      setSaved(false);
      setSnackbarMessage('Event removed from saved events.');
    } else {
      // Add event to saved events
      savedEvents.push(event);
      localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
      setSaved(true);
      setSnackbarMessage('Event saved successfully!');
    }
    setOpenSnackbar(true);
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '80vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 8 }}>
      {/* Banner Image */}
      <Box sx={{ 
        height: '400px', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box
          component="img"
          src={event.image}
          alt={event.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
          p: 4,
          color: 'white'
        }}>
          <Container>
            <Chip 
              label={event.category} 
              sx={{ 
                mb: 2,
                backgroundColor: 'primary.main',
                color: 'white'
              }} 
            />
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
              {event.title}
            </Typography>
          </Container>
        </Box>
      </Box>

      <Container sx={{ mt: -4 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, mb: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                About Event
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 4 }}>
                {event.description}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Schedule
              </Typography>
              <Box sx={{ mb: 4 }}>
                {event.schedule.map((item, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex',
                    py: 2,
                    borderBottom: index !== event.schedule.length - 1 ? '1px solid #eee' : 'none'
                  }}>
                    <Typography sx={{ width: '100px', fontWeight: 'bold' }}>
                      {item.time}
                    </Typography>
                    <Typography>
                      {item.activity}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Date & Time
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarToday sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Location
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>{event.location}</Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Organizer
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={event.organizer.image} sx={{ mr: 2 }} />
                  <Typography>{event.organizer.name}</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Participants
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Group sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>
                    {event.currentParticipants} / {event.maxParticipants} spots filled
                  </Typography>
                </Box>
                <Box sx={{ 
                  width: '100%', 
                  height: '4px', 
                  backgroundColor: '#eee',
                  borderRadius: '2px'
                }}>
                  <Box sx={{ 
                    width: `${(event.currentParticipants / event.maxParticipants) * 100}%`,
                    height: '100%',
                    backgroundColor: 'primary.main',
                    borderRadius: '2px'
                  }} />
                </Box>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleRegister}
                sx={{
                  mb: 2,
                  background: 'linear-gradient(45deg, #2C3E50 30%, #3498DB 90%)',
                  color: 'white'
                }}
              >
                {registered ? 'Registered' : 'Register Now'}
              </Button>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<BookmarkBorder />}
                  onClick={handleSave}
                  sx={{ flex: 1 }}
                >
                  {saved ? 'Saved' : 'Save'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Share />}
                  onClick={handleShare}
                  sx={{ flex: 1 }}
                >
                  Share
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EventDetails;