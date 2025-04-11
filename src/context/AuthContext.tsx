// src/context/AuthContext.tsx
import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
    ReactNode, // Type for children prop
  } from 'react';
  import { CredentialResponse } from '@react-oauth/google'; // Import the type for the response
  import { jwtDecode } from 'jwt-decode';
  
// Define an interface for the expected user info from the token
interface User {
  name?: string;       // Standard OIDC claim
  email?: string;      // Standard OIDC claim
  picture?: string;    // Standard OIDC claim
  given_name?: string; // First name
  family_name?: string;// Last name
  sub?: string;        // Subject ID (Google's unique ID for the user)
  // Add other fields if needed based on requested scopes
}
  
  // Define the shape of the context value
  interface AuthContextType {
    token: string | null;
    user: User | null;
    isLoggedIn: boolean;
    login: (credentialResponse: CredentialResponse) => void;
    logout: () => void;
  }
  
  // Create the context with an initial value of null
  const AuthContext = createContext<AuthContextType | null>(null);
  
  // Define props for the provider component
  interface AuthProviderProps {
    children: ReactNode; // Type the children prop
  }
  
  export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('authToken'));
    const [user, setUser] = useState<User | null>(null);
  

    useEffect(() => {
      if (token) {
        try {
          // Decode the token here when it changes or on initial load
          const decodedUser: User = jwtDecode(token);
          setUser(decodedUser); // Store the decoded user info
          localStorage.setItem('authToken', token); // Keep token in storage
          console.log("Decoded User Info:", decodedUser); // For debugging
        } catch (error) {
          console.error("Failed to decode token:", error);
          // Handle invalid token - clear state
          setToken(null);
          setUser(null);
          localStorage.removeItem('authToken');
        }
      } else {
        // Clear user info if token is removed
        setUser(null);
        localStorage.removeItem('authToken');
      }
    }, [token]); // This effect runs when the token state changes
  
    const login = (credentialResponse: CredentialResponse) => {
      if (credentialResponse.credential) {
        console.log("AuthContext: Setting token from CredentialResponse.");
        // Setting the token state will trigger the useEffect above to decode and set the user
        setToken(credentialResponse.credential);
      } else {
         console.error("Login failed: Credential missing from response.");
      }
    };
  
    const logout = () => {
      setToken(null);
    };
  
    // Memoize the context value
    const value = useMemo(
      () => ({
        token,
        user,
        isLoggedIn: !!user, // Boolean check if user object exists
        login,
        logout,
      }),
      [token, user] // Dependencies
    );
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  // Custom hook to use the auth context, ensuring it's used within a provider
  export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  