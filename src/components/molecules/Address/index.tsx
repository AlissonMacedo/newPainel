import React from 'react';
import { useFormikContext } from 'formik';
import { Container } from './styles';

interface addressData {
  index: number;
  item: {
    number: string;
    state: string;
    city: string;
    street: string;
  };
  values: any;
}

const Address = ({ index, item, values }: addressData) => {
  const formik: any = useFormikContext();

  const editDelivery = (newIndex: any) => {
    formik.setFieldValue('editing', true);
    formik.setFieldValue('delivery', item);
  };

  return (
    <Container>
      <div className="destiny">
        <h4>{`Destino ${index + 1}`}</h4>
      </div>
      <div>
        <h4>{`${item.street}, ${item.number}`}</h4>
        <span>{`${item.city}, ${item.state} - Brasil`}</span>
        <button type="button" onClick={() => editDelivery(item)}>
          <strong>Editar</strong>
        </button>
      </div>
    </Container>
  );
};

export default Address;
