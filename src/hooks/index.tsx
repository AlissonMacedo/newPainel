import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

import { ThemeProvider } from './theme';
import Wrapper from '../pages/Wrapper';
import { analyticsEvent } from '../services/firebase/analytics';
import firebase from '../services/firebase';

const AppProvider: React.FC = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    firebase.analytics().setCurrentScreen(location.pathname);
  }, [location]);

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
