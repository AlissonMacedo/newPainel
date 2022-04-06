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

import Address from '../../components/Address';

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
          timeDelivery: 0,
          distanceTotal: 0,
          deliveriesTotal: 0,
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
            street: 'Rua Alberto Gadelha,80, Mâncio Lima - Acre',
            number: '80',
            complement: '',
            neighborhood: 'centro',
            city: 'Mâncio Lima',
            state: 'Acre',
            longitude: -72.906094,
            latitude: -7.61368,
            obs: '',
            address: 'Rua Alberto Gadelha,80, Mâncio Lima - Acre',
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
        function saveNewAddress(deliveries: AppProps) {
          setFieldValue('addAdress', false);
          setFieldValue('calculed', false);
          setFieldValue('route', null);

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
          setFieldValue(
            'dataToDelivery.deliveriesTotal',
            route.routes[0].legs.length,
          );

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
          setFieldValue('calculed', false);
          setFieldValue('route', null);
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
                    <Address index={index} item={item} values={values} />
                  ))}
                  {/* is return show address of origin */}
                  {values.deliveryRetorn && (
                    <Address
                      index={values.deliveries.length}
                      item={values.deliveries[0]}
                      values={values}
                    />
                  )}
                </ContentAdress>
                {values.addAdress ? (
                  <NewAdress
                    submit={deliveries => saveNewAddress(deliveries)}
                    closeNewAdress={closeNewAdress}
                  />
                ) : (
                  <ActionForm values={values} />
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
