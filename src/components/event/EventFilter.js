import React from 'react';
import { 
  Box, 
  Grid, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'academic', label: 'Academic' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'sports', label: 'Sports' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'career', label: 'Career' },
  { value: 'technology', label: 'Technology' },
  { value: 'music', label: 'Music & Entertainment' }
];

const EventFilter = ({ filters, setFilters }) => {
  const handleDateChange = (e) => {
    const date = e.target.value;
    setFilters(prev => ({
      ...prev,
      date: date ? new Date(date).toISOString().split('T')[0] : ''
    }));
  };

  return (
    <Box sx={{ 
      mb: 4, 
      p: 3, 
      backgroundColor: 'white', 
      borderRadius: 2,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({...prev, category: e.target.value}))}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            type="date"
            label="Date"
            InputLabelProps={{ shrink: true }}
            value={filters.date}
            onChange={handleDateChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="venue"
            value={filters.venue}
            onChange={(e) => setFilters(prev => ({...prev, venue: e.target.value}))}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventFilter;