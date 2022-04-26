/* eslint-disable no-undef */
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


type getDirectionsData = {
  origin: google.maps.LatLng;
  destination: google.maps.LatLng;
  waypoints: google.maps.DirectionsWaypoint[];
  travelMode: google.maps.TravelMode;
  optimizeWaypoints: boolean;
}

export default class Directions {

  static directionsServiceOptions(values: dataDirections) {
    const waypoints = values.deliveries.map(item => ({
      location: { lat: item.latitude, lng: item.longitude },
      stopover: true,
    }))



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

  static async getDirectionsWithReturn(values: any) {
    const directionsService = new google.maps.DirectionsService();

    const waypoints = values.deliveries.map((item: dataWaypoints) => ({
      location: { lat: item.latitude, lng: item.longitude },
      stopover: true,
    }))

    // remove first and last waytpoint
    const origin = waypoints.shift()?.location;
    const destination = waypoints.pop()?.location;

    // type of vehicle for delivery
    const { travelMode, optimizeWaypoints } = values

    const teste: getDirectionsData = {
      origin,
      waypoints,
      destination,
      travelMode,
      optimizeWaypoints
    };

    const response = await directionsService.route(teste);

    return response;
  };
}
