/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Formik } from 'formik';
import FlipMove from 'react-flip-move';

import { Container, Main, Content, ContentAddress } from './styles';
import NewAddress from '../../molecules/NewAddress';
import Map from '../../molecules/Map';

import { useBusiness } from '../../../pages/Business/Context';
import ActionForm from '../../molecules/ActionForm';

import Address from '../../molecules/Address';
import ModalOrderSuccess from '../../organisms/ModalOrderSuccess';
import ValuesOrder from '../../organisms/ValuesOrder';

import { closeNewAddress, saveNewAddress, initial } from './helpers';
import ConfigOrder from '../../molecules/ConfigOrder';
import { useAuth } from '../../../hooks/auth';

const Business: React.FC = () => {
  const [map, setMap] = React.useState<google.maps.Map>();
  const { config } = useAuth();

  const { createBusiness, modalOrderSuccess, setModalOrderSuccess } =
    useBusiness();

  const newSubmit = React.useCallback(async data => {
    console.log('data', data);
  }, []);

  const [showModalOrder, setShowModalOrder] = useState(false);

  const ticketNotVisibleState = {
    transform: 'translateX(-100%)',
    opacity: 0.1,
  };

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
                <div className="div-box">
                  <h3>Rota de entrega:</h3>
                </div>
                <ContentAddress className="scroll">
                  <FlipMove>
                    {values.deliveries.map((item, index) => (
                      <Address
                        key={item.id}
                        index={index}
                        item={item}
                        deliveries={values.deliveries}
                        deliveryReturn={values.deliveryRetorn}
                      />
                    ))}
                  </FlipMove>
                </ContentAddress>
                <ActionForm
                  values={values}
                  setShowModalOrder={setShowModalOrder}
                />
              </Content>
            </form>
            <Main config={config.sideBar}>
              <Map setMap={setMap} values={values} />
              <ValuesOrder
                values={values}
                submitting={() => createBusiness(setFieldValue, values, map)}
              />
              <NewAddress
                show={values.addAdress || values.editing}
                submit={deliveries =>
                  saveNewAddress(setFieldValue, deliveries, values, map)
                }
                closeNewAddress={() => closeNewAddress(setFieldValue)}
                newValues={values}
                newSetFieldValue={setFieldValue}
              />
              <ModalOrderSuccess
                show={modalOrderSuccess}
                close={setModalOrderSuccess}
              />
              <ConfigOrder
                show={showModalOrder}
                setFieldValue={setFieldValue}
                setShowModalOrder={setShowModalOrder}
                map={map}
                values={values}
              />
            </Main>
          </Container>
        );
      }}
    </Formik>
  );
};

export default Business;
