import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Homeimg from '../assets/Homepage.jpg';
import { Translate } from '@mui/icons-material';
import { motion } from 'framer-motion'; // Add this import

const Home = () => {
  const navigate = useNavigate();
  const [showFooter, setShowFooter] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Show footer when within 100px of the bottom
      const isNearBottom = (windowHeight + scrollTop) >= (documentHeight - 100);
      setShowFooter(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleEventClick = () => {
    if (!isAuthenticated()) {
      navigate('/login');
    } else {
      navigate('/events');
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${Homeimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Main Content */}
     
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '16px',
          padding: 3,
          textAlign: 'center',
          mt: 7,
          backdropFilter: 'blur(8px)',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          left: '5%',
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: { xs: '2.5rem', md: '3.75rem' },
            background: 'linear-gradient(45deg, #9C27B0 30%, #4CAF50 90%)', // Purple to Green gradient
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          College Events Platform
        </Typography>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
        <Typography 
            variant="h5" 
            component="h2" 
            gutterBottom 
            sx={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 500,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              letterSpacing: '0.5px',
              color: '#455a64',
              textTransform: 'uppercase',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '3px',
                background: 'linear-gradient(45deg, #9C27B0 30%, #4CAF50 90%)',
                borderRadius: '2px'
              }
            }}
          >
            Discover and join exciting events happening in your college
          </Typography>
        </Box>


        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            mt: 4
          }}
        >
            <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: "'Roboto', sans-serif",
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: '#546e7a',
              maxWidth: '800px',
              textAlign: 'center',
              padding: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            Use filters to find events by date, category, or location. 
            <Box component="span" sx={{ 
              color: '#9C27B0',
              fontWeight: 500,
              display: 'block',
              mt: 1
            }}>
              Stay connected and network with peers in real-time using our chat features.
            </Box>
          </Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Button
            onClick={handleEventClick}
            variant="contained"
            size="large"
            sx={{ 
              mr: 2,
              background: 'linear-gradient(45deg, #9C27B0 30%, #4CAF50 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #7B1FA2 30%, #388E3C 90%)',
              },
              boxShadow: '0 3px 5px 2px rgba(156, 39, 176, .3)',
              color: 'white'
            }}
          >
            Browse Events
          </Button>
          {!isAuthenticated() && (
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="large"
              sx={{ 
                borderColor: '#9C27B0',
                color: '#9C27B0',
                '&:hover': {
                  borderColor: '#7B1FA2',
                  backgroundColor: 'rgba(156, 39, 176, 0.08)'
                }
              }}
            >
              Sign In
            </Button>
          )}
        </Box>



      </Container>

   

      {/* Footer */}



      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)', // More transparent, lighter background
          backdropFilter: 'blur(8px)', // Adds frosted glass effect
          color: '#2c3e50', // Darker text color for better readability
          textAlign: 'center',
          py: 1.5, // Reduced vertical padding
          position: 'fixed',
          bottom: 0,
          width: '100%',
          transform: `translateY(${showFooter ? '0' : '100%'})`,
          transition: 'transform 0.3s ease-in-out',
          opacity: showFooter ? 1 : 0,
          borderTop: '1px solid rgba(255, 255, 255, 0.2)', // Subtle top border
        }}
      >
        <Container maxWidth="xs"> {/* Changed to xs for even smaller width */}
          {/* Footer Links */}
          <Box 
            sx={{ 
              mb: 0.5,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 1
            }}
          >
            <MuiLink 
              href="/about" 
              color="inherit" 
              underline="hover" 
              sx={{ 
                fontSize: '0.8rem',
                '&:hover': {
                  color: '#1a73e8'
                }
              }}
            >
              About
            </MuiLink>
            <MuiLink 
              href="/contact" 
              color="inherit" 
              underline="hover" 
              sx={{ 
                fontSize: '0.8rem',
                '&:hover': {
                  color: '#1a73e8'
                }
              }}
            >
              Contact
            </MuiLink>
            <MuiLink 
              href="#" 
              color="inherit" 
              underline="hover" 
              sx={{ 
                fontSize: '0.8rem',
                '&:hover': {
                  color: '#1a73e8'
                }
              }}
            >
              Privacy
            </MuiLink>
            <MuiLink 
              href="#" 
              color="inherit" 
              underline="hover" 
              sx={{ 
                fontSize: '0.8rem',
                '&:hover': {
                  color: '#1a73e8'
                }
              }}
            >
              Terms
            </MuiLink>
          </Box>

          {/* Social Media Icons */}
          <Box sx={{ 
            transform: 'scale(0.8)',
            mt: 0.5
          }}>
            <MuiLink href="https://facebook.com" target="_blank" color="inherit" sx={{ mx: 0.5 }}>
              <FacebookIcon fontSize="small" />
            </MuiLink>
            <MuiLink href="https://instagram.com" target="_blank" color="inherit" sx={{ mx: 0.5 }}>
              <InstagramIcon fontSize="small" />
            </MuiLink>
            <MuiLink href="https://linkedin.com" target="_blank" color="inherit" sx={{ mx: 0.5 }}>
              <LinkedInIcon fontSize="small" />
            </MuiLink>
          </Box>
        </Container>
      </Box>
      </Box>
  );
};

export default Home;