// src/pages/DashboardPage.tsx
import React from 'react';
// import { useAuth } from '../context/AuthContext'; // Import if user data is needed

// MUI Components
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const DashboardPage: React.FC = () => {
  // const { user } = useAuth(); // User is typed from context

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome! You're logged in.
          {/* {user && ` Welcome, ${user.name}!`} */}
        </Typography>
      </Box>
    </Container>
  );
};

export default DashboardPage;
