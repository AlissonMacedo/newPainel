import React from 'react';
import { useFormikContext } from 'formik';
import { AiFillCloseCircle } from 'react-icons/ai';

import { Container, TooltipMessage } from './styles';

type AddressData = {
  index: number;
  item: {
    id: number;
    number: string;
    state: string;
    city: string;
    street: string;
  };
  removeItem: (item: number) => void;
};

const Address = React.forwardRef<any, AddressData>((props, ref) => {
  const formik: any = useFormikContext();

  const editDelivery = (newIndex: any) => {
    formik.setFieldValue('editing', true);
    formik.setFieldValue('delivery', props.item);
  };

  const renderButtonRemove = (conditional: boolean) => {
    if (conditional) {
      return (
        <TooltipMessage title="Excluir">
          <button type="button" onClick={() => props.removeItem(props.item.id)}>
            <AiFillCloseCircle color="#777" size={18} />
          </button>
        </TooltipMessage>
      );
    }
    return null;
  };

  return (
    <Container ref={ref}>
      <div className="destiny">
        <div className="title">
          <h4>{`Destino ${props.index + 1}`}</h4>
          {renderButtonRemove(props.index > 0)}
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
