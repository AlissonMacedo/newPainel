/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import React from 'react';
import { Formik, isObject } from 'formik';

import { Container, Main, Content, ContentAdress } from './styles';
import NewAdress from '../../molecules/NewAdress';
import Map from '../../molecules/Map';

import { useBusiness } from '../../../pages/Business/Context';
import ActionForm from '../../molecules/ActionForm';

import Address from '../../molecules/Address';
import {
  handleCreateBusiness,
  closeNewAdress,
  calcFreight,
  saveNewAddress,
  initial,
} from './helpers';

import ValuesOrder from '../../organisms/ValuesOrder';

const Business: React.FC = () => {
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
                <h3>Rota de entrega:</h3>
                <ContentAdress>
                  {values.deliveries.map((item, index) => (
                    <Address index={index} item={item} values={values} />
                  ))}
                </ContentAdress>
                {/* {values.addAdress || values.editing ? ( */}

                <ActionForm values={values} />
              </Content>
            </form>
            <Main>
              <Map setMap={setMap} values={values} />
              <NewAdress
                show={values.addAdress}
                submit={deliveries =>
                  saveNewAddress(setFieldValue, deliveries, values, map)
                }
                closeNewAdress={() => closeNewAdress(setFieldValue)}
                newValues={values}
                newSetFieldValue={setFieldValue}
              />
              {/* <ValuesOrder
                values={values}
                handleCreateBusiness={() =>
                  handleCreateBusiness(
                    createBusiness,
                    setFieldValue,
                    values,
                    map,
                  )
                }
              /> */}
            </Main>
          </Container>
        );
      }}
    </Formik>
  );
};

export default Business;
