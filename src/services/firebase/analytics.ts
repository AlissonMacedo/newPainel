import firebase from '.';

firebase.analytics();

const analyticsEvent = (event: any, params?: any) => {
  return firebase.analytics().logEvent(event, params);
};

export { analyticsEvent };
