
'use client';

import React, { useState } from 'react';
import { AuthDialog } from '@/components/auth-dialog';

interface AuthContextType {
  isAuthDialogOpen: boolean;
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);

  const openAuthDialog = () => setAuthDialogOpen(true);
  const closeAuthDialog = () => setAuthDialogOpen(false);

  return (
    <AuthContext.Provider value={{ isAuthDialogOpen, openAuthDialog, closeAuthDialog }}>
      {children}
      <AuthDialog />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
