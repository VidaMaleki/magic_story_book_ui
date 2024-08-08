// context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  age: string;
  lexile: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  token: string | null;
  login: () => void;
  logout: () => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken') || null);

  const login = () => {
    window.location.href = 'http://localhost:8081/oauth2/code/google';
  };

  const logout = () => {
    axios.post('http://localhost:8081/api/logout', {}, { withCredentials: true })
      .then(() => {
        setUserProfile(null);
        setToken(null);
        localStorage.removeItem('authToken');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/user/profile', {
        withCredentials: true
      });
      if (response.data) {
        const { user, token } = response.data;
        setUserProfile(user);
        if (token) {
          setToken(token);
          localStorage.setItem('authToken', token);
        }
      }
    } catch (error) {
      console.error('User not logged in:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!userProfile, userProfile, token, login, logout, setUserProfile, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
