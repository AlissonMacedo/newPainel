/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import React, { useState, forwardRef } from 'react';
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

const Business: React.FC = () => {
  const [map, setMap] = React.useState<google.maps.Map>();

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
        const removeItem = (itemId: number) => {
          const newList = values.deliveries.filter(item => item.id !== itemId);
          setFieldValue('deliveries', newList);
        };
        return (
          <Container>
            <form onSubmit={handleSubmit}>
              <Content>
                <h3>Rota de entrega:</h3>
                <ContentAddress className="scroll">
                  <FlipMove>
                    {values.deliveries.map((item, index) => (
                      <Address
                        key={item.id}
                        index={index}
                        item={item}
                        removeItem={removeItem}
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
            <Main>
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
