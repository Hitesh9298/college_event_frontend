import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#8e44ad', // Purple from your gradient
      light: '#9b59b6',
      dark: '#6c3483',
    },
    secondary: {
      main: '#2ecc71', // Green from your gradient
      light: '#3ee888',
      dark: '#27ae60',
    },
    background: {
      default: '#f5f6fa',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#455a64',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
    h4: {
      fontWeight: 700,
    },
    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h2: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          background: 'linear-gradient(90deg, #8e44ad 0%, #2ecc71 100%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(90deg, #9b59b6 0%, #27ae60 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 12px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, rgba(142,68,173,0.95) 0%, rgba(46,204,113,0.95) 100%)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  }

  });