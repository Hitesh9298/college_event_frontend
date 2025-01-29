import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Avatar, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/api';

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    bio: '',
    profilePicture: null,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData(prev => ({
        ...prev,
        profilePicture: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const updatedProfile = await updateUserProfile(userData);
      setUserData(prev => ({
        ...prev,
        ...updatedProfile
      }));
      setSnackbarMessage('Profile updated successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Update error:', error);
      setSnackbarMessage(error.response?.data?.message || 'Failed to update profile');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!user) {
          throw new Error('User not authenticated');
        }

        const profileData = await getUserProfile();
        
        if (!profileData) {
          throw new Error('No profile data received');
        }

        setUserData({
          name: profileData.name || user?.name || '',
          email: profileData.email || user?.email || '',
          bio: profileData.bio || '',
          profilePicture: profileData.profilePicture || null,
        });
      } catch (err) {
        console.error('Profile loading error:', err);
        let errorMessage = 'Failed to load profile data. Please try again later.';
        
        if (err.message === 'User not authenticated') {
          errorMessage = 'Please login to view your profile';
        } else if (err.response?.status === 404) {
          errorMessage = 'Profile not found. Please complete your profile setup.';
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        }

        setError(errorMessage);
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [user]);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            Please login to view your profile
          </Typography>
        </Box>
      </Container>
    );
  }

  const defaultAvatarUrl = 'https://via.placeholder.com/150';

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Avatar 
          src={userData.profilePicture instanceof File 
            ? URL.createObjectURL(userData.profilePicture) 
            : userData.profilePicture || defaultAvatarUrl}
          sx={{ width: 150, height: 150, margin: '0 auto', mb: 2 }}
        />
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            required
            value={userData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            required
            type="email"
            value={userData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
            disabled
          />
          <TextField
            fullWidth
            label="Bio"
            name="bio"
            multiline
            rows={4}
            value={userData.bio}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="profile-image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="profile-image-upload">
            <Button variant="contained" component="span" sx={{ mb: 2 }}>
              Upload Profile Picture
            </Button>
          </label>
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              type="submit" 
              disabled={submitting}
              sx={{
                background: 'linear-gradient(45deg, #2C3E50 30%, #3498DB 90%)',
                color: 'white'
              }}
            >
              {submitting ? <CircularProgress size={24} color="inherit" /> : 'Update Profile'}
            </Button>
          </Box>
        </form>
      </Box>
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile;