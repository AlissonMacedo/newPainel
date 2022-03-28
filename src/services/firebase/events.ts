import firebase from '.';
import { analyticsEvent } from './analytics';
import { GetFreightObj } from '../../helpers/types/business';

// Login/Logoff
export const setUserAnalytics = (user: string) => {
  firebase.analytics().setUserId(user);
};

// Business
export const gaCalcFreight = () => {
  return analyticsEvent('click_calc_freight');
};

export const gaCreatedNewOrder = ({
  city,
  providerId,
  cityId,
  qntPoints,
  kmDelivery,
  kmReturn,
  serviceType,
  vehicleType,
}: GetFreightObj) => {
  return analyticsEvent('RealizouPedido', {
    city,
    providerId,
    cityId,
    qntPoints,
    kmDelivery,
    kmReturn,
    serviceType,
    vehicleType,
  });
};

export const gaCreateOrderError = () => {
  return analyticsEvent('error_create_order');
};

export const gaNotBalanceError = () => {
  return analyticsEvent('error_not_balance');
};

// Entrou na pagina

// Calculou frete

// Criou um pedido

// Erros
// Falta de saldo
// Pedido não realizado
