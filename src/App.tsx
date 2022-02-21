import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './routes';
import GlabalStyle from './styles/global';

import AppProvider from './hooks';

const App: React.FC = () => {
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
