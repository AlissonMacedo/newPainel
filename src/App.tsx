import React from 'react';
import RoutesComponent from './routes';

import GlabalStyle from './styles/global';

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <RoutesComponent />
      </AuthProvider>
      <GlabalStyle />
    </>
  );
};

export default App;
