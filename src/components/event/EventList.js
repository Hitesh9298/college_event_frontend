import React, { useState, useEffect } from 'react';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';
import EventCard from './EventCard';
import { getEvents } from '../../services/api';
import { getCurrentUserId } from '../../services/auth';

const EventList = ({ filters }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getEvents(filters);
        setEvents(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch events');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filters]);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        py: 4,
        minHeight: '300px',
        alignItems: 'center'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography color="error" align="center">{error}</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {events.map(event => (
        <Grid item xs={12} sm={6} md={4} key={event._id}>
          <EventCard 
            event={event}
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
  );
};

export default EventList;