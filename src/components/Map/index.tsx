/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const MyComponent = ({ map, setMap, values }: any) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBffb-JobxOiAyBbg39zvx_duIo8NOAmxg',
  });

  const center = React.useMemo(
    () => ({
      lat: values.deliveries[0].latitude,
      lng: values.deliveries[0].longitude,
    }),
    [],
  );

  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onMapLoad}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {values.deliveries.map((delivery: any) => (
          <Marker
            position={{ lat: delivery.latitude, lng: delivery.longitude }}
          />
        ))}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default React.memo(MyComponent);
