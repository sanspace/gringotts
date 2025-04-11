// src/pages/DashboardPage.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

// MUI Components
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        {/* Personalized Welcome Message */}
        <Typography variant="h4" component="h1" gutterBottom>
          {/* Display user's name, fallback to 'User' if name is not available */}
          Hi, {user?.name || 'User'}!
        </Typography>
        <Typography variant="body1">
          Welcome back to your Gringotts dashboard.
          {/* You could add more user-specific info here if needed */}
          {/* {user?.email && <p>Your email: {user.email}</p>} */}
        </Typography>
        {/* Rest of your dashboard content */}
      </Box>
    </Container>
  );
};

export default DashboardPage;
