/* eslint-disable no-undef */
import React, { createContext, useContext } from 'react';
import { GetFreightObj, returnFreightObj } from '../../helpers/types/business';
import Business from '../../services/Business';
import Directions from '../../services/Directions';
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

interface returnCreateBusiness {
  isError: boolean;
}
interface BusinessContextData {
  createBusiness(setFieldValue: any, values: any, map: any): void;
  calcFreight: (map: any, setFieldValue: any, value: any) => void;
  loadFreight: boolean;
  loadCreateBusiness: boolean;
  modalOrderSuccess: boolean;
  modalValuesOrder: boolean;
  setModalOrderSuccess: (value: boolean) => void;
}
// value: objectBusiness
const BusinessContext = createContext<BusinessContextData>(
  {} as BusinessContextData,
);

const BusinessProvider: React.FC = ({ children }) => {
  const { token, providerId, providerAlias, city, state } = useAuth();
  const [modalOrderSuccess, setModalOrderSuccess] = React.useState(false);
  const { addToast } = useToast();

  const [loadFreight, setLoadFreight] = React.useState(false);
  const [loadCreateBusiness, setLoadCreateBusiness] = React.useState(false);

  // controla o modal de valores de frete
  const [modalValuesOrder, setModalValuesOrder] = React.useState(false);

  async function createBusiness(setFieldValue: any, values: any, map: any) {
    setLoadCreateBusiness(true);

    const obj = {
      providerId,
      providerAlias,
      distance: values.dataToDelivery.distanceTotal,
      duration: values.dataToDelivery.timeDelivery,
      deliveryTax: values.dataToDelivery.totaToPay,
      city,
      state,
      deliveries: values.deliveries,
      vehicle: 0,
    };

    try {
      await Business.postBusiness({ token, obj });
      addToast(successBusiness());
      setModalOrderSuccess(true);

      setFieldValue('route', null);
      setFieldValue('calculed', false);
      setFieldValue('deliveries', [values.deliveries[0]]);

      setFieldValue('dataToDelivery.distanceTotal', 0);
      setFieldValue('dataToDelivery.timeDelivery', 0);
      setFieldValue('dataToDelivery.deliveriesTotal', 0);

      setModalValuesOrder(false);

      map?.panTo({
        lat: values.deliveries[0].latitude,
        lng: values.deliveries[0].longitude,
      });
      // map?.setZoom(14);
      map.panBy(-50, 0);
    } catch (err) {
      addToast(errorBusiness());
    } finally {
      setLoadCreateBusiness(false);
    }
  }

  async function calcFreight(map: any, setFieldValue: any, values: any) {
    // controle load
    setLoadFreight(true);
    setModalValuesOrder(true);
    // calcula a rota
    const route = await Directions.getDirectionsWithReturn(values);

    // se tiver rota
    if (route !== null && route.routes) {
      let deliveries = [];

      // verifica se tem mais de um ponto de entrega e
      // verifica se o usuário quer que otimize
      // otimiza a rota
      if (values.deliveries.length > 2 && values.optimizeWaypoints) {
        const newArr = route.routes[0].waypoint_order.map(
          (item: any) => values.deliveries[item + 1],
        );
        deliveries = [values.deliveries[0], ...newArr];

        if (values.deliveryRetorn) {
          deliveries.push(values.deliveries[0]);
        }

        setFieldValue('deliveries', deliveries);
      }

      // seta a rota
      setFieldValue('route', route);

      // conta os pontos
      // valida se tem retorno
      let leng = 0;
      let dur = 0;
      if (
        typeof route.routes[0] === 'object' &&
        typeof route.routes[0].legs === 'object'
      ) {
        // eslint-disable-next-line no-plusplus
        for (let rt = 0; rt < route.routes[0].legs.length; rt++) {
          leng += route.routes[0].legs[rt].distance?.value || 0;
          dur += route.routes[0].legs[rt].duration?.value || 0;
        }
      }

      setFieldValue('dataToDelivery.distanceTotal', (leng / 1000).toFixed(1));
      setFieldValue('dataToDelivery.timeDelivery', Math.round(dur / 60));
      setFieldValue(
        'dataToDelivery.deliveriesTotal',
        route.routes[0].legs.length,
      );

      let newObj: {
        qntPoints: number;
        kmDelivery: number | undefined;
        kmReturn: number | undefined;
      };

      if (
        values.deliveryRetorn &&
        typeof route.routes[0] === 'object' &&
        typeof route.routes[0].legs === 'object'
      ) {
        newObj = {
          qntPoints: route.routes[0].legs.length,
          kmDelivery:
            leng -
            (route.routes[0].legs[route.routes[0].legs.length - 1].distance
              ?.value || 0),
          kmReturn:
            route.routes[0].legs[route.routes[0].legs.length - 1].distance
              ?.value || 0,
        };
      } else {
        newObj = {
          qntPoints: route.routes[0].legs.length + 1,
          kmDelivery: leng,
          kmReturn: 0,
        };
      }

      const newFreight = {
        city: 'Mâncio Lima',
        cityId: 1200336,
        qntPoints: newObj.qntPoints,
        kmDelivery: newObj.kmDelivery ? newObj.kmDelivery : 0,
        kmReturn: newObj.kmReturn ? newObj.kmReturn : 0,
        vehicleType: values.vehicleType,
      };

      try {
        const { deliveryTax, returnTax } = await Business.getFreight(
          newFreight,
        );
        // map.panBy(-50, 200);
        // map.setZoom(14);
        gaCalcFreight();
        // addToast(successFreight(deliveryTax + returnTax));
        setFieldValue('dataToDelivery.totaToPay', deliveryTax + returnTax);
        setFieldValue('calculed', true);
      } catch (err) {
        gaCreateOrderError();
        setFieldValue('calculed', false);
      } finally {
        setLoadFreight(false);
      }
    }
  }

  return (
    <BusinessContext.Provider
      value={{
        createBusiness,
        calcFreight,
        loadFreight,
        loadCreateBusiness,
        modalOrderSuccess,
        modalValuesOrder,
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
