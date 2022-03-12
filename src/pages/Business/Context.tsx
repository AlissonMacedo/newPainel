import React, { createContext, useContext } from 'react';

interface BusinessContextData {
  data: object;
}

const BusinessContext = createContext<BusinessContextData>(
  {} as BusinessContextData,
);

const BusinessProvider: React.FC = ({ children }) => {
  return (
    <BusinessContext.Provider value={{ data: {} }}>
      {children}
    </BusinessContext.Provider>
  );
};

function useBusiness(): BusinessContextData {
  const context = useContext(BusinessContext);

  if (!context) {
    throw new Error('useBusiness must be used with in a BusinessContext');
  }

  return context;
}

export { BusinessProvider, useBusiness };
