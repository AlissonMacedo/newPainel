import { withGoogleMap, GoogleMap, withScriptjs } from 'react-google-maps';

const Map = withScriptjs(
  withGoogleMap(() => {
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{
          lat: -21.168374,
          lng: -47.75153,
        }}
        defaultOptions={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      />
    );
  }),
);

const MapComponent = () => {
  return (
    <Map
      googleMapURL="AIzaSyBffb-JobxOiAyBbg39zvx_duIo8NOAmxg"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: '100%' }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};
export default MapComponent;
