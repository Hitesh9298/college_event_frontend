import React from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    Avatar
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import SecurityIcon from '@mui/icons-material/Security';

const About = () => {
    const features = [
        {
            icon: <EventIcon sx={{ fontSize: 40, color: '#3498DB' }} />,
            title: 'Event Management',
            description: 'Efficiently organize and manage college events with our comprehensive platform.'
        },
        {
            icon: <GroupIcon sx={{ fontSize: 40, color: '#3498DB' }} />,
            title: 'Community Building',
            description: 'Connect with fellow students and build a stronger college community.'
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 40, color: '#3498DB' }} />,
            title: 'Secure Platform',
            description: 'Your data is protected with our secure and reliable platform.'
        }
    ];

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg,rgb(180, 162, 224) 0%,rgb(153, 241, 220) 100%)',

            py: 4
        }}>
            <Container maxWidth="lg">
                {/* Hero Section */}
                <Paper elevation={3} sx={{ 
                    p: 4, 
                    mb: 4, 
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                    }
                }}>
                    <Typography 
                        variant="h2" 
                        align="center" 
                        gutterBottom 
                        sx={{
                            color: '#2C3E50',
                            fontWeight: 800,
                            mb: 3,
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            fontFamily: "'Poppins', sans-serif",
                            background: 'linear-gradient(45deg, #2C3E50 30%, #3498DB 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        About Us
                    </Typography>
                    <Typography 
                        variant="h5" 
                        align="center" 
                        paragraph 
                        sx={{ 
                            mb: 2,
                            color: '#666',
                            fontSize: { xs: '1.1rem', md: '1.3rem' },
                            fontFamily: "'Roboto', sans-serif",
                            lineHeight: 1.6
                        }}
                    >
                        We're dedicated to making college event management easier and more efficient.
                        Our platform helps connect students, organizers, and administrators.
                    </Typography>
                </Paper>

                {/* Mission and Vision Section */}
                <Grid container spacing={4} sx={{ 
                mb: 12,  // Increase margin bottom
                position: 'relative',
                   zIndex: 0 
            }}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ 
                            p: 4, 
                            height: '100%',
                            borderRadius: '20px',
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                            }
                        }}>
                            <Typography 
                                variant="h4" 
                                gutterBottom 
                                sx={{ 
                                    color: '#2C3E50', 
                                    fontWeight: 700,
                                    fontFamily: "'Poppins', sans-serif",
                                    borderBottom: '3px solid #3498DB',
                                    paddingBottom: '10px',
                                    marginBottom: '20px'
                                }}
                            >
                                Our Mission
                            </Typography>
                            <Typography 
                                variant="body1" 
                                paragraph
                                sx={{
                                    fontSize: '1.2rem',
                                    lineHeight: 1.6,
                                    color: '#666',
                                    fontFamily: "'Roboto', sans-serif"
                                }}
                            >
                                To streamline college event management and create a more connected campus community
                                through innovative digital solutions. We aim to make event organization and
                                participation accessible to all students.
                            </Typography>
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ 
                            p: 4, 
                            height: '100%',
                            borderRadius: '20px',
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                            }
                        }}>
                            <Typography 
                                variant="h4" 
                                gutterBottom 
                                sx={{ 
                                    color: '#2C3E50', 
                                    fontWeight: 700,
                                    fontFamily: "'Poppins', sans-serif",
                                    borderBottom: '3px solid #3498DB',
                                    paddingBottom: '10px',
                                    marginBottom: '20px'
                                }}
                            >
                                Our Vision
                            </Typography>
                            <Typography 
                                variant="body1" 
                                paragraph
                                sx={{
                                    fontSize: '1.2rem',
                                    lineHeight: 1.6,
                                    color: '#666',
                                    fontFamily: "'Roboto', sans-serif"
                                }}
                            >
                                To become the leading platform for college event management, fostering student
                                engagement and creating memorable experiences across campuses nationwide.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Features Section */}
                    <Box sx={{ 
                     position: 'relative',
                   zIndex: 1,
                    mt: 8,  // Add margin top
                     mb: 4
                    }}>
                    <Typography 
                        variant="h3" 
                        align="center" 
                        gutterBottom 
                        sx={{
                            color: '#2C3E50',
                            fontWeight: 800,
                            mb: 6,  // Increase margin bottom
                            position: 'relative',  // Add this
                            zIndex: 2,  // Add this
                            fontFamily: "'Poppins', sans-serif",
                            background: 'linear-gradient(45deg, #2C3E50 30%, #3498DB 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        What We Offer
                    </Typography>
                    <Grid container spacing={4}>  
                        {features.map((feature, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    p: 3,
                                    borderRadius: '20px',
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                                    }
                                }}>
                                    <Avatar sx={{
                                        width: 80,
                                        height: 80,
                                        bgcolor: 'white',
                                        boxShadow: '0 8px 32px rgba(52, 152, 219, 0.2)',
                                        mb: 2
                                    }}>
                                        {feature.icon}
                                    </Avatar>
                                    <CardContent>
                                        <Typography 
                                            variant="h5" 
                                            component="h3" 
                                            gutterBottom 
                                            align="center"
                                            sx={{
                                                fontFamily: "'Poppins', sans-serif",
                                                fontWeight: 600,
                                                color: '#2C3E50',
                                                mb: 1
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            color="textSecondary" 
                                            align="center"
                                            sx={{
                                                fontSize: '1.1rem',
                                                lineHeight: 1.6,
                                                fontFamily: "'Roboto', sans-serif"
                                            }}
                                        >
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default About;