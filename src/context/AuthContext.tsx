// src/context/AuthContext.tsx
import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
    ReactNode, // Type for children prop
    useCallback,
  } from 'react';
  import { CredentialResponse } from '@react-oauth/google'; // Import the type for the response
  
  
// Define an interface for the expected user info from the token
interface BackendUser {
  id: number;
  google_sub: string;
  email: string
  given_name?: string
  family_name?: string
  full_name?: string
  picture?: string
  // Add other fields if needed based on requested scopes
}
  
  // Define the shape of the context value
  interface AuthContextType {
    backendToken: string | null;
    user: BackendUser | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    login: (credentialResponse: CredentialResponse) => Promise<void>;
    logout: () => void;
  }
  
  // Create the context with an initial value of null
  const AuthContext = createContext<AuthContextType | null>(null);
  
  // Define props for the provider component
  interface AuthProviderProps {
    children: ReactNode; // Type the children prop
  }

  const getInitialAuthState = (): { token: string | null; user: BackendUser | null } => {
    try {
      const token = localStorage.getItem('backendAuthToken');
      const userString = localStorage.getItem('authUser');
      const user = userString ? JSON.parse(userString) as BackendUser : null;

      if (token && user && typeof user === 'object' && user !== null && 'id' in user) {
        return { token, user };
      }
    } catch (error) {
      console.error("Failed to parse auth state from localStorage:", error);
    }
    localStorage.removeItem('backendAuthToken');
    localStorage.removeItem('authUser');
    return { token: null, user: null };
  };
  
  export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [backendToken, setBackendToken] = useState<string | null>(() => getInitialAuthState().token);
    const [user, setUser] = useState<BackendUser | null>(() => getInitialAuthState().user);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
      if (backendToken && user) {
        localStorage.setItem('backendAuthToken', backendToken);
        localStorage.setItem('authUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('backendAuthToken');
        localStorage.removeItem('authUser');
      }
    }, [backendToken, user]);

  const login = useCallback(async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error("Login failed: Google credential missing from response.");
      setIsLoading(false); // Ensure loading stops
      return; // Exit if no Google token
    }

    console.log("AuthContext: Initiating login process...");
    const googleToken = credentialResponse.credential;
    setIsLoading(true); // Indicate loading start

    try {
      // --- Call your backend's endpoint ---
      const response = await fetch('http://127.0.0.1:8000/auth/google', { // Use correct URL to your backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: googleToken }), // Send Google token
      });

      if (!response.ok) {
        // Handle HTTP errors (e.g., 401 Unauthorized, 500 Server Error)
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        console.error("Backend login failed:", response.status, errorData.detail);
        throw new Error(errorData.detail || `HTTP error ${response.status}`);
      }

      // --- Process successful response from backend ---
      const backendResponse: { access_token: string; token_type: string; user: BackendUser } = await response.json();

      console.log("User Details from the backend:");
      console.log(backendResponse.user);

      if (backendResponse.access_token && backendResponse.user) {
        console.log("AuthContext: Received backend token and user info.");
        // --- Set the backend token and user state ---
        setBackendToken(backendResponse.access_token);
        setUser(backendResponse.user);
      } else {
          console.error("Backend response missing access_token or user data.");
          throw new Error("Invalid response from server.");
      }

    } catch (error) {
      console.error("Error during backend authentication:", error);
      // Clear any potentially partially set state on error
      setBackendToken(null);
      setUser(null);
       // Optionally: show error message to user
    } finally {
      setIsLoading(false); // Indicate loading end
    }
  }, []); // useCallback with empty dependency array

  
  const logout = useCallback(() => {
    console.log("AuthContext: Logging out.");
    setBackendToken(null);
    setUser(null);
    // No need to call backend on logout unless you want to invalidate the token server-side
  }, []);

  
  // Memoize the context value
  const value = useMemo(
    () => ({
      backendToken,
      user,
      isLoading,
      isLoggedIn: !!backendToken && !!user, // User is logged in if we have a backend token and user info
      login,
      logout,
    }),
    [backendToken, user, isLoading, login, logout] // Dependencies
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook remains the same, but returns the updated context type
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};