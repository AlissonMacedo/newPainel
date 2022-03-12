import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import RoutesComponent from './routes';
import GlabalStyle from './styles/global';
import AppProvider from './hooks';

import { SentryInitialization } from './services/Sentry';

const App: React.FC = () => {
  SentryInitialization();

  return (
    <Router>
      <AppProvider>
        <RoutesComponent />
      </AppProvider>
      <GlabalStyle />
    </Router>
  );
};

export default App;
