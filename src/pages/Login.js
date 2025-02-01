import React, { useState } from 'react';
import { API_URL } from '../config';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import loginImage from '../assets/login.png';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });
      
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userId', data.user._id);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('userEmail', data.user.email); // Add this line for event creation
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Force a page reload to update the navbar
        window.location.href = '/events';
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await handleLogin(formData);
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e8d5f9 0%, #d4f0eb 50%, #d5f5d9 100%)',
      backgroundSize: '200% 200%',
      animation: 'gradientAnimation 15s ease infinite',
      pt: 8,
      pb: 4,
      '@keyframes gradientAnimation': {
        '0%': {
          backgroundPosition: '0% 50%'
        },
        '50%': {
          backgroundPosition: '100% 50%'
        },
        '100%': {
          backgroundPosition: '0% 50%'
        }
      }
    }}>
        <Container maxWidth="xl"> {/* Changed from lg to xl for more width */}
          <Grid container spacing={4} sx={{ 
            minHeight: 'calc(100vh - 100px)',
            alignItems: 'center',
          }}>
            {/* Image Grid - Moved more left */}
            <Grid item xs={12} md={7} lg={8} sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' }, // Align left on larger screens
              alignItems: 'center',
              order: { xs: 2, md: 1 },
              pl: { md: 4, lg: 8 } // Added left padding on medium and large screens
            }}>
                <Box sx={{ 
                width: '100%',
                maxWidth: '700px',
                animation: 'float 6s ease-in-out infinite', // Increased duration from 3s to 6s
                p: 2,
                '@keyframes float': {
                  '0%': {
                  transform: 'translateY(0px) scale(1)',
                  },
                  '50%': {
                  transform: 'translateY(-20px) scale(1.05)', // Added scale transform and increased Y translation
                  },
                  '100%': {
                  transform: 'translateY(0px) scale(1)',
                  }
                }
                }}>
                <img 
                  src={loginImage} 
                  alt="Login" 
                  style={{ 
                  width: '100%',
                  height: 'auto',
                  maxHeight: '600px',
                  objectFit: 'contain',
                  transition: 'all 0.3s ease-in-out' // Added smooth transition
                  }} 
                />
              </Box>
            </Grid>
            
            {/* Form Grid - Centered */}
            <Grid item xs={12} md={5} lg={5} sx={{ 
  order: { xs: 1, md: 2 },
  display: 'flex',
  justifyContent: 'flex-start',  // Changed to flex-start to move left
  alignItems: 'center',
  pl: { md: 0, lg: 0 },     
  pr: { md: 5, lg: 10 },     // Reduced right padding
  ml: { md: -40, lg: -40 }   // Added negative margin to move closer to image
}}>
  <Paper elevation={3} sx={{ 
    p: 4,
    width: '100%',
    maxWidth: '800px',
    minHeight: '500px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    transform: 'translateY(0)',
    transition: 'transform 0.3s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '&:hover': {
      transform: 'translateY(-6px)',
    }
  }}>
            
            <Typography variant="h3" align="center" gutterBottom sx={{ 
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #9C27B0 30%, #4CAF50 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2,
          fontSize: '3.5rem'
        }}>
      Welcome Back
    </Typography>
    <Typography variant="body1" align="center" sx={{ 
      mb: 3,                 // Increased margin bottom
      color: 'text.secondary',
      fontSize: '2.0rem'     // Increased font size
    }}>
      Please sign in to continue
    </Typography>
              {error && (
                <Alert severity="error" sx={{ 
                  mb: 2,
                  borderRadius: '8px'
                }}>
                  {error}
                </Alert>
              )}

<form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        required
        sx={{ 
          mb: 2,
          '& .MuiOutlinedInput-root': {
          fontSize: '1.1rem',
          height: '56px',
          '&:hover fieldset': {
            borderColor: '#9C27B0',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#4CAF50',
          }
          },
          '& .MuiInputLabel-root': {
          fontSize: '1.1rem',
          '&.Mui-focused': {
            color: '#9C27B0'
          }
          }
        }}
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        margin="normal"
        required
        sx={{ 
          mb: 2,             // Increased margin bottom
          '& .MuiOutlinedInput-root': {
            fontSize: '1.1rem', // Increased font size
            height: '56px',     // Increased height
            '&:hover fieldset': {
              borderColor: '#3498DB',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '1.1rem'  // Increased label font size
          }
        }}
        variant="outlined"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={Loading}
        sx={{ 
          mb: 2,
          height: '56px',
          borderRadius: '28px',
          textTransform: 'none',
          fontSize: '1.6rem',
          fontWeight: 600,
          background: 'linear-gradient(45deg, #9C27B0 30%, #4CAF50 90%)',
          boxShadow: '0 3px 5px 2px rgba(156, 39, 176, .3)',
          '&:hover': {
          background: 'linear-gradient(45deg, #7B1FA2 30%, #388E3C 90%)',
          transform: 'scale(1.02)',
          },
          transition: 'all 0.3s ease-in-out',
        }}

      >
        {Loading ? <CircularProgress size={30} color="inherit" /> : 'Sign In'}
      </Button>
    </form>

    <Box textAlign="center">
      <Typography variant="body2" sx={{ 
        color: 'text.secondary',
        fontSize: '1.5rem'    // Increased font size
      }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ 
          color: '#9C27B0',
          textDecoration: 'none',
          fontWeight: 600,
          transition: 'color 0.3s ease',
          '&:hover': {
          color: '#4CAF50'
          }
        }}>
          Register here
                  </Link>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;