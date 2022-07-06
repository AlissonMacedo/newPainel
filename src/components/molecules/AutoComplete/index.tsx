/* eslint-disable no-undef */
import React, { useState, useCallback } from 'react';

import ReactGoogleMapLoader from 'react-google-maps-loader';
import ReactGooglePlacesSuggest from 'react-google-places-suggest';

import { useFormikContext } from 'formik';
import { Container, DivHistorySuggest } from './styles';
import { handleSelectSuggest } from './helpers';
import { useBusiness } from '../../../pages/Business/Context';

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
  const { addCacheAddress, cacheAddress } = useBusiness();
  const [showSugest, setShowSugest] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      search: `${e.target.value}, Brasil`,
      value: `${e.target.value}, Brasil`,
    });
    setFieldValue(`${name}.address`, e.target.value); // endereco completo
    setFieldValue(`${name}.street`, e.target.value); // endereco completo
  };

  const handleInputFocus = useCallback(() => {
    setIsFocus(true);
    setShowSugest(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setTimeout(() => {
      setIsFocus(false);
      setIsFilled(!!formik.getFieldProps(name).value);
      setShowSugest(false);
    }, 100);
  }, []);

  const handleHistorySelectSuggest = (id: number) => {
    const addressSelected = cacheAddress.find(item => item.id === id);

    if (addressSelected) {
      setFieldValue(`${name}.address`, addressSelected.address); // endereco completo
      setFieldValue(`${name}.street`, addressSelected.street); // endereco completo
      setFieldValue(`${name}.city`, addressSelected.city); // endereco completo
      setFieldValue(`${name}.latitude`, addressSelected.latitude); // endereco completo
      setFieldValue(`${name}.longitude`, addressSelected.longitude); // endereco completo
      setFieldValue(`${name}.neighborhood`, addressSelected.neighborhood); // endereco completo
      setFieldValue(`${name}.complement`, addressSelected.complement); // endereco completo
      setFieldValue(`${name}.number`, addressSelected.number); // endereco completo
      setFieldValue(`${name}.street`, addressSelected.street); // endereco completo
    }

    setShowSugest(false);
    setIsFocus(false);
    setIsFilled(!!formik.getFieldProps(name).value);
    console.log('addressSelected', addressSelected);
  };

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
              onSelectSuggest={geocodedPrediction =>
                handleSelectSuggest(
                  name,
                  setFieldValue,
                  geocodedPrediction,
                  setState,
                )
              }
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

            {value.length === 0 && showSugest && (
              <DivHistorySuggest className="sc-ieecCq dwXijq">
                <div className="sc-ieecCq dwXijq">
                  {cacheAddress.map(item => (
                    <div key={Math.random()}>
                      <button
                        type="button"
                        onClick={() => handleHistorySelectSuggest(item.id)}
                      >
                        {`${item.street}, ${item.number} - ${item.city}`}
                      </button>
                    </div>
                  ))}
                </div>
              </DivHistorySuggest>
            )}
          </Container>
        )
      }
    />
  );
};
