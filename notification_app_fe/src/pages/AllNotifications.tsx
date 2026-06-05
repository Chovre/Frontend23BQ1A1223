import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Pagination,
  Stack,
  Button
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import NotificationCard from '../components/NotificationCard';
import FilterPanel from '../components/FilterPanel';
import { notificationApi } from '../api/notificationApi';
import type { Notification, NotificationType } from '../types/notification';

const AllNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [notifications, typeFilter, limit]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await notificationApi.getAllNotifications();
      setNotifications(data);
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to fetch notifications. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...notifications];
    
    if (typeFilter !== 'All') {
      filtered = notificationApi.filterByType(filtered, typeFilter as NotificationType);
    }
    
    filtered = notificationApi.getTopNNotifications(filtered, limit);
    
    setFilteredNotifications(filtered);
    setCurrentPage(1);
  };

  const handleMarkAsViewed = (id: string) => {
    const updatedNotifications = notificationApi.markAsViewed(notifications, id);
    setNotifications(updatedNotifications);
  };

  const handleTypeChange = (type: string) => {
    setTypeFilter(type);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
  };

  const handleReset = () => {
    setTypeFilter('All');
    setLimit(10);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotifications = filteredNotifications.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert 
          severity="error" 
          sx={{ mt: 3, mb: 2 }}
          action={
            <Button color="inherit" size="small" onClick={fetchNotifications} startIcon={<RefreshIcon />}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography variant="body2" color="text.secondary">
            Please check your internet connection or try again later.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          All Notifications
        </Typography>
        <Button 
          variant="outlined" 
          onClick={fetchNotifications}
          startIcon={<RefreshIcon />}
          size="small"
        >
          Refresh
        </Button>
      </Box>
      
      <FilterPanel
        typeFilter={typeFilter}
        limit={limit}
        onTypeChange={handleTypeChange}
        onLimitChange={handleLimitChange}
        onReset={handleReset}
      />
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredNotifications.length} notification(s)
        </Typography>
      </Box>
      
      {currentNotifications.length === 0 ? (
        <Alert severity="info">No notifications found.</Alert>
      ) : (
        <>
          {currentNotifications.map((notification) => (
            <NotificationCard
              key={notification.ID}
              notification={notification}
              onMarkAsViewed={handleMarkAsViewed}
            />
          ))}
          
          {totalPages > 1 && (
            <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Stack>
          )}
        </>
      )}
    </Container>
  );
};

export default AllNotifications;