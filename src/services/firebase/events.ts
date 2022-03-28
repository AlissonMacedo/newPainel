import firebase from '.';
import { analyticsEvent } from './analytics';
import { GetFreightObj } from '../../helpers/types/business';

export const setUserAnalytics = (user: string) => {
  firebase.analytics().setUserId(user);
};

// Business
export const gaCalcFreight = () => {
  return analyticsEvent('click_calc_freight');
};

export const gaCreatedNewOrder = (objCreateOrder: GetFreightObj) => {
  return analyticsEvent('RealizouPedido', objCreateOrder);
};

export const gaCreateOrderError = () => {
  return analyticsEvent('error_create_order');
};

export const gaNotBalanceError = () => {
  return analyticsEvent('error_not_balance');
};
