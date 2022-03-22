import React from 'react';
import { Formik } from 'formik';

import { object } from 'yup/lib/locale';
import { AutoComplete } from '../AutoComplete';
import { Input } from '../InputNew';
import { Button } from '../Button';

import { Container } from './styles';

import latLng from '../../services/Locations';

type AppProps = {
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
};

type newAdressData = {
  submit: (value: AppProps) => void;
};

const NewAdress: React.FC<newAdressData> = ({ submit }) => {
  const onSubmit = async (delivery: AppProps) => {
    // if the user is not select adress in autoComplete when
    // is necessary search adress for location lat and lng;
    const response = await latLng.get(
      delivery.street,
      delivery.neighborhood,
      delivery.number,
      delivery.city,
      delivery.state,
    );

    if (response) {
      const newDelivery = {
        ...delivery,
        latitude: response.lat,
        longitude: response.lng,
      };

      submit(newDelivery);
      console.log('response', response);
    }
  };

  return (
    <Formik
      initialValues={{
        delivery: {
          id: Math.random(),
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: '',
          longitude: 0,
          latitude: 0,
          obs: '',
          address: '',
          payment: 0,
        },
      }}
      onSubmit={values => onSubmit(values.delivery)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        /* and other goodies */
      }) => {
        return (
          <Container>
            <div className="inputs">
              <h4 style={{ color: '#444' }}>Adicinando um novo endereço:</h4>
              <div className="column.Row">
                <AutoComplete
                  label="Endereço"
                  value={values.delivery.address}
                  name="delivery"
                  setFieldValue={setFieldValue}
                  stateOfUser={[{ name: 'Mancio Lima' }]}
                />
                <div style={{ width: 100, marginLeft: 15 }}>
                  <Input label="Número" name="delivery.number" type="number" />
                </div>
              </div>
              <div>
                <div style={{ width: '50%', marginRight: 8 }}>
                  <Input label="Complemento" name="delivery.complement" />
                </div>
                <div style={{ width: '50%', marginLeft: 7 }}>
                  <Input label="Observações" name="delivery.obs" />
                </div>
              </div>
            </div>
            <div className="divButton">
              <Button
                typeStyle="secondary"
                type="button"
                onClick={() => handleSubmit()}
              >
                Confirmar endereço
              </Button>
            </div>
          </Container>
        );
      }}
    </Formik>
  );
};

export default NewAdress;
