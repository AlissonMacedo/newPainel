/* eslint-disable prettier/prettier */
import React, { useRef } from 'react';
import { Formik, FormikProps } from 'formik';

import { AutoComplete } from '../AutoComplete';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';

import { Container } from './styles';

import latLng from '../../../services/Locations';

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
  closeNewAdress: () => void;
  newValues: any;
  newSetFieldValue: (field: string, value: any) => void;
  show: boolean;
};

const NewAddress: React.FC<newAdressData> = ({
  submit,
  closeNewAdress,
  newValues,
  newSetFieldValue,
  show,
}) => {
  const formRef = useRef<FormikProps<any>>(null);
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
        id: Math.random(),
        latitude: response.lat,
        longitude: response.lng,
      };

      if (newValues.editing) {
        const newArr = newValues.deliveries
        const deliveryItem = newArr.findIndex((o: { id: number; }) => o.id === newDelivery.id);
        newArr.splice(deliveryItem, 1, newDelivery)

        newSetFieldValue('deliveries', newArr);
        newSetFieldValue('editing', false);
        newSetFieldValue('deliveries', newArr);
        newSetFieldValue('calculed', false);

        return
      }
      submit(newDelivery);
      formRef.current?.resetForm();
    } else {
      alert('Não foi possível localizar o endereço')
    }
  };

  return (
    <Formik
      // eslint-disable-next-line no-return-assign
      innerRef={formRef}
      initialValues={newValues.editing ? { delivery: newValues.delivery } : {
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
        }
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
        resetForm
        /* and other goodies */
      }) => {

        const closeForm = () => {
          newSetFieldValue('editing', false);
          console.log('rodou')
          resetForm();
          closeNewAdress();
        };

        return (
          <Container show={show}>
            <div className="inputs">
              <div className="titleform">
                <h4 style={{ color: '#444' }}>Adicionando um novo endereço:</h4>
                <button type="button" onClick={() => closeForm()}>
                  Fechar
                </button>
              </div>
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
                onClick={() => {
                  handleSubmit()
                }}
              >
                {
                  newValues.editing ?
                    'Salvar alteração' : 'Confirmar endereço'
                }
              </Button>
            </div>
          </Container>
        );
      }}
    </Formik >
  );
};

export default NewAddress;
