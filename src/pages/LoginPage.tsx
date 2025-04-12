// src/pages/LoginPage.tsx
import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'; // Import CredentialResponse type
import { useAuth } from '../context/AuthContext'; // Ensure correct path
import { Navigate } from 'react-router-dom';

// MUI Components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const LoginPage: React.FC = () => {
  const { login, isLoggedIn } = useAuth();

  // Type the parameter explicitly
  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
        login(credentialResponse);
      } else {
        console.error("Login credential missing from response.");
      }
  };

  // onError callback from GoogleLogin doesn't typically pass detailed error objects
  // unless specific configurations are used. A simple console log is common.
  const handleLoginError = () => {
    console.error('Google Login Failed');
    // Optionally: Show a user-friendly error message via state
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
        //   marginTop: 8,
          minHeight: 'calc(90vh - 64px)', // Calculate min height: ~90% viewport height minus approx AppBar height (adjust 90vh/64px if needed)
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Keep horizontal centering of the Box's content if container is wider
          justifyContent: 'center', // Add this to vertically center the Paper component within the Box
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            padding: 4,
            width: '100%',
            maxWidth: 'md', // Optional: Set a max-width for the paper itself on larger screens
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Box
            sx={{
              width: '100%', // Ensure the box takes width for alignment
              textAlign: 'center', // Center the inline-block image within the Box
              mb: 3, // Add some margin below the image (mb = margin-bottom)
            }}
          >
            <img
              // Use the public path directly
              src="/gringotts.svg"
              alt="Gringotts Logo"
              // Adjust styling as needed
              style={{ maxWidth: '150px', height: 'auto' }} // Example size adjustment
            />
          </Box>

          <Typography component="h1" variant="h4" align="center" sx={{ mb: 1 }}> {/* mb: margin-bottom */}
            Welcome to Gringotts!
          </Typography>

          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}> {/* Added more margin-bottom */}
            Sign in with your Google account to securely access your vault.
          </Typography>

          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center'  }}>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
              shape="rectangular"
              theme="outline"
              size="large"
            />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
