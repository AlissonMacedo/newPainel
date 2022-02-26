import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { ThemeProvider } from './theme';

const AppProvider: React.FC = ({ children }) => {
  // const [theme] = usePersistedState('theme', light);

  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
