import api from '../services/api';

import { GetFreightObj } from '../helpers/types/business';

interface ReturnGetFreightObj {
  deliveryTax: number;
  bonusAmount: number;
}

export default class Business {
  static async getFreight(obj: GetFreightObj): Promise<ReturnGetFreightObj> {
    const {
      data: {
        data: { deliveryTax, bonusAmount },
      },
    } = await api.post('/freight/order', obj);

    return { deliveryTax, bonusAmount };
  }

  static async postBusiness(obj: GetFreightObj): Promise<GetFreightObj> {
    return obj;
  }
}
