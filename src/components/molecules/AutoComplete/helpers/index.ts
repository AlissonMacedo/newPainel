/* eslint-disable no-undef */

export const handleSelectSuggest = (
  name: string,
  setFieldValue: (args: string, args2: any) => void,
  geoPrediction: google.maps.GeocoderResult,
  setState: React.Dispatch<
    React.SetStateAction<{
      search: string;
      value: string;
    }>
  >,
) => {
  const location = {
    lat: geoPrediction?.geometry?.location?.lat() || 0,
    lng: geoPrediction?.geometry?.location?.lng() || 0,
  };

  const { address_components: address, formatted_address: addressFormat } =
    geoPrediction;

  for (let adc = 0; adc < address.length; adc += 1) {
    if (address[adc].types.includes('route')) {
      setFieldValue(`${name}.street`, address[adc].long_name);
    }
    if (address[adc].types.includes('street_number')) {
      setFieldValue(`${name}.number`, Number(address[adc].long_name));
    }
    if (address[adc].types.includes('sublocality_level_1')) {
      setFieldValue(`${name}.neighborhood`, address[adc].long_name);
    }
    if (address[adc].types.includes('administrative_area_level_2')) {
      setFieldValue(`${name}.city`, address[adc].long_name);
    }
    if (address[adc].types.includes('administrative_area_level_1')) {
      setFieldValue(`${name}.state`, address[adc].long_name);
    }
    if (address[adc].types.includes('country')) {
      setFieldValue(`${name}.state`, address[adc].long_name);
    }
    if (address[adc].types.includes('postal_code')) {
      setFieldValue(`${name}.postal_code`, address[adc].long_name);
    }
    setFieldValue(`${name}.longitude`, location.lng); // lng
    setFieldValue(`${name}.latitude`, location.lat); // lat
    setFieldValue(`${name}.address`, addressFormat); // endereco completo
  }

  setState({
    search: '',
    value: addressFormat,
  });
};
