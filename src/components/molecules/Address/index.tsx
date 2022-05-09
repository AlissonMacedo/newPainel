import React from 'react';
import { useFormikContext } from 'formik';
import { AiFillCloseCircle } from 'react-icons/ai';

import { Container } from './styles';

type AddressData = {
  index: number;
  item: {
    number: string;
    state: string;
    city: string;
    street: string;
  };
};

const Address = React.forwardRef<any, AddressData>((props, ref) => {
  const formik: any = useFormikContext();

  const editDelivery = (newIndex: any) => {
    formik.setFieldValue('editing', true);
    formik.setFieldValue('delivery', props.item);
  };

  return (
    <Container ref={ref}>
      <div className="destiny">
        <div className="title">
          <h4>{`Destino ${props.index + 1}`}</h4>
          <button type="button">
            <AiFillCloseCircle color="#777" size={18} />
          </button>
        </div>
      </div>
      <div>
        <h4>{`${props.item.street}, ${props.item.number}`}</h4>
        <span>{`${props.item.city}, ${props.item.state} - Brasil`}</span>
        <button type="button" onClick={() => editDelivery(props.item)}>
          <strong>Editar</strong>
        </button>
      </div>
    </Container>
  );
});

export default Address;
