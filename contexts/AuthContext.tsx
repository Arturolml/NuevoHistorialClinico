
import React, { createContext, useState, ReactNode } from 'react';
import { User, Patient, api } from '../services/mock-db';

interface AuthContextType {
  user: User | null;
  selectedPatient: Patient | null;
  login: (credential: string, pass: string) => Promise<boolean>;
  logout: () => void;
  selectPatient: (patient: Patient) => void;
  clearSelectedPatient: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const login = async (credential: string, pass: string) => {
    const loggedInUser = await api.login(credential, pass);
    if (loggedInUser) {
      setUser(loggedInUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setSelectedPatient(null);
  };

  const selectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
  };
    
  const clearSelectedPatient = () => {
    setSelectedPatient(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, selectedPatient, selectPatient, clearSelectedPatient }}>
      {children}
    </AuthContext.Provider>
  );
};