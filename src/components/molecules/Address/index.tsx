import React from 'react';
import { useFormikContext } from 'formik';
import { AiFillCloseCircle } from 'react-icons/ai';

import { Container, TooltipMessage, DivBar, LyricsAlfabet } from './styles';
import { incrementAlfabet } from '../../../helpers/utils';
import { removeItem } from '../../templates/Business/helpers';
import { deliveriesType } from '../../../helpers/types/business';

type AddressData = {
  index: number;
  item: {
    id: number;
    number: string;
    state: string;
    city: string;
    street: string;
  };
  deliveries: deliveriesType;
  deliveryReturn: boolean;
};

const Address = React.forwardRef<any, AddressData>((props, ref) => {
  const formik: any = useFormikContext();

  const editDelivery = (newIndex: any) => {
    formik.setFieldValue('editing', true);
    formik.setFieldValue('delivery', props.item);
  };

  const {
    item: { id },
    deliveries,
  } = props;

  const renderButtonRemove = (index: number) => {
    if (
      props.deliveryReturn &&
      props.index > 0 &&
      props.index < props.deliveries.length - 1
    ) {
      return (
        <TooltipMessage title="Excluir">
          <button
            type="button"
            onClick={() => removeItem(id, deliveries, formik)}
          >
            <AiFillCloseCircle color="#ddee" size={18} />
          </button>
        </TooltipMessage>
      );
    }
    if (props.index > 0 && !props.deliveryReturn) {
      return (
        <TooltipMessage title="Excluir">
          <button
            type="button"
            onClick={() => removeItem(id, deliveries, formik)}
          >
            <AiFillCloseCircle color="#ddee" size={18} />
          </button>
        </TooltipMessage>
      );
    }
    return null;
  };

  return (
    <Container ref={ref}>
      <div className="lyrics">
        <DivBar first={props.index >= 1} />
        <LyricsAlfabet>
          <span>{incrementAlfabet(props.index)}</span>
        </LyricsAlfabet>
        <DivBar last={props.index !== props.deliveries.length - 1} />
      </div>
      <div className="body-Address">
        <div className="destiny">
          <div className="title">
            <h4>{`Destino ${props.index + 1}`}</h4>
            {renderButtonRemove(props.index)}
          </div>
        </div>
        <div>
          <h4>{`${props.item.street}, ${props.item.number}`}</h4>
          <span>{`${props.item.city}, ${props.item.state} - Brasil`}</span>
          <button
            className="btn-edit"
            type="button"
            onClick={() => editDelivery(props.item)}
          >
            <strong>Editar</strong>
          </button>
        </div>
      </div>
    </Container>
  );
});

export default Address;
