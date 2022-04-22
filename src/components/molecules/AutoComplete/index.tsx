/* eslint-disable no-undef */
import React, { useState, useCallback } from 'react';

import ReactGoogleMapLoader from 'react-google-maps-loader';
import ReactGooglePlacesSuggest from 'react-google-places-suggest';

import { useFormikContext } from 'formik';
import { Container } from './styles';

interface testeData {
  name: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  label?: string;
  value: string;
  stateOfUser: { name: string }[];
}
// https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest

export const AutoComplete = ({
  name,
  setFieldValue,
  label,
  value,
  stateOfUser,
}: testeData) => {
  const formik: any = useFormikContext();
  const [state, setState] = React.useState({ search: '', value: '' });
  const [isFocus, setIsFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      search: `${e.target.value}, Brasil`,
      value: `${e.target.value}, Brasil`,
    });
    setFieldValue(`${name}.address`, e.target.value); // endereco completo
    setFieldValue(`${name}.street`, e.target.value); // endereco completo
  };

  const handleSelectSuggest = (
    geocodedPrediction: google.maps.GeocoderResult,
  ) => {
    console.log('geocodedPrediction', geocodedPrediction) // eslint-disable-line

    const location = {
      lat: geocodedPrediction?.geometry?.location?.lat() || 0,
      lng: geocodedPrediction?.geometry?.location?.lng() || 0,
    };

    for (
      let adc = 0;
      adc < geocodedPrediction.address_components.length;
      adc += 1
    ) {
      if (geocodedPrediction.address_components[adc].types.includes('route')) {
        setFieldValue(
          `${name}.street`,
          geocodedPrediction.address_components[adc].long_name,
        );
      }
      if (
        geocodedPrediction.address_components[adc].types.includes(
          'street_number',
        )
      ) {
        setFieldValue(
          `${name}.number`,
          Number(geocodedPrediction.address_components[adc].long_name),
        );
      }
      if (
        geocodedPrediction.address_components[adc].types.includes(
          'sublocality_level_1',
        )
      ) {
        setFieldValue(
          `${name}.neighborhood`,
          geocodedPrediction.address_components[adc].long_name,
        );
      }
      if (
        geocodedPrediction.address_components[adc].types.includes(
          'administrative_area_level_2',
        )
      ) {
        setFieldValue(
          `${name}.city`,
          geocodedPrediction.address_components[adc].long_name,
        );
      }
      if (
        geocodedPrediction.address_components[adc].types.includes(
          'administrative_area_level_1',
        )
      ) {
        setFieldValue(
          `${name}.state`,
          geocodedPrediction.address_components[adc].long_name,
        );
      }
      if (
        geocodedPrediction.address_components[adc].types.includes('country')
      ) {
        setFieldValue(
          `${name}.state`,
          geocodedPrediction.address_components[adc].long_name,
        );
      }
      if (
        geocodedPrediction.address_components[adc].types.includes('postal_code')
      ) {
        setFieldValue(
          `${name}.postal_code`,
          geocodedPrediction.address_components[adc].long_name,
        );
      }
      setFieldValue(`${name}.longitude`, location.lng); // lng
      setFieldValue(`${name}.latitude`, location.lat); // lat
      setFieldValue(`${name}.address`, geocodedPrediction.formatted_address); // endereco completo
    }

    setState({
      search: '',
      value: geocodedPrediction.formatted_address,
    });
  };

  const handleInputFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocus(false);
    setIsFilled(!!formik.getFieldProps(name).value);
  }, []);

  return (
    <ReactGoogleMapLoader
      params={{
        key: 'AIzaSyBffb-JobxOiAyBbg39zvx_duIo8NOAmxg',
        libraries: 'places,geocode',
      }}
      render={googleMaps =>
        googleMaps && (
          <Container
            isErrored={!!formik.errors[name]}
            isFocus={isFocus}
            isFilled={isFilled}
            data-testid="input-container"
          >
            {label && (
              <div className="label">
                <strong>{label}</strong>
              </div>
            )}
            <ReactGooglePlacesSuggest
              googleMaps={googleMaps}
              autocompletionRequest={{
                input: state.search,
              }}
              onSelectSuggest={handleSelectSuggest}
              textNoResults="Não encontramos o endereço" // null or "" if you want to disable the no results item
            >
              <input
                className="ant-input-affix-wrapper"
                type="text"
                value={value}
                placeholder="Digite um endereço"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </ReactGooglePlacesSuggest>
          </Container>
        )
      }
    />
  );
};
