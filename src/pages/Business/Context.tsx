/* eslint-disable no-undef */
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useRef,
} from 'react';

interface BusinessContextData {
  data: object;
  traceRoute(): void;
  clearRoute(): void;
  onMapLoad(e: google.maps.Map): void;
  latLng: { lat: number; lng: number };
  response: google.maps.DistanceMatrixResponse | null;
  setResponse(a: google.maps.DistanceMatrixResponse | null): void;
  markers: Array<google.maps.LatLngLiteral> | null;
  destination: google.maps.LatLngLiteral | null;
  setCalculate(value: boolean): void;
  calculate: boolean;
}

const BusinessContext = createContext<BusinessContextData>(
  {} as BusinessContextData,
);

const BusinessProvider: React.FC = ({ children }) => {
  const node = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [latLng, setLatLng] = useState({ lat: -21.168434, lng: -47.751594 });

  const [pointA, setPointA] = useState<google.maps.LatLngLiteral>();
  const [pointB, setPointB] = useState<google.maps.LatLngLiteral>();

  const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>();
  const [destination, setDestination] =
    useState<google.maps.LatLngLiteral | null>(null);

  const [response, setResponse] =
    useState<google.maps.DistanceMatrixResponse | null>(null);

  const clearRoute = () => {
    setPointA(undefined);
    setPointB(undefined);
    setOrigin(null);
    setDestination(null);
    setResponse(null);
  };

  const traceRoute = () => {
    if (pointA && pointB) {
      setOrigin(pointA);
      setDestination(pointB);
    }
  };

  const onMapLoad = (m: any) => {
    setMap(m);
  };

  const [calculate, setCalculate] = useState<boolean>(false);
  const [markers, setMarkers] =
    useState<Array<google.maps.LatLngLiteral> | null>(null);

  return (
    <BusinessContext.Provider
      value={{
        data: {},
        traceRoute,
        clearRoute,
        onMapLoad,
        latLng,
        response,
        setResponse,
        markers,
        destination,
        setCalculate,
        calculate,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

function useBusiness(): BusinessContextData {
  const context = useContext(BusinessContext);

  return context;
}

export { BusinessProvider, useBusiness };
