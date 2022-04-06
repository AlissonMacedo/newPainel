import axios from 'axios';
import api from './api';
import { GetFreightObj, objectBusiness } from '../helpers/types/business';

interface ReturnGetFreightObj {
  deliveryTax: number;
  returnTax: number;
}

interface returnCreateBusiness {
  data: {
    status: boolean;
    message: string;
    data: {
      orderId: number;
    };
  };
  message: string;
  type: string;
}

interface postBusinessData {
  token: string | undefined;
  obj: objectBusiness;
}

export default class Business {
  static async getFreight(obj: GetFreightObj): Promise<ReturnGetFreightObj> {
    const {
      data: {
        data: { deliveryTax, returnTax },
      },
    } = await api.post('/freight/order', obj);

    return { deliveryTax, returnTax };
  }

  static async postBusiness({
    token,
    obj,
  }: postBusinessData): Promise<returnCreateBusiness> {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    const response: returnCreateBusiness = await axios.post(
      'https://alfredapi.alfreddelivery.com/api/v1/orders/business',
      obj,
    );
    return response;
  }
}
