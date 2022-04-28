/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useRef } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';

import pina from '../../../assets/pina.png';
import pinb from '../../../assets/pinb.png';
import pinc from '../../../assets/pinc.png';
import pind from '../../../assets/pind.png';
import pinfim from '../../../assets/pinfim.png';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const MyComponent = ({ setMap, values }: any) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
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

  const testePin = (index: number) => {
    switch (index) {
      case 0:
        return pina;
      case 1:
        return pinb;
      case 2:
        return pinc;
      case 3:
        return pind;
      default:
        return pinfim
    }
  }

  const directionsRendererOptions = React.useMemo<any>(() => {
    return {
      directions: values.route,
      draggable: false,
      markerOptions: { visible: false },
      polylineOptions: {
        strokeColor: "#273c64",
        strokeOpacity: 1,
        strokeWeight: 5,
        clickable: false
      }
    };
  }, [values.route]);


  const marker = useRef<Marker | null>();
  const [coordinate, setCoordinate] = useState({ lat: -7.611054, lng: -72.909161 });

  const positions = [
    { lat: -7.611777, lng: 72.909783 },
    { lat: -7.611607, lng: -72.909644 },
    { lat: -7.611982, lng: -72.909938 },
    { lat: -7.612457, lng: -72.909449 },
    { lat: -7.613081, lng: -72.908685 },
    { lat: -7.613403, lng: -72.908272 },
    { lat: -7.613901, lng: -72.907688 },
    { lat: -7.614076, lng: -72.907819 },
    { lat: -7.614282, lng: -72.908011 },
    { lat: -7.614673, lng: -72.908353 },
  ]


  const [curPos, setCurPos] = useState(0)
  const [curRot, setCurRot] = useState(0);


  const getRotation = (cPos: { lat: number; lng: number }, nPos: { lat: number; lng: number }) => {
    if (!cPos || !nPos) {
      return 0;
    }
    const latDiff = cPos.lat - nPos.lat;
    const lngDiff = cPos.lng - nPos.lng;
    return (Math.atan2(latDiff, lngDiff) * 180.0) / Math.PI;
  }

  const animate = (newCurPos: number) => {
    const newRot = getRotation(positions[curPos], positions[newCurPos]);
    setCurRot(newRot);
    const newCoordinate = positions[newCurPos];

    marker.current?.marker?.setPosition(newCoordinate);
    // setCoordinate(newCoordinate);
    setCurPos(curPos + 1);
  }

  const doUpdate = () => {
    const newCurPos = curPos + 1;
    if (curPos + 1 > positions.length) return;

    animate(newCurPos);
  }

  React.useEffect(() => {
    setTimeout(() => {
      doUpdate()
    }, 1500)
  }, [curPos])


  const svgMarker = {
    path: "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z",
    scale: .7,
    strokeColor: 'white',
    strokeWeight: .10,
    fillOpacity: 1,
    fillColor: '#404040',
    offset: '5%',
    rotation: curRot,
    anchor: new google.maps.Point(10, 25),
  };

  const svgMarker2 = {
    path: pinfim,
    scale: .7,
    strokeColor: 'white',
    strokeWeight: .10,
    fillOpacity: 1,
    fillColor: '#404040',
    offset: '5%',
    rotation: curRot,
    anchor: new google.maps.Point(10, 25),
  };


  const test = (index: number) => {
    if (values.deliveryRetorn === true && index + 1 === values.deliveries.length) {
      return {
        url: pinfim,
        opacity: 0,
      };
    }
    return testePin(index)
  }


  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onMapLoad}
      >
        {values.deliveries.map((delivery: any, index: number) => (
          <>
            {
              values.deliveryRetorn === false && (
                <Marker
                  position={{ lat: delivery.latitude, lng: delivery.longitude }}
                  animation={google.maps.Animation.DROP}
                  icon={test(index)}
                />
              )
            }

            {
              values.deliveryRetorn === true && index + 1 < values.deliveries.length && (
                <Marker
                  position={{ lat: delivery.latitude, lng: delivery.longitude }}
                  animation={google.maps.Animation.DROP}
                  icon={test(index)}
                />
              )
            }

            <Marker
              title='My Marker'
              // eslint-disable-next-line no-return-assign
              ref={(el: any) => (marker.current = el)}
              position={coordinate}
              animation={google.maps.Animation.DROP}
              icon={svgMarker}
            />
          </>
        ))}
        {values.deliveryRetorn &&
          <Marker
            position={{ lat: values.deliveries[0].latitude, lng: values.deliveries[0].longitude }}
            animation={google.maps.Animation.DROP}
            opacity={0.9}
            icon={{
              url: pinfim,
              anchor: new google.maps.Point(25, 58),
            }}

          />
        }
        {values.calculed && values.route && (
          <DirectionsRenderer options={directionsRendererOptions}
          />
        )}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default React.memo(MyComponent);
