import React from 'react';
import { AppBar, Toolbar, Typography, Box, Tabs, Tab } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentTab = location.pathname === '/priority' ? 1 : 0;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      navigate('/');
    } else {
      navigate('/priority');
    }
  };

  return (
    <AppBar position="sticky" sx={{ mb: 3, backgroundColor: '#1976d2' }}>
      <Toolbar>
        <NotificationsActiveIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Notification Center
        </Typography>
        <Box>
          <Tabs value={currentTab} onChange={handleTabChange} textColor="inherit" indicatorColor="secondary">
            <Tab label="All Notifications" sx={{ color: 'white' }} />
            <Tab label="Priority Notifications" sx={{ color: 'white' }} />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;