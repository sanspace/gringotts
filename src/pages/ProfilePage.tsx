// src/pages/ProfilePage.tsx
import React from "react";
import { useAuth } from "../context/AuthContext"; // To get user info
import { Link } from "react-router-dom";

// MUI Components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";

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
    <Container maxWidth="sm">
      {" "}
      {/* Adjust maxWidth as needed */}
      <Box sx={{ my: 4 }}>
        {" "}
        {/* my: margin top/bottom */}
        {/* --- START: Inserted Back Button --- */}
        <Box sx={{ mb: 2, display: "flex" }}>
          {" "}
          {/* mb for spacing below button */}
          <Button
            component={Link} // Use React Router Link
            to="/dashboard" // Link destination
            variant="outlined" // Style as outlined
            size="small"
            startIcon={<ArrowBackIcon />} // Add back arrow icon
          >
            Back to Dashboard
          </Button>
        </Box>
        {/* --- END: Inserted Back Button --- */}
        <Paper elevation={3} sx={{ p: 4 }}>
          {" "}
          {/* p: padding */}
          <Grid container spacing={3} direction="column" alignItems="center">
            {/* Profile Title */}
            <Grid size={12}>
              {" "}
              {/* Use size={12} for full width */}
              <Typography
                variant="h4"
                component="h1"
                align="center"
                gutterBottom
              >
                {/* Title - kept simple or use user.name */}
                {user.given_name || user.full_name}'s Profile
              </Typography>
            </Grid>

            {/* Avatar */}
            <Grid size={12}>
              {" "}
              {/* Use size={12} */}
              <Avatar
                alt={user.full_name || "User Avatar"}
                src={user.picture}
                sx={{ width: 100, height: 100, mb: 2, mx: "auto" }}
              />
            </Grid>

            {/* User Details Section */}
            <Grid size={12} sx={{ textAlign: "center" }}>
              {" "}
              {/* Use size={12} */}
              <Box sx={{ mb: 2 }}>
                {/* Name */}
                <Typography variant="h6" component="div" gutterBottom>
                  {user.full_name || "N/A"}
                </Typography>
                {/* Email with Icon */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary",
                    mt: 0.5,
                  }}
                >
                  <EmailIcon fontSize="small" sx={{ mr: 0.75 }} />
                  <Typography variant="body1" component="span">
                    {user.email || "N/A"}
                  </Typography>
                </Box>

                <Box
                  sx={{ mt: 2, borderTop: 1, borderColor: "divider", pt: 2 }}
                >
                  {/* Check if user.address exists and is a non-empty string */}
                  {user?.address &&
                  typeof user?.address === "string" &&
                  user?.address.trim() !== "" ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "text.secondary",
                      }}
                    >
                      <HomeIcon fontSize="small" sx={{ mr: 0.75 }} />
                      {/* Display the user.address string directly */}
                      <Typography
                        variant="body1"
                        component="div"
                        sx={{ textAlign: "left" }}
                      >
                        {user?.address}
                      </Typography>
                    </Box>
                  ) : (
                    // Message if user.address string is missing or empty
                    <Typography variant="body2" color="text.secondary">
                      Somewhere on this beautiful planet...
                    </Typography>
                  )}
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
