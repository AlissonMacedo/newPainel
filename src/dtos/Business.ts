import api from '../services/api';

import { GetFreightObj } from '../helpers/types/business';

interface ReturnGetFreightObj {
  deliveryTax: number;
  returnTax: number;
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

  static async postBusiness(obj: GetFreightObj): Promise<GetFreightObj> {
    return obj;
  }
}
