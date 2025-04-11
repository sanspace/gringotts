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
  
  // Optional: Define a type for your user object if you decode the token
  // interface User {
  //   id: string;
  //   name: string;
  //   email: string;
  //   // Add other relevant fields you might get from the token
  // }
  
  // Define the shape of the context value
  interface AuthContextType {
    token: string | null;
    // user: User | null; // Use if you have a User interface
    user: object | null; // Simple object placeholder for now
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
    // const [user, setUser] = useState<User | null>(null); // Use if you have a User interface
    const [user, setUser] = useState<object | null>(null); // Simple object placeholder
  
    useEffect(() => {
      if (token) {
        // **SECURITY NOTE:** (Same as before) Verify token on backend in production.
        localStorage.setItem('authToken', token);
        // Example: Decode token client-side (use cautiously) or fetch user data
        // const decodedUser: User = jwtDecode(token); // Example with jwt-decode
        // setUser(decodedUser);
        setUser({}); // Simulate user presence
      } else {
        localStorage.removeItem('authToken');
        setUser(null);
      }
    }, [token]);
  
    const login = (credentialResponse: CredentialResponse) => {
      if (credentialResponse.credential) {
        console.log("Google Sign-In Success. ID Token:", credentialResponse.credential);
        setToken(credentialResponse.credential);
      } else {
        console.error("Login failed: No credential received.");
        // Handle cases where the credential might be missing
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
  