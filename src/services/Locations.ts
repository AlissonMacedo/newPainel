import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default class latLng {
  static async get(
    address: string,
    neighborhood: string,
    number: string,
    city: string,
    state: string,
  ) {
    try {
      let res = address.concat(`, ${number}`);
      res = res.concat(` - ${neighborhood}`);
      res = res.concat(`, ${city}`);
      res = res.concat(` - ${state}`);

      const results = await geocodeByAddress(res);

      if (results.length === 0) {
        return false;
      }

      const newLatLng = await getLatLng(results[0]);
      return newLatLng;
    } catch (err) {
      return false;
    }
  }
}
