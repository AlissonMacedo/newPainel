/* eslint-disable no-undef */
import React, { useMemo, useState, useCallback } from 'react';
import {
  GoogleMap,
  Marker,
  LoadScript,
  StandaloneSearchBox,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { Container, Context } from './styles';

import { MapProvider } from './Context';

const PageComponent: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map>();
  const [searchBoxA, setSearchBoxA] =
    React.useState<google.maps.places.SearchBox>();
  const [searchBoxB, setSearchBoxB] =
    React.useState<google.maps.places.SearchBox>();

  const [pointA, setPointA] = useState<google.maps.LatLngLiteral>();
  const [pointB, setPointB] = useState<google.maps.LatLngLiteral>();

  const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>();
  const [destination, setDestination] =
    useState<google.maps.LatLngLiteral | null>();

  const [response, setResponse] =
    useState<google.maps.DistanceMatrixResponse | null>();

  const latLng = { lat: -21.168434, lng: -47.751594 };

  const onLoadA = (ref: google.maps.places.SearchBox) => {
    setSearchBoxA(ref);
  };

  const onLoadB = (ref: google.maps.places.SearchBox) => {
    setSearchBoxB(ref);
  };

  const onMapLoad = (m: google.maps.Map) => {
    setMap(m);
  };

  const onPlacesChangedA = () => {
    const places = searchBoxA!.getPlaces();
    console.log(places);
    const place = places![0];
    const location = {
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    };
    setPointA(location);
    setOrigin(null);
    setDestination(null);
    setResponse(null);
    map?.panTo(location);
  };

  const onPlacesChangedB = () => {
    const places = searchBoxB!.getPlaces();
    console.log('places', places);
    const place = places![0];
    const location = {
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    };

    setPointB(location);
    setOrigin(null);
    setDestination(null);
    setResponse(null);

    map?.panTo(location);
  };

  const traceRoute = () => {
    if (pointA && pointB) {
      setOrigin(pointA);
      setDestination(pointB);
    }
  };

  console.log('searchBoxA', searchBoxA);
  const clearRoute = () => {
    setPointA(undefined);
    setPointB(undefined);
    setOrigin(null);
    setDestination(null);
    setResponse(null);
  };

  const directionsServiceOptions =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useMemo<google.maps.DirectionsRequest>(() => {
      return {
        origin,
        destination,
        travelMode: 'DRIVING',
      };
    }, [origin, destination]);

  const directionsCallback = useCallback(res => {
    if (res !== null && res.status === 'OK') {
      console.log('res', res);
      setResponse(res);
    } else {
      console.log('res', res);
    }
  }, []);

  const directionsRenderOptions = useMemo<any>(() => {
    return {
      directions: response,
    };
  }, [response]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBffb-JobxOiAyBbg39zvx_duIo8NOAmxg"
      libraries={['places']}
    >
      <Context>
        <StandaloneSearchBox
          onLoad={onLoadA}
          onPlacesChanged={onPlacesChangedA}
        >
          <input placeholder="Search" />
        </StandaloneSearchBox>
        <StandaloneSearchBox
          onLoad={onLoadB}
          onPlacesChanged={onPlacesChangedB}
        >
          <input placeholder="Search" />
        </StandaloneSearchBox>
        <button type="button" onClick={traceRoute}>
          Traçar rota
        </button>
        <button type="button" onClick={clearRoute}>
          Limpar
        </button>
      </Context>
      <Container>
        <GoogleMap
          onLoad={onMapLoad}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={latLng}
          zoom={15}
        >
          {!response && pointA && <Marker position={pointA} />}
          {!response && pointB && <Marker position={pointB} />}

          {origin && destination && (
            <DirectionsService
              options={directionsServiceOptions}
              callback={directionsCallback}
            />
          )}

          {response && directionsRenderOptions && (
            <DirectionsRenderer options={directionsRenderOptions} />
          )}
        </GoogleMap>
      </Container>
    </LoadScript>
  );
};

const Map: React.FC = () => {
  return (
    <MapProvider>
      <PageComponent />
    </MapProvider>
  );
};

export default Map;
