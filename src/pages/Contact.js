import React, { useState } from 'react';
import Footer from '../components/Footer';
import {
	Container,
	Paper,
	TextField,
	Button,
	Typography,
	Box,
	Grid,
	Snackbar,
	Alert,
	Divider
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Contact = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
	});
	const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

		const handleSubmit = async (e) => {
			e.preventDefault();
			setIsLoading(true);
			try {
				const response = await fetch('https://clgevent-back.onrender.com/api/contact', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData)
				});
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setSnackbarMessage('Message sent successfully!');
				setSnackbarSeverity('success');
				setFormData({ name: '', email: '', subject: '', message: '' });
			} catch (error) {
				console.error('Error:', error);
				setSnackbarMessage('Failed to send message. Please try again.');
				setSnackbarSeverity('error');
			} finally {
				setIsLoading(false);
				setOpenSnackbar(true);
			}
		};

	return (
		<Box sx={{
			minHeight: '100vh',
            background: 'linear-gradient(135deg,rgb(180, 162, 224) 0%,rgb(153, 241, 220) 100%)',
			display: 'flex',
			flexDirection: 'column',
			position: 'relative'
		}}>
			<Box sx={{ py: 12 }}>
				<Container maxWidth="lg" sx={{ mb: 8 }}>
					<Grid container spacing={6} sx={{ display: 'flex', alignItems: 'stretch' }}>
				  {/* Contact Information */}
				  <Grid item xs={12} md={6}>
					<Paper elevation={3} sx={{
					  p: 6,
					  height: '100%',
					  background: 'rgba(255, 255, 255, 0.95)',
					  backdropFilter: 'blur(10px)',
					  borderRadius: '20px',
					  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
					  transition: 'transform 0.3s ease-in-out',
					  '&:hover': {
						transform: 'translateY(-5px)',
						boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
					  }
					}}>
							  <Typography variant="h3" gutterBottom sx={{ 
								color: '#2C3E50',
								fontWeight: 'bold',
								mb: 6,
								borderBottom: '4px solid #3498DB',
								paddingBottom: '15px',
								textAlign: 'center'
							  }}>
								Get in Touch
							  </Typography>
							  
							  <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
								<PersonIcon sx={{ mr: 3, color: '#3498DB', fontSize: 65 }} />
								<Box>
								  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 1 }}>Name</Typography>
								  <Typography variant="h5" sx={{ color: '#666', fontSize: '1.5rem' }}>Hitesh Parmar</Typography>
								</Box>
							  </Box>

							  <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
								<LocationOnIcon sx={{ mr: 3, color: '#3498DB', fontSize: 65 }} />
								<Box>
								  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 1 }}>Our Location</Typography>
								  <Typography variant="h5" sx={{ color: '#666', fontSize: '1.5rem' }}>Indore, Madhya Pradesh</Typography>
								</Box>
							  </Box>

							  <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
								<EmailIcon sx={{ mr: 3, color: '#3498DB', fontSize: 65 }} />
								<Box>
								  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 1 }}>Email Us</Typography>
								  <Typography variant="h5" sx={{ color: '#666', fontSize: '1.5rem' }}>hitesh@gmail.com</Typography>
								</Box>
							  </Box>

                              <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
<LinkedInIcon sx={{ mr: 3, color: '#3498DB', fontSize: 65 }} />
                                <Box>
                                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 1 }}>LinkedIn</Typography>
                                  <Typography 
                                    variant="h5" 
                                    sx={{ 
                                      color: '#666', 
                                      fontSize: '1.5rem',
                                      '&:hover': {
                                        color: '#3498DB',
                                        cursor: 'pointer'
                                      }
                                    }}
                                    onClick={() => window.open('https://www.linkedin.com/in/hitesh9298/', '_blank')}
                                  >
                                    hitesh9298
                                  </Typography>
                                </Box>
                              </Box>

							  <Box sx={{ display: 'flex', alignItems: 'center' }}>
								<PhoneIcon sx={{ mr: 3, color: '#3498DB', fontSize: 65 }} />
								<Box>
								  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 1 }}>Call Us</Typography>
								  <Typography variant="h5" sx={{ color: '#666', fontSize: '1.5rem' }}>+91 9179982958</Typography>
								</Box>
							  </Box>
						</Paper>
					  </Grid>

					  {/* Contact Form */}
					  <Grid item xs={12} md={6}>
						<Paper elevation={3} sx={{
						  p: 6,
						  height: '100%',
						  background: 'rgba(255, 255, 255, 0.95)',
						  backdropFilter: 'blur(10px)',
						  borderRadius: '20px',
						  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
						  transition: 'transform 0.3s ease-in-out',
						  '&:hover': {
							transform: 'translateY(-5px)',
							boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
						  }
						}}>
							  <Typography variant="h3" gutterBottom sx={{ 
								color: '#2C3E50',
								fontWeight: 'bold',
								mb: 6,
								borderBottom: '4px solid #3498DB',
								paddingBottom: '15px',
								textAlign: 'center'
							  }}>
								Send us a Message
							  </Typography>
							  
							  <form onSubmit={handleSubmit}>
								<Grid container spacing={4}>
									  <Grid item xs={12}>
										<TextField
										  fullWidth
										  label="Your Name"
										  name="name"
										  value={formData.name}
										  onChange={handleChange}
										  required
										  variant="outlined"
										  sx={{
											'& .MuiOutlinedInput-root': {
											  fontSize: '1.2rem',
											  '&:hover fieldset': {
												borderColor: '#3498DB',
											  },
											  '&.Mui-focused fieldset': {
												borderColor: '#2C3E50',
											  }
											},
											'& .MuiInputLabel-root': {
											  fontSize: '1.2rem'
											}
										  }}
										/>
									  </Grid>
									  <Grid item xs={12}>
										<TextField
										  fullWidth
										  label="Your Email"
										  name="email"
										  type="email"
										  value={formData.email}
										  onChange={handleChange}
										  required
										  variant="outlined"
										  sx={{
											'& .MuiOutlinedInput-root': {
											  fontSize: '1.2rem',
											  '&:hover fieldset': {
												borderColor: '#3498DB',
											  },
											  '&.Mui-focused fieldset': {
												borderColor: '#2C3E50',
											  }
											},
											'& .MuiInputLabel-root': {
											  fontSize: '1.2rem'
											}
										  }}
										/>
									  </Grid>
									  <Grid item xs={12}>
										<TextField
										  fullWidth
										  label="Subject"
										  name="subject"
										  value={formData.subject}
										  onChange={handleChange}
										  required
										  variant="outlined"
										  sx={{
											'& .MuiOutlinedInput-root': {
											  fontSize: '1.2rem',
											  '&:hover fieldset': {
												borderColor: '#3498DB',
											  },
											  '&.Mui-focused fieldset': {
												borderColor: '#2C3E50',
											  }
											},
											'& .MuiInputLabel-root': {
											  fontSize: '1.2rem'
											}
										  }}
										/>
									  </Grid>
									  <Grid item xs={12}>
										<TextField
										  fullWidth
										  label="Message"
										  name="message"
										  value={formData.message}
										  onChange={handleChange}
										  required
										  multiline
										  rows={4}
										  variant="outlined"
										  sx={{
											'& .MuiOutlinedInput-root': {
											  fontSize: '1.2rem',
											  '&:hover fieldset': {
												borderColor: '#3498DB',
											  },
											  '&.Mui-focused fieldset': {
												borderColor: '#2C3E50',
											  }
											},
											'& .MuiInputLabel-root': {
											  fontSize: '1.2rem'
											}
										  }}
										/>
									  </Grid>
									  <Grid item xs={12}>
										<Button
										  type="submit"
										  variant="contained"
										  size="large"
										  fullWidth
										  disabled={isLoading}
										  sx={{
											background: 'linear-gradient(45deg, #2C3E50 30%, #3498DB 90%)',
											color: 'white',
											py: 2,
											fontSize: '1.2rem',
											fontWeight: 'bold',
											transition: 'all 0.3s ease',
											'&:hover': {
											  transform: 'scale(1.02)',
											  background: 'linear-gradient(45deg, #3498DB 30%, #2C3E50 90%)',
											  boxShadow: '0 8px 16px rgba(52, 152, 219, 0.3)'
											}
										  }}
										>
										 {isLoading ? 'Sending...' : 'Send Message'}
										 </Button>
									  </Grid>
									</Grid>
								  </form>
								</Paper>
							  </Grid>
							</Grid>
						  </Container>
						</Box>
                        <Footer />
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
					  </Box>
					);
				};

				export default Contact;