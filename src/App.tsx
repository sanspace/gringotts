// src/App.tsx
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom'; // Import Navigate
import LoginPage from './pages/LoginPage'; // Ensure paths are correct
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import { useAuth } from './context/AuthContext';

// MUI Components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

const App: React.FC = () => {
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

    
      {/* Basic App Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gringotts
          </Typography>
          {isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
              <Button color="inherit" onClick={logout}>Logout</Button>
              {/* --- Wrap User Info Box with Link --- */}
              <Link
                  to="/profile"
                  style={{ textDecoration: 'none', color: 'inherit' }} // Basic styling for the link
              >
                  <Box
                      sx={{
                          display: 'flex',
                          alignItems: 'center',
                          ml: 2,
                          cursor: 'pointer', // Add pointer cursor for better UX
                          '&:hover': { // Optional: subtle hover effect
                              opacity: 0.9,
                          }
                      }}
                  >
                      <Typography variant="body1" color="inherit" sx={{ mr: 1.5 }}>
                          {user?.name || 'User'}
                      </Typography>
                      <Avatar
                          alt={user?.name || 'User Avatar'}
                          src={user?.picture}
                          sx={{ width: 36, height: 36 }}
                      />
                  </Box>
              </Link>
              {/* --- End Link --- */}
            </>
          ) : (
            <>
              {/* Only show Login button if NOT on the /login page */}
              {location.pathname !== '/login' && (
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
              )}
              {/* If location.pathname IS '/login', this button won't render */}
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes Wrapper */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* Add more protected routes here */}
          </Route>

          {/* Redirect root based on login status */}
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
          />

          {/* 404 Not Found */}
          <Route path="*" element={<Typography variant="h4">404 Not Found</Typography>} />
        </Routes>
      </Box>

      <Box
        component="footer"
        sx={{
          py: 2, // Padding top and bottom (py = padding y-axis)
          px: 2, // Padding left and right
          mt: 'auto', // Push footer down if content is short
          backgroundColor: (theme) => theme.palette.primary.main,
        }}
      >
        <Typography 
          variant="body2" 
          align="center"
          sx={{
            color: (theme) => theme.palette.primary.contrastText,
         }}
        >
          {'© '}
          {new Date().getFullYear()}
          {' Gringotts Banking Corp. All Rights Reserved.'}
        </Typography>
      </Box>
      </Box>
    </>
  );
}

export default App;
