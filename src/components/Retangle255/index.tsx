import React from 'react';
import { Formik } from 'formik';
import { Button } from '..';

import { Container, Main, MapContainer } from './styles';
import { AutoComplete } from '../AutoComplete';

import { Input } from '../InputNew';

const Retangle255 = () => {
  return (
    <Container>
      <Formik
        initialValues={{
          teste: '',
          teste2: '',
          teste3: '',
          teste4: '',
          address: '',
          delivery: {
            id: Math.random(),
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            longitude: '',
            latitude: '',
            obs: '',
            address: '',
            payment: 0,
          },
          deliveries: [
            {
              id: Math.random(),
              street: 'José Milena',
              number: '211',
              complement: '',
              neighborhood: 'centro',
              city: 'Ribeirão Preto',
              state: 'São Paulo',
              longitude: '',
              latitude: '',
              obs: '',
              address: 'Jose Milena, 211 - Ribeirão Preto, São Paulo - Brasil',
              payment: 0,
            },
          ],
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
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
          function teste() {
            setFieldValue('deliveries', [
              ...values.deliveries,
              values.delivery,
            ]);

            setFieldValue('delivery', {
              id: Math.random(),
              street: '',
              number: '',
              complement: '',
              neighborhood: '',
              city: '',
              state: '',
              longitude: '',
              latitude: '',
              obs: '',
              address: '',
              payment: 0,
            });
          }

          function editDelivery(index: any) {
            setFieldValue('delivery', values.deliveries[index]);
          }
          return (
            <form onSubmit={handleSubmit}>
              <div>
                <h3>Rota de entrega</h3>
              </div>
              {values.deliveries.map((item, index) => (
                <div className="address">
                  <div>
                    <h4>{`${item.street}, ${item.number}`}</h4>
                    <span>{`${item.city}, ${item.state} - Brasil`}</span>
                    <button type="button" onClick={() => editDelivery(index)}>
                      <strong>Editar</strong>
                    </button>
                  </div>
                  <div className="destiny">
                    <h4>Destino 1</h4>
                  </div>
                </div>
              ))}
              <div className="teste">
                <div>
                  <AutoComplete
                    label="Endereço"
                    value={values.delivery.address}
                    name="delivery"
                    setFieldValue={setFieldValue}
                    stateOfUser={[{ name: 'Mancio Lima' }]}
                  />
                  <Input name="delivery.number" />
                </div>
                <div>
                  <input name="complement" />
                </div>
                <div>
                  <input
                    type="text"
                    name="teste4"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.teste4}
                  />
                </div>
              </div>
              <Button
                typeStyle="secondary"
                type="button"
                onClick={() => teste()}
              >
                Confirmar endereço
              </Button>
            </form>
          );
        }}
        <Main>{/* <Retangle256 /> */}</Main>
      </Formik>
    </Container>
  );
};
export default Retangle255;
