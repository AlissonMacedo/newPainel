/* eslint-disable prettier/prettier */
import React, { useRef } from 'react';
import { Formik, FormikProps } from 'formik';

import { object } from 'yup/lib/locale';
import { FaMotorcycle, FaShuttleVan, FaTruck } from 'react-icons/fa';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { AutoComplete } from '../AutoComplete';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';


import { Container } from './styles';

type newOrderData = {
  setFieldValue: (field: string, value: any) => void;
  setShowModalOrder: (value: boolean) => void;
  show: boolean;
};

const ConfigOrder: React.FC<newOrderData> = ({
  setFieldValue, setShowModalOrder,
  show }) => {
  return (
    <Container show={show}>
      <div className="titleClose">
        <span style={{ color: '#333' }} >Tipo de veiculo</span>
        <button type="button" onClick={() => setShowModalOrder(!show)}>
          <AiFillCloseCircle size={18} color="#777" />
        </button>
      </div>
      <div className="selectVehicleDelivery">
        <div className="vehicleDelivery">
          <div>
            <FaMotorcycle size={18} color='#777' />
            <AiFillCheckCircle size={18} color="#7159c1" />
          </div>
          <span>Motocicleta</span>
        </div>
        <div className="vehicleDelivery">
          <div>
            <FaShuttleVan size={18} color='#777' />
            <AiFillCheckCircle size={18} color="#7159c1" />
          </div>
          <span>Van</span>
        </div>
        <div className="vehicleDelivery">
          <div>
            <FaTruck size={18} color='#777' />
            <AiFillCheckCircle size={18} color="#7159c1" />
          </div>
          <span>Caminhão</span>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <span style={{ color: '#333', }} >Tipo de entrega</span>
        <div className="deliveryTypes">
          <div className="deliveryType">
            <div className="deliveryBody">
              <MdOutlineDeliveryDining color="#444" size={23} />
              <div className="deliveryTexts">
                <span className="deliveryTitle">Entrega Normal</span>
                <span className="deliveryDescription">A entrega normal é realizada no mesmo dia da solicitação</span>
              </div>
              <span className="price">
                R$ 0,00
              </span>
              <AiFillCheckCircle size={18} color="#7159c1" />
            </div>
          </div>

          <div className="deliveryType">
            <div className="deliveryBody">
              <MdOutlineDeliveryDining color="#444" size={23} />
              <div className="deliveryTexts">
                <span className="deliveryTitle">Entrega Expressa</span>
                <span className="deliveryDescription">A entrega expressa é realizada em até 1 hora após a solicitação</span>
              </div>
              <span className="price">
                R$ 0,00
              </span>
              <AiFillCheckCircle size={18} color="#7159c1" />
            </div>
          </div>
        </div>
        <Button>Confirmar</Button>
      </div>
    </Container>
  );
};

export default ConfigOrder;
