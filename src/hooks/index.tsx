import React, { ReactNode } from 'react';
import { AuthProvider } from './useAuth';

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
