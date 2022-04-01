/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const MyComponent = ({ map, setMap, values, setFieldValue, calcFreight }: any) => {
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

  const directionsServiceOptions =
    // @ts-ignore
    React.useMemo<google.maps.DirectionsRequest>(() => {
      const origin = {
        lat: values.deliveries[0].latitude,
        lng: values.deliveries[0].longitude,
      }

      const destination = values.deliveries[1] ? {
        lat: values.deliveries[1].latitude,
        lng: values.deliveries[1].longitude,
      } : null

      return {
        origin,
        waypoints: undefined,
        destination,
        travelMode: 'DRIVING',
      };
    }, [values.calculed]);

  const directionsCallback = React.useCallback(res => {
    if (res !== null && res.status === 'OK') {
      setFieldValue('route', res);
      calcFreight(res);
    } else {
      // ToDo: colocar erro no sentry
      console.log(res);
    }
  }, []);

  const directionsRendererOptions = React.useMemo<any>(() => {
    return {
      directions: values.route,
    };
  }, [values.route]);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onMapLoad}
      >
        {values.calculed && (
          <DirectionsService
            options={directionsServiceOptions}
            callback={directionsCallback}
          />
        )}
        {/* Child components, such as markers, info windows, etc. */}
        {!values.calculed && values.deliveries.map((delivery: any) => (
          <Marker
            position={{ lat: delivery.latitude, lng: delivery.longitude }}
          />
        ))}
        {values.route && (
          <DirectionsRenderer options={directionsRendererOptions} />
        )}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default React.memo(MyComponent);
