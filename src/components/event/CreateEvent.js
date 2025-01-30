import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../services/api';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    image: null,
    maxParticipants: '',
    organizerName: '',
  organizerDescription: '',
  schedule: [{ time: '', activity: '' }]
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // Add to existing state declarations
const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  // Add/update handleImageChange function
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEventData({ ...eventData, image: file }); // Update eventData.image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
// Add cleanup in useEffect
useEffect(() => {
  return () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
  };
}, [imagePreview]);


//updated for organiser
  const handleScheduleChange = (index, field, value) => {
    const newSchedule = [...eventData.schedule];
    newSchedule[index][field] = value;
    setEventData({ ...eventData, schedule: newSchedule });
  };
  
  const addScheduleItem = () => {
    setEventData({
      ...eventData,
      schedule: [...eventData.schedule, { time: '', activity: '' }]
    });
  };
  
  const removeScheduleItem = (index) => {
    const newSchedule = eventData.schedule.filter((_, i) => i !== index);
    setEventData({ ...eventData, schedule: newSchedule });
  };


  const uploadImage = async (file) => {
    if (!file) {
      throw new Error("No file selected");
    }
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // Replace with actual Cloudinary preset
  
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dqgedj6q4/image/upload", 
        { 
          method: "POST",
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
  
      const data = await response.json();
      return data.secure_url; // Return the Cloudinary image URL
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw new Error("Image upload failed");
    }
  };
  

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = null;
  
      // Upload image to Cloudinary if selected
      if (eventData.image) {
        imageUrl = await uploadImage(eventData.image);
      }
  
      const formData = new FormData();
      
      // Add all fields to formData
      Object.keys(eventData).forEach((key) => {
        if (key === "schedule") {
          formData.append("schedule", JSON.stringify(eventData.schedule));
        } else if (key !== "image") {
          formData.append(key, eventData[key]);
        }
      });
  
      // Add Cloudinary image URL to formData
      if (imageUrl) {
        formData.append("imageUrl", imageUrl);
      }
  
      await createEvent(formData);
      setSnackbarMessage("Event created successfully!");
      setOpenSnackbar(true);
  
      setTimeout(() => {
        navigate("/events");
      }, 2000);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setSnackbarMessage(error.response?.data?.message || "Failed to create event. Please try again.");
      setOpenSnackbar(true);
    }
  };
  


  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Title"
                name="title"
                required
                value={eventData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                required
                multiline
                rows={4}
                value={eventData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                name="date"
                InputLabelProps={{ shrink: true }}
                required
                value={eventData.date}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="time"
                label="Time"
                name="time"
                required
                value={eventData.time}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                required
                value={eventData.location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  required
                  value={eventData.category}
                  onChange={handleChange}
                >
                  <MenuItem value="academic">Academic</MenuItem>
                  <MenuItem value="cultural">Cultural</MenuItem>
                  <MenuItem value="sports">Sports</MenuItem>
                  <MenuItem value="workshop">Workshop</MenuItem>
                  <MenuItem value="career">Career</MenuItem>
                  <MenuItem value="technology">Technology</MenuItem>
                  <MenuItem value="music">Music & Entertainment</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Max Participants"
                name="maxParticipants"
                required
                value={eventData.maxParticipants}
                onChange={handleChange}
              />
            </Grid>
<Grid item xs={12}>
  <TextField
    fullWidth
    label="Organizer Name"
    name="organizerName"
    required
    value={eventData.organizerName}
    onChange={handleChange}
  />
</Grid>
<Grid item xs={12}>
  <TextField
    fullWidth
    label="Organizer Description"
    name="organizerDescription"
    multiline
    rows={2}
    value={eventData.organizerDescription}
    onChange={handleChange}
  />
</Grid>
<Grid item xs={12}>
  <Typography variant="h6" gutterBottom>
    Event Schedule
  </Typography>
  {eventData.schedule.map((item, index) => (
    <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField
        label="Time"
        value={item.time}
        onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
      />
      <TextField
        label="Activity"
        fullWidth
        value={item.activity}
        onChange={(e) => handleScheduleChange(index, 'activity', e.target.value)}
      />
      <IconButton onClick={() => removeScheduleItem(index)} color="error">
        <DeleteIcon />
      </IconButton>
    </Box>
  ))}
  <Button onClick={addScheduleItem} startIcon={<AddIcon />}>
    Add Schedule Item
  </Button>
</Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
                <Button variant="contained" component="span">
                  Upload Event Image
                </Button>
              </label>
              {imagePreview && (
      <Box mt={2}>
        <img 
          src={imagePreview} 
          alt="Preview" 
          style={{ maxWidth: '100%', maxHeight: '200px' }} 
        />
      </Box>
       )}
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Button 
              variant="contained" 
              type="submit" 
              sx={{
                background: 'linear-gradient(45deg, #2C3E50 30%, #3498DB 90%)',
                color: 'white'
              }}
            >
              Create Event
            </Button>
          </Box>
        </form>
      </Paper>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateEvent;