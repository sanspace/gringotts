// src/App.tsx
import React from 'react'; // Import useState
import { Routes, Route, Link, Navigate, useLocation, NavLink } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AccountPage from './pages/AccountPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

// MUI Components
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton'; // Import IconButton

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MenuIcon from '@mui/icons-material/Menu'; // Import MenuIcon
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const App: React.FC = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const location = useLocation();

  // State for controlling the temporary drawer's visibility
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Handler to toggle the drawer state
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { text: 'Profile', path: '/profile', icon: <PersonOutlineIcon /> },
    { text: 'Account', path: '/account', icon: <AccountBalanceWalletIcon /> }, 
  ];

  // Define Drawer content separately for clarity
  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}> {/* Close drawer if clicking inside Box but outside Button */}
      <Toolbar /> {/* Optional: Spacer to clear AppBar height, less critical for temporary */}
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              // onClick={handleDrawerToggle} // Already handled by Box onClick or NavLink navigation
              sx={{ textAlign: 'left', '&.active': { backgroundColor: 'action.selected' } }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const titleLinkPath = isLoggedIn ? '/dashboard' : '/login';

  return (
    // Simplified Root Box: Still use Flex Column for sticky footer
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />

      {/* AppBar: Back to simpler state, add MenuButton */}
      <AppBar component="nav" position="sticky"> {/* Use component="nav" for semantics */}
        <Toolbar>
          {/* Menu Button - Shows only when logged in */}
          {isLoggedIn && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }} // Can add display logic for breakpoints if needed later: sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* App Title */}
          <Typography
            variant="h6"
            component={Link} // Render this Typography as a Link component
            to={titleLinkPath} // Set the destination dynamically
            sx={{
              flexGrow: 1, // Keep this so it pushes other items right
              color: 'inherit', // Inherit color from AppBar
              textDecoration: 'none', // Remove hyperlink underline
              '&:hover': { // Optional: Add a subtle effect on hover
                opacity: 0.9,
              }
            }}
          >
            Gringotts
          </Typography>

          {/* Right Side Items */}
           {isLoggedIn ? (
                 <>
                    {console.log(user)}
                    <Button color="inherit" onClick={logout} startIcon={<LogoutIcon />}>Logout</Button>
                    <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, cursor: 'pointer', '&:hover': { opacity: 0.9 } }}>
                            <Typography variant="body1" color="inherit" sx={{ mr: 1.5 }}>{user?.full_name || 'User'}</Typography>
                            <Avatar alt={user?.full_name || 'User Avatar'} src={user?.picture} sx={{ width: 36, height: 36 }} />
                        </Box>
                    </Link>
                 </>
            ) : (
                 <> {location.pathname !== '/login' && (<Button color="inherit" component={Link} to="/login">Login</Button>)} </>
            )}
        </Toolbar>
      </AppBar>

      {/* Temporary Drawer Component - Rendered conditionally but outside main layout flow */}
       {isLoggedIn && (
          <Drawer
            anchor="left"
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle} // Closes when clicking backdrop
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
            //   display: { xs: 'block', sm: 'none' }, // Example: Only use temporary on mobile - adapt if needed
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawerContent}
          </Drawer>
       )}


      {/* Main Area Wrapper (No layout changes needed here for temporary drawer) */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          bgcolor: 'background.default',
        }}
      >
        {/* Main Content */}
        <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/account" element={<AccountPage />} />
              </Route>
              <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
              <Route path="*" element={<Typography variant="h4">404 Not Found</Typography>} />
          </Routes>
        </Box>

        {/* Footer */}
        <Box component="footer" sx={{ py: 2, px: 2, backgroundColor: (theme) => theme.palette.primary.main }}>
          <Typography variant="body2" sx={{ color: (theme) => theme.palette.primary.contrastText }} align="center">
            {'© '} {new Date().getFullYear()} {' Gringotts Banking Corp. All Rights Reserved.'}
          </Typography>
        </Box>
      </Box>
      {/* End Main Area Wrapper */}

    </Box> // End Outermost Box
  );
}

export default App;
