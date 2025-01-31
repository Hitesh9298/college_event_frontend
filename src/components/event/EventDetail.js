import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	Container, Paper, Typography, Box, Button, Grid, Chip, Divider,
	List, ListItem, ListItemText, Card, CardContent, CircularProgress,
	Alert, IconButton, Snackbar
} from '@mui/material';
import {
	CalendarToday, LocationOn, Group, Schedule,
	BookmarkBorder, Bookmark, Share
} from '@mui/icons-material';
import { getEventById, registerForEvent, saveEvent } from '../../services/api';
import { isAuthenticated, getCurrentUserId } from '../../services/auth';

const EventDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [event, setEvent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isSaved, setIsSaved] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'success'
	});
//updated for image
const imageUrl = event?.image
  ? event.image.startsWith('http')
    ? event.image
    : `https://res.cloudinary.com/dqgedj6q4/image/upload/${event.image}`
  : 'https://via.placeholder.com/1200x400';  // Fallback image


	useEffect(() => {
		fetchEventDetails();
	}, [id]);

	const fetchEventDetails = async () => {
		try {
			setLoading(true);
			const data = await getEventById(id);
			setEvent(data);
			setIsSaved(data.savedBy?.includes(getCurrentUserId()));
		} catch (err) {
			setError('Failed to fetch event details');
			console.error('Error fetching event:', err);
		} finally {
			setLoading(false);
		}
	};

	const handleRegister = async () => {
		if (!isAuthenticated()) {
			navigate('/login');
			return;
		}

		try {
			await registerForEvent(id);
			await fetchEventDetails();
			setSnackbar({
				open: true,
				message: 'Successfully registered for event!',
				severity: 'success'
			});
		} catch (error) {
			setSnackbar({
				open: true,
				message: error.response?.data?.message || 'Failed to register',
				severity: 'error'
			});
		}
	};

	const handleSave = async () => {
		if (!isAuthenticated()) {
			navigate('/login');
			return;
		}

		try {
			await saveEvent(id);
			setIsSaved(!isSaved);
			setSnackbar({
				open: true,
				message: isSaved ? 'Event removed from saved' : 'Event saved successfully',
				severity: 'success'
			});
		} catch (error) {
			setSnackbar({
				open: true,
				message: 'Failed to save event',
				severity: 'error'
			});
		}
	};

	if (loading) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
				<CircularProgress />
			</Box>
		);
	}

	if (error || !event) {
		return (
			<Container maxWidth="md" sx={{ mt: 4 }}>
				<Alert severity="error">{error || 'Event not found'}</Alert>
			</Container>
		);
	}

	return (
		<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
			<Paper elevation={3} sx={{ overflow: 'hidden' }}>
				<Box sx={{ position: 'relative' }}>
					<Box
						component="img"
						src={imageUrl || 'https://via.placeholder.com/1200x400'}
						alt={event.title}
						sx={{
							width: '100%',
							height: '400px',
							objectFit: 'cover'
						}}
					/>
					<Chip
						label={event.category}
						sx={{
							position: 'absolute',
							top: 20,
							right: 20,
							backgroundColor: 'primary.main',
							color: 'white'
						}}
					/>
				</Box>

				<Box sx={{ p: 4 }}>
					<Grid container spacing={4}>
						<Grid item xs={12} md={8}>
							<Typography variant="h3" gutterBottom>
								{event.title}
							</Typography>
							<Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
								<Button
									variant="contained"
									onClick={handleRegister}
									disabled={event.isFull}
								>
									{event.isFull ? 'Event Full' : 'Register Now'}
								</Button>
								<IconButton onClick={handleSave}>
									{isSaved ? <Bookmark color="primary" /> : <BookmarkBorder />}
								</IconButton>
								<IconButton>
									<Share />
								</IconButton>
							</Box>
							<Typography variant="h6" gutterBottom>
								About Event
							</Typography>
							<Typography paragraph>
								{event.description}
							</Typography>

							{/* Organizer Information Section */}
							{event?.organizer && (
								<Box sx={{ mt: 4 }}>
									<Typography variant="h6" gutterBottom>
										Organizer Information
									</Typography>
									<Card variant="outlined" sx={{ mb: 2 }}>
										<CardContent>
											<Typography variant="h6" component="div">
												{event.organizer.name}
											</Typography>
											{event.organizer.description && (
												<Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
													{event.organizer.description}
												</Typography>
											)}
										</CardContent>
									</Card>
								</Box>
							)}

							{/* Schedule Section */}
							{event?.schedule && event.schedule.length > 0 && (
								<Box sx={{ mt: 4 }}>
									<Typography variant="h6" gutterBottom>
										Event Schedule
									</Typography>
									<List>
										{event.schedule.map((item, index) => (
											<React.Fragment key={index}>
												<ListItem>
													<ListItemText
														primary={
															<Grid container spacing={2}>
																<Grid item xs={4}>
																	<Typography variant="body1" fontWeight="medium">
																		{item.time}
																	</Typography>
																</Grid>
																<Grid item xs={8}>
																	<Typography variant="body1">
																		{item.activity}
																	</Typography>
																</Grid>
															</Grid>
														}
													/>
												</ListItem>
												{index < event.schedule.length - 1 && (
													<Divider variant="inset" component="li" />
												)}
											</React.Fragment>
										))}
									</List>
								</Box>
							)}
						</Grid>

						<Grid item xs={12} md={4}>
							<Paper elevation={2} sx={{ p: 3 }}>
								<Typography variant="h6" gutterBottom>
									Event Details
								</Typography>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
									<CalendarToday sx={{ mr: 2 }} />
									<Typography>
										{new Date(event.date).toLocaleDateString()}
									</Typography>
								</Box>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
									<Schedule sx={{ mr: 2 }} />
									<Typography>{event.time}</Typography>
								</Box>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
									<LocationOn sx={{ mr: 2 }} />
									<Typography>{event.venue}</Typography>
								</Box>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
									<Group sx={{ mr: 2 }} />
									<Typography>
										{event.participants?.length || 0} / {event.maxParticipants} registered
									</Typography>
								</Box>
								<Divider sx={{ my: 2 }} />
								<Typography variant="subtitle2" gutterBottom>
									Organized by
								</Typography>
								<Typography>{event.creator?.name || 'College Club'}</Typography>
							</Paper>
						</Grid>
					</Grid>
				</Box>
			</Paper>

			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
			>
				<Alert
					onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
					severity={snackbar.severity}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Container>
	);
};

export default EventDetail;