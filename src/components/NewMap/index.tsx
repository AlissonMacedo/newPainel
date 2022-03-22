import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from 'react-google-maps';
// import { Container } from './styles';

type AppProps = {
  deliveries: {
    id: number;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    longitude: number;
    latitude: number;
    obs: string;
    address: string;
    payment: number;
  }[];
};

const MapRender = withScriptjs(
  withGoogleMap(({ deliveries }: AppProps) => {
    return (
      <GoogleMap
        defaultOptions={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
        defaultCenter={{
          lat: deliveries[0].latitude,
          lng: deliveries[0].longitude,
        }}
        defaultZoom={15}
      >
        {deliveries.length > 0 &&
          deliveries.map(marker => {
            const position = {
              lat: marker.latitude,
              lng: marker.longitude,
            };
            return <Marker key={marker.latitude + 1} position={position} />;
          })}
      </GoogleMap>
    );
  }),
);

const Map: React.FC<AppProps> = ({ deliveries }) => {
  return (
    <MapRender
      deliveries={deliveries}
      googleMapURL="AIzaSyBffb-JobxOiAyBbg39zvx_duIo8NOAmxg"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: '100%' }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};

export default Map;
