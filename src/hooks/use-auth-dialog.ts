
'use client';

import { useContext } from 'react';
import { AuthContext } from '@/components/auth-provider';

export const useAuthDialog = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthDialog must be used within an AuthProvider');
  }
  return context;
};
