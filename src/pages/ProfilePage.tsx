// src/pages/ProfilePage.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext'; // To get user info

// MUI Components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid'; // Optional grid layout
import EmailIcon from '@mui/icons-material/Email'; // Import the Email icon



const ProfilePage: React.FC = () => {
  // Get user details from the authentication context
  const { user } = useAuth();

  // Optional: Handle case where user data might not be loaded yet,
  // though ProtectedRoute should prevent access if not logged in.
  if (!user) {
    return (
        <Container maxWidth="sm">
            <Typography>Loading user data...</Typography>
        </Container>
    ); // Or redirect, or show loading spinner
  }

  return (
    <Container maxWidth="sm"> {/* Adjust maxWidth as needed */}
      <Box sx={{ my: 4 }}> {/* my: margin top/bottom */}
        <Paper elevation={3} sx={{ p: 4 }}> {/* p: padding */}
          <Grid container spacing={3} direction="column" alignItems="center">
            {/* Profile Title */}
            <Grid size={12}> {/* Use size={12} for full width */}
              <Typography variant="h4" component="h1" align="center" gutterBottom>
              {user.given_name || user.name}'s Profile
              </Typography>
            </Grid>

            {/* Avatar */}
            <Grid size={12}> {/* Use size={12} */}
              <Avatar
                alt={user.name || 'User Avatar'}
                src={user.picture}
                sx={{ width: 100, height: 100, mb: 2, mx: 'auto' }}
              />
            </Grid>

            {/* User Details Section */}
            <Grid size={12} sx={{ textAlign: 'center' }}> {/* Use size={12} */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {user.name || 'N/A'}
                </Typography>
              {/* Use a Box with Flexbox to align Icon and Text */}
              <Box
                sx={{
                  display: 'flex',          // Enable Flexbox
                  alignItems: 'center',     // Vertically align items in the middle
                  justifyContent: 'center', // Horizontally center the icon+text group
                  color: 'text.secondary',  // Apply secondary color to both icon and text
                  mt: 0.5,                  // Optional margin-top for spacing from name
                }}
              >
                {/* Email Icon */}
                <EmailIcon
                  fontSize="small" // Adjust size: 'inherit', 'small', 'medium', 'large'
                  sx={{ mr: 0.75 }} // Add margin to the right of the icon (adjust value as needed)
                />

                {/* Email Text */}
                <Typography variant="body1" component="span"> {/* Use component="span" for inline flow */}
                  {user.email || 'N/A'}
                </Typography>
              </Box>

              </Box>
            </Grid>

          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfilePage;
