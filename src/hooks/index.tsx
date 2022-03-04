import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { ThemeProvider } from './theme';

import Wrapper from '../pages/Wrapper';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Wrapper>{children}</Wrapper>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
