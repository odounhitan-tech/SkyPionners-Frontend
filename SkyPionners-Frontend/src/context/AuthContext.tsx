import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

type UserType = 'individual' | 'hospital' | 'organization' | 'association';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; userType?: UserType } | null;
  login: (username: string, userType?: UserType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ name: string; userType?: UserType } | null>(null);

  const login = (username: string, userType?: UserType) => {
    // In a real app, you'd perform authentication here
    setUser({ name: username, userType });
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
