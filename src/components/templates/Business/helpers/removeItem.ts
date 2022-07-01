import { deliveriesType } from '../../../../helpers/types/business';

export const removeItem = (
  itemId: number,
  deliveries: deliveriesType,
  formik: any,
) => {
  const newList = deliveries.filter(item => item.id !== itemId);
  formik.setFieldValue('deliveries', newList);
  formik.setFieldValue('calculed', false);
};
