import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box,
  Chip,
  CardActions,
  IconButton,
  Tooltip
} from '@mui/material';
import { CalendarToday, LocationOn } from '@mui/icons-material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = ({ event, onSave, onView, isSaved = false, showRegisterButton = true, isCreator = false, onDelete }) => {
  const imageUrl = event?.image
  ? event.image.startsWith('http')
    ? event.image
    : `https://res.cloudinary.com/dqgedj6q4/image/upload/${event.image}`
  : 'https://via.placeholder.com/1200x400';  // Fallback image

  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
      }
    }}>
        <CardMedia
        component="img"
        height="160"
        image={imageUrl || 'https://via.placeholder.com/400x200'}
        alt={event.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {event.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CalendarToday sx={{ fontSize: 'small', mr: 1 }} />
          <Typography variant="body2">
            {new Date(event.date).toLocaleDateString()}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOn sx={{ fontSize: 'small', mr: 1 }} />
          <Typography variant="body2">{event.venue}</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Box>
          <Chip 
            label={event.category} 
            size="small"
            sx={{ mr: 1 }}
          />
          {isCreator && onDelete && (
            <IconButton 
              size="small" 
              onClick={onDelete}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
        <Box>
          <Button 
            variant="contained"
            size="small"
            onClick={onView}
            sx={{ mr: 1 }}
          >
            View Details
          </Button>
          <IconButton onClick={onSave}>
            {isSaved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default EventCard;