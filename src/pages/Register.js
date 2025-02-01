import React, { useState } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import registerImage from '../assets/register.png';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setError(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post('https://clgevent-back.onrender.com/api/auth/register',{
        username: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      // Optionally auto-login after registration
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.userId);
      localStorage.setItem('username', response.data.user.username);
      
      navigate('/login'); // or navigate('/chat') if you want to auto-login
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #d8b5f6 0%, #b5e8dc 50%, #b7ecc0 100%)',
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
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ 
          minHeight: 'calc(100vh - 100px)',
          alignItems: 'center',
        }}>
          {/* Image Grid - Adjusted size */}
          <Grid item xs={12} md={6} lg={7} sx={{  // Reduced grid size
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-start' },
            alignItems: 'center',
            order: { xs: 2, md: 1 },
            pl: { md: 4, lg: 6 }  // Reduced padding
          }}>
            <Box sx={{ 
              width: '100%',
              maxWidth: '650px',
              animation: 'float 6s ease-in-out infinite',
              '@keyframes float': {
              '0%': {
                transform: 'translateY(0px) scale(1)',
              },
              '50%': {
                transform: 'translateY(-20px) scale(1.05)',
              },
              '100%': {
                transform: 'translateY(0px) scale(1)',
              }
              },
              p: 2
            }}>
              <img 
              src={registerImage} 
              alt="Register" 
              style={{ 
                width: '100%',
                height: 'auto',
                maxHeight: '550px',
                objectFit: 'contain',
                transition: 'all 0.3s ease-in-out'
              }} 
              />
            </Box>
          </Grid>
          
          {/* Form Grid - Wider form */}
          <Grid item xs={12} md={6} lg={5} sx={{  // Adjusted grid size
            order: { xs: 1, md: 2 },
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            pl: { md: 0, lg: 0 },     
            pr: { md: 4, lg: 8 },
            ml: { md: -30, lg: -30 }  // Adjusted margin
          }}>
            <Paper elevation={3} sx={{ 
              p: 4,
              width: '100%',
              maxWidth: '800px',       // Increased form width
              minHeight: '500px',      // Adjusted height
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
                background: 'linear-gradient(45deg, #2C3E50 30%, #3498DB 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                fontSize: '3rem'
              }}>
                Create Account
              </Typography>
              <Typography variant="body1" align="center" sx={{ 
                mb: 1,
                color: 'text.secondary',
                fontSize: '1.5rem'
              }}>
                Join our community today
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
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{ 
                    mb: 1,
                    '& .MuiOutlinedInput-root': {
                      fontSize: '1.1rem',
                      height: '56px',
                      '&:hover fieldset': {
                        borderColor: '#3498DB',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '1.1rem'
                    }
                  }}
                  variant="outlined"
                />
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
                    mb: 1,
                    '& .MuiOutlinedInput-root': {
                      fontSize: '1.1rem',
                      height: '56px',
                      '&:hover fieldset': {
                        borderColor: '#3498DB',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '1.1rem'
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
                    mb: 1,
                    '& .MuiOutlinedInput-root': {
                      fontSize: '1.1rem',
                      height: '56px',
                      '&:hover fieldset': {
                        borderColor: '#3498DB',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '1.1rem'
                    }
                  }}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{ 
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      fontSize: '1.1rem',
                      height: '56px',
                      '&:hover fieldset': {
                        borderColor: '#3498DB',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '1.1rem'
                    }
                  }}
                  variant="outlined"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{ 
                    mb: 1,
                    height: '56px',
                    borderRadius: '28px',
                    textTransform: 'none',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #2C3E50 30%, #3498DB 90%)',
                    boxShadow: '0 3px 5px 2px rgba(44, 62, 80, .3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1A252F 30%, #2980B9 90%)',
                      transform: 'scale(1.02)',
                    },
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  {isLoading ? <CircularProgress size={28} color="inherit" /> : 'Create Account'}
                </Button>
              </form>
  
              <Box textAlign="center">
                <Typography variant="body2" sx={{ 
                  color: 'text.secondary',
                  fontSize: '1.3rem'
                }}>
                  Already have an account?{' '}
                  <Link to="/login" style={{ 
                    color: '#3498DB',
                    textDecoration: 'none',
                    fontWeight: 650,
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: '#2980B9'
                    }
                  }}>
                    Sign in
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

export default Register;