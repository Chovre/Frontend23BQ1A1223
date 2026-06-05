import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  CardActions,
  alpha
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import Event from '@mui/icons-material/Event';
import Assessment from '@mui/icons-material/Assessment';
import Assignment from '@mui/icons-material/Assignment';
import PriorityHigh from '@mui/icons-material/PriorityHigh';
import NewReleases from '@mui/icons-material/NewReleases';
import type { Notification } from '../types/notification';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface NotificationCardProps {
  notification: Notification;
  onMarkAsViewed: (id: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onMarkAsViewed }) => {
  const getTypeIcon = () => {
    switch (notification.Type) {
      case 'Event':
        return <Event sx={{ color: '#2196f3' }} />;
      case 'Result':
        return <Assessment sx={{ color: '#4caf50' }} />;
      case 'Placement':
        return <Assignment sx={{ color: '#ff9800' }} />;
      default:
        return <Event />;
    }
  };

  const getPriorityColor = () => {
    switch (notification.priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'info';
      default:
        return 'default';
    }
  };

  const getTypeColor = () => {
    switch (notification.Type) {
      case 'Event':
        return 'primary';
      case 'Result':
        return 'success';
      case 'Placement':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(parseISO(timestamp.replace(' ', 'T')), { addSuffix: true });
    } catch (error) {
      return timestamp;
    }
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        position: 'relative',
        opacity: notification.isViewed ? 0.75 : 1,
        backgroundColor: notification.isViewed ? alpha('#f5f5f5', 0.7) : '#ffffff',
        borderLeft: notification.priority === 'High' ? '4px solid #f44336' : 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center" gap={1.5}>
            {getTypeIcon()}
            <Box>
              <Typography variant="h6" component="div">
                {notification.Type}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ID: {notification.ID.slice(0, 8)}...
              </Typography>
            </Box>
          </Box>
          <Box display="flex" gap={1} flexWrap="wrap" justifyContent="flex-end">
            <Chip 
              label={notification.Type} 
              color={getTypeColor()} 
              size="small" 
              variant="outlined"
            />
            <Chip 
              label={`${notification.priority} Priority`} 
              color={getPriorityColor()} 
              size="small"
              icon={notification.priority === 'High' ? <PriorityHigh /> : undefined}
            />
            {!notification.isViewed && (
              <Chip 
                label="Unviewed" 
                color="default" 
                size="small"
                icon={<NewReleases sx={{ fontSize: 16 }} />}
                sx={{ fontWeight: 'bold' }}
              />
            )}
          </Box>
        </Box>
        
        <Typography variant="body1" sx={{ mb: 2, fontWeight: notification.priority === 'High' ? 'bold' : 'normal' }}>
          {notification.Message}
        </Typography>
        
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.secondary">
            {formatTimestamp(notification.Timestamp)}
          </Typography>
          {notification.isViewed && (
            <Box display="flex" alignItems="center" gap={0.5}>
              <Visibility sx={{ fontSize: 14, color: '#757575' }} />
              <Typography variant="caption" color="text.secondary">
                Viewed
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
      
      {!notification.isViewed && (
        <CardActions sx={{ pt: 0, pb: 2, px: 2 }}>
          <Button 
            size="small" 
            variant="contained"
            onClick={() => onMarkAsViewed(notification.ID)}
            startIcon={<Visibility />}
            sx={{ textTransform: 'none' }}
          >
            Mark as Viewed
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default NotificationCard;