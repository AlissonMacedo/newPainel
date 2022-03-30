/* eslint-disable no-undef */
import React from 'react';
import { Formik } from 'formik';
import { Button } from '../../components/Button';

import { Container, Main, Content, ContentAdress } from './styles';
import NewAdress from '../../components/NewAdress';
import Map from '../../components/Map';

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

const Business: React.FC = () => {
  const [map, setMap] = React.useState<google.maps.Map>();

  return (
    <Formik
      initialValues={{
        addAdress: true,
        teste: '',
        teste2: '',
        teste3: '',
        teste4: '',
        address: '',
        delivery: {
          id: Math.random(),
          street: '',
          number: 0,
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
        deliveries: [
          {
            id: Math.random(),
            street: 'José Milena',
            number: '211',
            complement: '',
            neighborhood: 'centro',
            city: 'Ribeirão Preto',
            state: 'São Paulo',
            longitude: -47.751594,
            latitude: -21.168434,
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
        function teste(deliveries: AppProps) {
          setFieldValue('addAdress', false);
          setFieldValue('deliveries', [...values.deliveries, deliveries]);
          map?.panTo({ lat: deliveries.latitude, lng: deliveries.longitude });

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

        const addAddres = () => {
          setFieldValue('addAdress', true);
        };

        return (
          <Container>
            <Content>
              <form onSubmit={handleSubmit}>
                <div>
                  <h3>Rota de entrega</h3>
                </div>
                <ContentAdress>
                  {values.deliveries.map((item, index) => (
                    <div className="address">
                      <div className="destiny">
                        <h4>{`Destino ${index + 1}`}</h4>
                      </div>
                      <div>
                        <h4>{`${item.street}, ${item.number}`}</h4>
                        <span>{`${item.city}, ${item.state} - Brasil`}</span>
                        <button
                          type="button"
                          onClick={() => editDelivery(index)}
                        >
                          <strong>Editar</strong>
                        </button>
                      </div>
                    </div>
                  ))}
                </ContentAdress>
                {values.addAdress ? (
                  <NewAdress submit={deliveries => teste(deliveries)} />
                ) : (
                  <>
                    <Button
                      typeStyle="primary"
                      type="button"
                      onClick={() => addAddres()}
                    >
                      Adicionar um endereço
                    </Button>
                    <Button
                      typeStyle="info"
                      type="button"
                      onClick={() => addAddres()}
                    >
                      Calcular nova Rota
                    </Button>
                  </>
                )}
              </form>
            </Content>
            <Main>
              <Map map={map} setMap={setMap} values={values} />
            </Main>
          </Container>
        );
      }}
    </Formik>
  );
};

export default Business;
