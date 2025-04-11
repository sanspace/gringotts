// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Your global styles

import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Use .tsx extension

// Material UI Setup
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Vite automatically types import.meta.env
const googleClientId: string | undefined = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!googleClientId) {
  console.error("Error: Missing Google Client ID. Set VITE_GOOGLE_CLIENT_ID in .env");
}

// Optional: Define a basic MUI theme
const gringottsTheme = createTheme({
  palette: {
    mode: 'light', // Start with light mode (white background)
    primary: {
      // Black as the primary color
      main: '#000000', // Pure black
      // MUI calculates light/dark, but you can override if needed
      // light: '#333333',
      // dark: '#000000',
      contrastText: '#ffffff', // White text on black background
    },
    secondary: {
      // Also black, or a dark grey if you need distinction
      main: '#212121', // Very dark grey can work well
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff', // White page background
      paper: '#ffffff',   // White background for components like Card, Paper
    },
    text: {
      primary: '#000000',   // Black primary text
      secondary: '#424242', // Dark grey secondary text
    },
    // You could define error, warning, info, success too if needed
  },
  typography: {
    // Use the font we imported
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
    // Optionally adjust default weights or sizes
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    button: {
        textTransform: 'none', // Keep button text case as is, or use 'uppercase'
        fontWeight: 700,
    }
  },
  shape: {
    // Sharp corners like the logo's geometric shapes
    borderRadius: 0,
  },
  components: {
    // Optional: Override specific component styles
    MuiButton: {
      styleOverrides: {
        root: {
          // Ensure buttons have sharp corners if shape.borderRadius isn't enough
          borderRadius: 0,
        },
        // Contained buttons use primary color by default
        // containedPrimary: {
        //   backgroundColor: '#000000',
        //   color: '#ffffff',
        //   '&:hover': {
        //      backgroundColor: '#333333', // Slightly lighter black on hover
        //   }
        // }
      }
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                // Ensure AppBar uses primary color (it should by default)
                // backgroundColor: '#000000', // Explicitly set if needed
                // color: '#ffffff',          // Explicitly set if needed
            }
        }
    },
     MuiPaper: { // Style Paper components (like in LoginPage)
        styleOverrides: {
            root: {
                // Ensure sharp corners
                borderRadius: 0,
            }
        }
     }
    // Add other component overrides here if necessary
  }
});

// Use non-null assertion (!) assuming 'root' element always exists in index.html
const rootElement = document.getElementById('root')!;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {googleClientId ? (
      <GoogleOAuthProvider clientId={googleClientId}>
        <AuthProvider> {/* Manages authentication state */}
          <BrowserRouter> {/* Enables routing */}
            <ThemeProvider theme={gringottsTheme}> {/* Applies MUI theme */}
              <CssBaseline /> {/* MUI's CSS reset/baseline */}
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </AuthProvider>
      </GoogleOAuthProvider>
    ) : (
      <div>Configuration Error: Google Client ID is missing.</div>
    )}
  </React.StrictMode>
);
