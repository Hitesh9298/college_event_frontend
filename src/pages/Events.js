import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography,
  Button,
  Box,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import Footer from '../components/Footer';
import AddIcon from '@mui/icons-material/Add';
import { getEvents, saveEvent, registerForEvent, deleteEvent } from '../services/api';
import { isAuthenticated, getCurrentUserId } from '../services/auth';
import EventFilter from '../components/event/EventFilter';
import EventCard from '../components/event/EventCard';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    date: '',
    venue: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEvents(filters);
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error.response?.data?.message || 'Failed to fetch events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const handleRegisterForEvent = async (eventId) => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    try {
      await registerForEvent(eventId);
      setSnackbar({
        open: true,
        message: 'Successfully registered for event!',
        severity: 'success'
      });
      await fetchEvents();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to register for event',
        severity: 'error'
      });
    }
  };

  const handleSaveEvent = async (eventId) => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    try {
      await saveEvent(eventId);
      setSnackbar({
        open: true,
        message: 'Event saved successfully!',
        severity: 'success'
      });
      await fetchEvents(); // Refresh events after saving
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to save event',
        severity: 'error'
      });
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!isAuthenticated()) {
      setSnackbar({
        open: true,
        message: 'Please login to delete events',
        severity: 'warning'
      });
      navigate('/login');
      return;
    }

    try {
      await deleteEvent(eventId);
      setSnackbar({
        open: true,
        message: 'Event deleted successfully',
        severity: 'success'
      });
      await fetchEvents();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to delete event',
        severity: 'error'
      });
    }
  };

  const handleCreateEvent = () => {
    if (!isAuthenticated()) {
      setSnackbar({
        open: true,
        message: 'Please login to create events',
        severity: 'warning'
      });
      navigate('/login');
      return;
    }
    navigate('/events/create');
  };


  //updated  cloud img
  const processImageUrl = (imageUrl) => {
    return imageUrl?.startsWith("http")
      ? imageUrl
      : "https://via.placeholder.com/400x200"; // Fallback image
  };
  

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      <Box sx={{ flex: '1 0 auto', py: 4 }}>
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Events
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateEvent}
          sx={{
            background: 'linear-gradient(45deg, #2C3E50 30%, #3498DB 90%)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(45deg, #1A252F 30%, #2980B9 90%)',
            }
          }}
        >
          Create Event
        </Button>
      </Box>

      <EventFilter filters={filters} setFilters={setFilters} />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <EventCard
                 event={{
                  ...event,
                  image: processImageUrl(event.image)
                }}
                onRegister={() => handleRegisterForEvent(event._id)}
                onSave={() => handleSaveEvent(event._id)}
                onView={() => navigate(`/events/${event._id}`)}
                onDelete={() => handleDeleteEvent(event._id)}
                isCreator={event.creator === getCurrentUserId()}
              />
            </Grid>
          ))}
          {events.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="body1" textAlign="center" color="text.secondary">
                No events found matching your criteria.
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
      </Box>

      <Footer />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      </Box>
  );
}

export default Events;
   