import React from 'react';
import RoutesComponent from './routes';

import GlabalStyle from './styles/global';

import AuthContext from './context/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AuthContext.Provider value={{ name: 'Diego' }}>
        <RoutesComponent />
      </AuthContext.Provider>
      <GlabalStyle />
    </>
  );
};

export default App;
