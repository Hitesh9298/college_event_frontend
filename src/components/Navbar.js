import React, { useState, useEffect, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Fade
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Event as EventIcon,
  ExitToApp as LogoutIcon,
  Home as HomeIcon,
  Chat as ChatIcon,
  Bookmark as BookmarkIcon,
  ContactMail as ContactMailIcon  // Add this import

} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated, logout } from '../services/auth';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  const navItems = isLoggedIn ? [

    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Events', path: '/events', icon: <EventIcon /> },
    { label: 'Saved Events', path: '/saved-events', icon: <BookmarkIcon /> },
    { label: 'Chat', path: '/chat', icon: <ChatIcon /> },
    { label: 'Contact', path: '/contact', icon: <ContactMailIcon /> },  // Add this line
  ] : [];

  const renderMobileDrawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ 
        my: 2,
        fontFamily: "'Poppins', sans-serif",
        background: 'linear-gradient(45deg, #8e44ad 30%, #2ecc71 90%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        College Events
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.path} 
            component={Link} 
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              color: '#333',
              textDecoration: 'none',
              '&.Mui-selected': {
                backgroundColor: 'rgba(142, 68, 173, 0.08)',
              },
              '&:hover': {
                backgroundColor: 'rgba(142, 68, 173, 0.04)',
              },
            }}
          >
            <Box sx={{ mr: 2, color: '#8e44ad' }}>{item.icon}</Box>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
          {isLoggedIn && (
                <ListItem 
                    button
                    onClick={handleLogout}
                    sx={{
                        color: '#333',
                        '&:hover': {
                            backgroundColor: 'rgba(142, 68, 173, 0.04)',
                        },
                    }}
                >
                    <Box sx={{ mr: 2, color: '#8e44ad' }}><LogoutIcon /></Box>
                    <ListItemText primary="Logout" />
                </ListItem>
            )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{
          backgroundColor: isScrolled || !isHomePage ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
          backgroundImage: isScrolled || !isHomePage ? 
            'linear-gradient(90deg, rgba(142,68,173,0.95) 0%, rgba(46,204,113,0.95) 100%)' : 
            'none',
          boxShadow: isScrolled || !isHomePage ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
          backdropFilter: isScrolled || !isHomePage ? 'blur(10px)' : 'none',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 0,
                textDecoration: 'none',
                color: 'white',
                fontWeight: 700,
                letterSpacing: 1.5,
                fontSize: '1.5rem',
                fontFamily: "'Poppins', sans-serif",
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  textShadow: '0 4px 8px rgba(0,0,0,0.2)',
                }
              }}
            >
              College Events
            </Typography>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: 'white',
                      position: 'relative',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        transform: 'translateY(-2px)',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        width: '0%',
                        height: '2px',
                        backgroundColor: 'white',
                        transition: 'all 0.3s ease-in-out',
                        transform: 'translateX(-50%)',
                      },
                      '&:hover::after': {
                        width: '80%',
                      },
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontFamily: "'Roboto', sans-serif",
                      transition: 'all 0.3s ease-in-out',
                    }}
                    startIcon={item.icon}
                  >
                    {item.label}
                  </Button>
                ))}
                
                {isLoggedIn ? (
                  <>
                    <IconButton
                      onClick={handleProfileMenuOpen}
                      sx={{
                        ml: 2,
                        color: 'white',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      <Avatar sx={{ 
                        width: 35, 
                        height: 35, 
                        bgcolor: 'transparent',
                        border: '2px solid white',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          boxShadow: '0 0 15px rgba(255,255,255,0.5)',
                        }
                      }}>
                        <PersonIcon />
                      </Avatar>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleProfileMenuClose}
                      TransitionComponent={Fade}
                      sx={{ 
                        mt: 1,
                        '& .MuiPaper-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }
                      }}
                    >
                      <MenuItem 
                        component={Link} 
                        to="/profile"
                        onClick={handleProfileMenuClose}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(142, 68, 173, 0.08)',
                          }
                        }}
                      >
                        <PersonIcon sx={{ mr: 1, color: '#8e44ad' }} /> Profile
                      </MenuItem>
                      <MenuItem 
                        onClick={handleLogout}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(142, 68, 173, 0.08)',
                          }
                        }}
                      >
                        <LogoutIcon sx={{ mr: 1, color: '#8e44ad' }} /> Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      component={Link}
                      to="/login"
                      variant="outlined"
                      sx={{
                        color: 'white',
                        borderColor: 'white',
                        borderWidth: '2px',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      component={Link}
                      to="/register"
                      variant="contained"
                      sx={{
                        background: 'white',
                        color: '#8e44ad',
                        '&:hover': {
                          background: 'rgba(255,255,255,0.9)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease-in-out',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                      }}
                    >
                      Register
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        {renderMobileDrawer}
      </Drawer>
    </>
  );
};

export default Navbar;