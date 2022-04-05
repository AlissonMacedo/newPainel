/* eslint-disable prettier/prettier */
function toRad(Value: number): number {
  /** Converts numeric degrees to radians */
  return (Value * Math.PI) / 180;
}

async function getDistance(
  lon1: number,
  lat1: number,
  lon2: number,
  lat2: number,
) {
  const R = 6371; // Radius of the earth in km
  const dLat = toRad(lat2 - lat1); // Javascript functions in radians
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

export default getDistance;
