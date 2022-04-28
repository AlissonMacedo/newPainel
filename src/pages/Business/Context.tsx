/* eslint-disable no-undef */
import React, { createContext, useContext } from 'react';
import {
  GetFreightObj,
  objectBusiness,
  returnFreightObj,
} from '../../helpers/types/business';
import Business from '../../services/Business';

import {
  gaCalcFreight,
  gaCreateOrderError,
} from '../../services/firebase/events';
import { useToast } from '../../hooks/toast';
import {
  errorFreight,
  successFreight,
  successBusiness,
  errorBusiness,
} from '../../helpers/objsToasts';
import { useAuth } from '../../hooks/auth';
import Directions from '../../services/Directions';

interface returnCreateBusiness {
  isError: boolean;
}
interface BusinessContextData {
  loadFreight(value: GetFreightObj): Promise<returnFreightObj>;
  createBusiness(values: any): Promise<returnCreateBusiness>;
  load: boolean;
  loadCreateBusiness: boolean;
  modalOrderSuccess: boolean;
  setModalOrderSuccess: (value: boolean) => void;
}
// value: objectBusiness
const BusinessContext = createContext<BusinessContextData>(
  {} as BusinessContextData,
);

const BusinessProvider: React.FC = ({ children }) => {
  const { token, providerId, providerAlias, city, state } = useAuth();
  const [load, setLoad] = React.useState(false);
  const [loadCreateBusiness, setLoadCreateBusiness] = React.useState(false);
  const [modalOrderSuccess, setModalOrderSuccess] = React.useState(true);
  const { addToast } = useToast();

  async function loadFreight(value: GetFreightObj) {
    setLoad(true);
    let newReturn = {};
    const isError = false;

    try {
      const { deliveryTax, returnTax } = await Business.getFreight(value);
      newReturn = { deliveryTax, returnTax };
      gaCalcFreight();
      addToast(successFreight(deliveryTax + returnTax));
    } catch (err) {
      addToast(errorFreight);
      gaCreateOrderError();
    } finally {
      setLoad(false);
    }
    return { isError, newReturn };
  }

  async function createBusiness(values: any) {
    setLoadCreateBusiness(true);

    let deliveries = [];

    // verifica se tem mais de um ponto de entrega e
    // verifica se o usuário quer que otimize
    if (values.deliveries.length > 1 && values.optimizeWaypoints) {
      const newArr = values.route.routes[0].waypoint_order.map(
        (item: any) => values.deliveries[item + 1],
      );
      deliveries = [...newArr];

      // adiciona o endereco do startDelivery como retorno
      if (values.deliveryRetorn === false) {
        deliveries = [
          ...newArr,
          values.deliveries[values.deliveries.length - 1],
        ];
      }
    } else {
      deliveries = values.deliveries;
    }

    deliveries = [values.deliveries[0], ...deliveries];

    if (values.deliveryRetorn) {
      deliveries.push(values.deliveries[0]);
    }

    const obj = {
      providerId,
      providerAlias,
      distance: values.dataToDelivery.distanceTotal,
      duration: values.dataToDelivery.timeDelivery,
      deliveryTax: values.dataToDelivery.totaToPay,
      city,
      state,
      deliveries,
      vehicle: 0,
    };
    // state esta numero precisa ser o nome escrito

    // TODO falta adicionar o retorno no deliveries e fazer a otimização da
    // rota no objecto de criacao do pedido.
    let isError = false;
    try {
      const data = { token, obj };
      await Business.postBusiness(data);
      addToast(successBusiness());
      setModalOrderSuccess(true);
    } catch (err) {
      isError = true;
      addToast(errorBusiness());
    } finally {
      setLoadCreateBusiness(false);
    }
    return { isError };
  }

  return (
    <BusinessContext.Provider
      value={{
        createBusiness,
        loadFreight,
        load,
        loadCreateBusiness,
        modalOrderSuccess,
        setModalOrderSuccess,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

function useBusiness(): BusinessContextData {
  const context = useContext(BusinessContext);

  return context;
}

export { BusinessProvider, useBusiness };
