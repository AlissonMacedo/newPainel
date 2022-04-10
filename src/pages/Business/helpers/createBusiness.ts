interface returnCreateBusiness {
  isError: boolean;
}

export async function handleCreateBusiness(
  createBusiness: (value: any) => Promise<returnCreateBusiness>,
  setFieldValue: (field: string, value: any) => void,
  values: any,
  map: any,
): Promise<void | null> {
  const { isError } = await createBusiness(values);
  // if not error, clean route e deliveries and dataToDelivery
  if (!isError) {
    setFieldValue('route', null);
    setFieldValue('calculed', false);
    setFieldValue('deliveries', [values.deliveries[0]]);
    map?.panTo({
      lat: values.deliveries[0].latitude,
      lng: values.deliveries[0].longitude,
    });
    return map?.setZoom(14);
  }
  return null;
}
