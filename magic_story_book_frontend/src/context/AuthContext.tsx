import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  login: () => void;
  logout: () => void;
  setUserProfile: (profile: UserProfile | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const login = () => {
    window.location.href = 'http://localhost:8081/login/oauth2/code/google';
  };

  const logout = () => {
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!userProfile, userProfile, login, logout, setUserProfile }}
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
