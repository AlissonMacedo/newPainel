import React, { createContext, useContext } from 'react';

interface MapContextData {
  data: object;
}

const MapContext = createContext<MapContextData>({} as MapContextData);

const MapProvider: React.FC = ({ children }) => {
  return (
    <MapContext.Provider value={{ data: {} }}>{children}</MapContext.Provider>
  );
};

function useMap(): MapContextData {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error('useMap must be used with in a MapContext');
  }

  return context;
}

export { MapProvider, useMap };
