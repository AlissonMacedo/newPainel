/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import React from 'react';
import { Formik, isObject } from 'formik';

import { Container, Main, Content, ContentAdress } from './styles';
import NewAdress from '../../components/NewAdress';
import Map from '../../components/Map';
import Retangle256 from '../../components/Retangle256';
import { BusinessProvider, useBusiness } from './Context';
import ActionForm from '../../components/ActionForm';

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

type objDelivery = {
  qntPoints: number;
  kmDelivery: number;
  kmReturn: number;
};

const PageComponent: React.FC = () => {
  const [map, setMap] = React.useState<google.maps.Map>();
  const { loadFreight } = useBusiness();

  const newSubmit = React.useCallback(async data => {
    console.log('data', data);
  }, []);

  return (
    <Formik
      initialValues={{
        calculed: false,
        route: null,
        addAdress: true,
        deliveryRetorn: false,
        travelMode: 'DRIVING',
        optimizeWaypoints: true,
        vehicleType: 0,
        serviceType: 0,
        dataToDelivery: {
          totaToPay: 0,
          timeDelivery: 1,
          distanceTotal: 1,
          deliveriesTotal: 2,
        },
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
      onSubmit={async (values, { setSubmitting }) => {
        await newSubmit(values);
        setSubmitting(false);
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

        const calcFreight = async (route: any) => {
          let leng = 0;
          let dur = 0;
          if (
            typeof route.routes[0] === 'object' &&
            typeof route.routes[0].legs === 'object'
          ) {
            for (let rt = 0; rt < route.routes[0].legs.length; rt++) {
              leng += route.routes[0].legs[rt].distance.value;
              dur += route.routes[0].legs[rt].duration.value;
            }
          }

          setFieldValue(
            'dataToDelivery.distanceTotal',
            (leng / 1000).toFixed(1),
          );
          setFieldValue('dataToDelivery.timeDelivery', Math.round(dur / 60));

          let newObj: {
            qntPoints: number;
            kmDelivery: number;
            kmReturn: number;
          };

          if (values.deliveryRetorn) {
            newObj = {
              qntPoints: route.routes[0].legs.length,
              kmDelivery:
                leng -
                route.routes[0].legs[route.routes[0].legs.length - 1].distance
                  .value,
              kmReturn:
                route.routes[0].legs[route.routes[0].legs.length - 1].distance
                  .value,
            };
          } else {
            newObj = {
              qntPoints: route.routes[0].legs.length + 1,
              kmDelivery: leng,
              kmReturn: 0,
            };
          }

          const newFreight = {
            city: 'Mâncio Lima',
            cityId: 1200336,
            qntPoints: newObj.qntPoints,
            kmDelivery: newObj.kmDelivery,
            kmReturn: newObj.kmReturn,
            vehicleType: values.vehicleType,
          };

          const {
            isError,
            newReturn: { deliveryTax, returnTax },
          } = await loadFreight(newFreight);

          if (!isError) {
            if (!!deliveryTax && !!returnTax) {
              setFieldValue(
                'dataToDelivery.totaToPay',
                deliveryTax + returnTax,
              );
            } else {
              setFieldValue('dataToDelivery.totaToPay', deliveryTax);
            }
          }
        };

        const closeNewAdress = () => {
          setFieldValue('addAdress', false);
        };

        return (
          <Container>
            <form onSubmit={handleSubmit}>
              <Content>
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
                  <NewAdress
                    submit={deliveries => teste(deliveries)}
                    closeNewAdress={closeNewAdress}
                  />
                ) : (
                  <ActionForm values={values} setFieldValue={setFieldValue} />
                )}
              </Content>
            </form>
            <Main>
              <Map
                map={map}
                setMap={setMap}
                values={values}
                setFieldValue={setFieldValue}
                calcFreight={calcFreight}
              />
              <Retangle256 values={values} />
            </Main>
          </Container>
        );
      }}
    </Formik>
  );
};

const Business = () => {
  return (
    <BusinessProvider>
      <PageComponent />
    </BusinessProvider>
  );
};

export default Business;
