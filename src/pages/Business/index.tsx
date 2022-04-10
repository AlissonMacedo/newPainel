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
import {
  handleCreateBusiness,
  closeNewAdress,
  calcFreight,
  saveNewAddress,
  initial,
} from './helpers';

type objDelivery = {
  qntPoints: number;
  kmDelivery: number;
  kmReturn: number;
};

const PageComponent: React.FC = () => {
  const [map, setMap] = React.useState<google.maps.Map>();
  const { loadFreight, createBusiness } = useBusiness();

  const newSubmit = React.useCallback(async data => {
    console.log('data', data);
  }, []);

  return (
    <Formik
      initialValues={initial}
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
                    submit={deliveries =>
                      saveNewAddress(setFieldValue, deliveries, values, map)
                    }
                    closeNewAdress={() => closeNewAdress(setFieldValue)}
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
                loadFreight={loadFreight}
              />
              <Retangle256
                values={values}
                handleCreateBusiness={() =>
                  handleCreateBusiness(
                    createBusiness,
                    setFieldValue,
                    values,
                    map,
                  )
                }
              />
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
