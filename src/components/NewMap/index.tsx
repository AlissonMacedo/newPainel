import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from 'react-google-maps';

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
  values: any;
  ref: any;
};

const MapRender = withScriptjs(
  withGoogleMap(({ deliveries, values, ref }: AppProps, props) => {
    return (
      <GoogleMap
        ref={ref}
        defaultOptions={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
        defaultCenter={values.mapCenter}
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

const Map: React.FC<AppProps> = ({ deliveries, values, ref }) => {
  return (
    <MapRender
      ref={ref}
      values={values}
      deliveries={deliveries}
      googleMapURL="AIzaSyBffb-JobxOiAyBbg39zvx_duIo8NOAmxg"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: '100%' }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};

export default Map;
