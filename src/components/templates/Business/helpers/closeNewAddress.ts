export function closeNewAddress(
  setFieldValue: (field: string, value: any) => void,
) {
  setFieldValue('addAdress', false);
  setFieldValue('calculed', false);
  setFieldValue('route', null);
}
