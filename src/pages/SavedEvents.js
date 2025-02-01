import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getSavedEvents, saveEvent } from '../services/api';
import EventCard from '../components/event/EventCard';
import Footer from '../components/Footer';

const SavedEvents = () => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchSavedEvents = async () => {
    try {
      setLoading(true);
      const data = await getSavedEvents();
      setSavedEvents(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching saved events:', err);
      setError('Failed to fetch saved events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedEvents();
  }, []);

  const handleUnsaveEvent = async (eventId) => {
    try {
      await saveEvent(eventId); // This will toggle the saved status
      await fetchSavedEvents(); // Refresh the list
    } catch (error) {
      console.error('Error unsaving event:', error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
    <Box sx={{ flex: '1 0 auto', py: 4 }}>
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Saved Events
        </Typography>
        {error ? (
            <Alert severity="error">{error}</Alert>
        ) : savedEvents.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
            You haven't saved any events yet.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {savedEvents.map((event) => (
              <Grid item xs={12} md={6} key={event._id}>
                <EventCard 
                  event={event}
                  isSaved={true}
                    onSave={() => handleUnsaveEvent(event._id)}
                    onView={() => navigate(`/events/${event._id}`)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      
    </Container>
    </Box>
      
      <Footer />
    </Box>
  );
};

export default SavedEvents;