// src/pages/DashboardPage.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext'; // To get user info
import { Link } from 'react-router-dom'; // Import Link for navigation

// MUI Components
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'; // <<< Import Grid (ensure correct default import)

// Optional Icon for Account Card
// import SettingsIcon from '@mui/icons-material/Settings';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg"> {/* Using lg for potentially wider dashboard */}
      <Box sx={{ my: 4 }}> {/* my: margin top/bottom */}

        {/* Personalized Welcome Message */}
        <Typography variant="h4" component="h1" gutterBottom>
          Hi, {user?.name || 'User'}!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}> {/* mb: margin-bottom */}
          Welcome back to your Gringotts dashboard overview.
        </Typography>

        {/* --- Grid Container for Cards --- */}
        <Grid container spacing={3}> {/* Use Grid container to layout cards */}

          {/* --- Profile Card Grid Item --- */}
          {/* Use the 'size' prop for v7, responsive object for breakpoints */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {/* Added height/flex styles to make cards in the same row equal height */}
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}> {/* Allow content to expand */}
                <Typography gutterBottom variant="h5" component="div">
                   {/* Simplified title */}
                   Profile
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View your connected account details, including name and email address.
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}> {/* Add padding */}
                <Button
                  component={Link}
                  to="/profile"
                  variant="contained"
                  size="small"
                >
                  View Profile
                </Button>
              </CardActions>
            </Card>
          </Grid>
          {/* --- End Profile Card Grid Item --- */}


          {/* --- START: Added Account Card Grid Item --- */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}> {/* Use 'size' prop */}
             <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                   <Typography gutterBottom variant="h5" component="div">
                      Account
                   </Typography>
                   <Typography variant="body2" color="text.secondary">
                      Manage your preferences, security options, and other account settings.
                   </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                   <Button
                      component={Link}
                      to="/account" // Link to the account page
                      variant="contained"
                      size="small"
                      // Optional: startIcon={<SettingsIcon />}
                   >
                      View Account
                   </Button>
                </CardActions>
             </Card>
          </Grid>
          {/* --- END: Added Account Card Grid Item --- */}

          {/* Add more <Grid size={...}> items here for future cards */}

        </Grid>
        {/* --- End Grid Container --- */}


        {/* Toned down message */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 4,
            fontStyle: 'italic'
          }}
        >
          More dashboard elements coming soon...
        </Typography>

      </Box>
    </Container>
  );
};

export default DashboardPage;
