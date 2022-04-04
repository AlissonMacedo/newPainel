/* eslint-disable prettier/prettier */


interface dataDirections {
  deliveries: dataWaypoints[];
  deliveryRetorn: boolean;
  travelMode: string;
  optimizeWaypoints: boolean;
}

interface dataWaypoints {
  latitude: number;
  longitude: number;
}

export default class Directions {
  static directionsServiceOptions(values: dataDirections) {

    const waypoints = values.deliveries.map(item => ({
      location: { lat: item.latitude, lng: item.longitude },
      stopover: true,
    }))

    // if return add address of origin for destiny
    if (values.deliveryRetorn) return waypoints.push(waypoints[0])

    // remove first and last waytpoint
    const origin = waypoints.shift()?.location;
    const destination = waypoints.pop()?.location;

    // type of vehicle for delivery
    const { travelMode, optimizeWaypoints } = values

    return {
      origin,
      waypoints,
      destination,
      travelMode,
      optimizeWaypoints
    };
  }

  // static async getDirectionsWithReturn() {
  //   try {
  //     const res = await fetch(
  //       `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${key}`,
  //     );
  //     const data = await res.json();
  //     return data;
  //   } catch (err) {
  //     return false;
  //   }
  // }
}
