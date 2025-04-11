// src/pages/AccountPage.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext'; // To get user info
import { Link } from 'react-router-dom'; // <<< Import Link

// MUI Components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'; // <<< Import Button
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // <<< Import Icon

const AccountPage: React.FC = () => {
  // Get user details from the authentication context
  const { user } = useAuth();

  return (
    <Container maxWidth="lg"> {/* Use lg or md */}
      <Box sx={{ my: 4 }}> {/* Vertical margin */}

        {/* --- START: Added Back Button --- */}
        <Box sx={{ mb: 2, display: 'flex' }}> {/* mb for spacing below button */}
            <Button
                component={Link} // Use React Router Link
                to="/dashboard"  // Link destination
                variant="outlined" // Style as outlined
                size="small"
                startIcon={<ArrowBackIcon />} // Add back arrow icon
            >
                Back to Dashboard
            </Button>
        </Box>
        {/* --- END: Added Back Button --- */}

        {/* Page Title */}
        <Typography variant="h4" component="h1" gutterBottom>
          {/* Added optional chaining for safety, fallback to 'Account' */}
          {user?.given_name || user?.name ? `${user.given_name || user.name}'s Account` : 'Account Settings'}
        </Typography>

        {/* Page Content Area */}
        <Paper sx={{ p: 3 }}> {/* Padding inside paper */}
          <Typography variant="body1">
            Check your account balance, transactions here.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
            (Further account features will be added here.)
          </Typography>
        </Paper>

      </Box>
    </Container>
  );
};

export default AccountPage;