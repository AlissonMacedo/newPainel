/* eslint-disable prettier/prettier */
import React, { useRef } from 'react';
import { Formik, FormikProps, useFormikContext } from 'formik';

import { object } from 'yup/lib/locale';
import { FaMotorcycle, FaShuttleVan, FaTruck } from 'react-icons/fa';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import { MdOutlineDeliveryDining, MdSchedule } from 'react-icons/md';
import { AutoComplete } from '../AutoComplete';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';


import { Container } from './styles';
import { useBusiness } from '../../../pages/Business/Context';

type newOrderData = {
  setFieldValue: (field: string, value: any) => void;
  setShowModalOrder: (value: boolean) => void;
  show: boolean;
  values: any;
  map: any;
};

const ConfigOrder: React.FC<newOrderData> = ({
  setFieldValue, setShowModalOrder,
  values,
  map,
  show }, ...props) => {
  const formik: any = useFormikContext();
  const { calcFreight } = useBusiness();


  const [itemSelected, setItemSelected] = React.useState(1);
  const [itemSelected2, setItemSelected2] = React.useState(1);
  return (
    <Container show={show}>
      <div className="titleClose">
        <span style={{ color: '#333' }} >Tipo de veiculo</span>
        <button type="button" onClick={() => setShowModalOrder(!show)}>
          <AiFillCloseCircle size={18} color="#777" />
        </button>
      </div>
      <div className="selectVehicleDelivery">
        <button type="button" className={`${itemSelected === 1 ? 'vehicleDelivery active' : 'vehicleDelivery'}`}
          onClick={() => setItemSelected(1)}  >
          <div>
            <FaMotorcycle size={18} color='#777' />
            <AiFillCheckCircle size={18} color={`${itemSelected === 1 ? '#00dedb' : '#bba6a6'}`} />

          </div>
          <span>Motocicleta</span>
        </button>
        <button type="button" className={`${itemSelected === 2 ? 'vehicleDelivery active' : 'vehicleDelivery'}`}
          onClick={() => setItemSelected(2)}>
          <div>
            <FaShuttleVan size={18} color='#777' />
            <AiFillCheckCircle size={18} color={`${itemSelected === 2 ? '#00dedb' : '#eee'}`} />
          </div>
          <span>Van</span>
        </button>
        <button type="button" className={`${itemSelected === 3 ? 'vehicleDelivery active' : 'vehicleDelivery'}`}
          onClick={() => setItemSelected(3)}  >
          <div>
            <FaTruck size={18} color='#777' />
            <AiFillCheckCircle size={18} color={`${itemSelected === 3 ? '#00dedb' : '#eee'}`} />
          </div>
          <span>Caminhão</span>
        </button>
      </div>
      <div style={{ marginTop: 20 }}>
        <span style={{ color: '#333', }} >Tipo de entrega</span>
        <div className="deliveryTypes">
          <button type="button" className={`${itemSelected2 === 1 ? 'deliveryType active' : 'deliveryType'}`}
            onClick={() => setItemSelected2(1)}  >
            <div className="deliveryBody">
              <MdOutlineDeliveryDining color="#444" size={23} />
              <div className="deliveryTexts">
                <span className="deliveryTitle">Entrega Normal</span>
                <span className="deliveryDescription">A entrega normal é realizada no mesmo dia da solicitação</span>
              </div>
              {/* <span className="price">
                R$ 0,00
              </span> */}
              <AiFillCheckCircle size={18} color={`${itemSelected2 === 1 ? '#00dedb' : '#eee'}`} />
            </div>
          </button>

          <button type="button" className={`${itemSelected2 === 2 ? 'deliveryType active' : 'deliveryType'}`} onClick={() => setItemSelected2(2)}  >
            <div className="deliveryBody">
              <MdSchedule color="#444" size={23} />
              <div className="deliveryTexts">
                <span className="deliveryTitle">Entrega Expressa</span>
                <span className="deliveryDescription">A entrega expressa é realizada em até 1 hora após a solicitação</span>
              </div>
              {/* <span className="price">
                R$ 0,00
              </span> */}
              <AiFillCheckCircle size={18} color={`${itemSelected2 === 2 ? '#00dedb' : '#eee'}`} />
            </div>
          </button>
        </div>
        <Button onClick={() => {
          calcFreight(map, setFieldValue, values)
          setShowModalOrder(false);
        }}>Confirmar</Button>
      </div>
    </Container >
  );
};

export default ConfigOrder;
