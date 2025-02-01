import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <>
      {/* Add a spacer div with increased height */}
      <Box sx={{ 
        flexGrow: 1, 
        minHeight: '6rem',  // Increased from 2rem to 6rem
        mb: 4  // Added margin bottom of 4 units (32px)
      }} />

      {/* Copyright Section */}
      <Box
        sx={{
          py: 3,
          textAlign: 'center',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(to right, rgba(142,68,173,0.9), rgba(46,204,113,0.9))',
          backdropFilter: 'blur(5px)',
          width: '100%',
          marginTop: 'auto',
          position: 'relative',
          zIndex: 1,
          mt: 4  // Added margin top of 4 units (32px)
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: '#ffffff',
            fontSize: '1rem',
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 500
          }}
        >
          Copyright © {new Date().getFullYear()} College Events.
          <br />
          All Rights Reserved.
          <br />
          Version 1.0
        </Typography>
      </Box>
    </>
  );
};

export default Footer;