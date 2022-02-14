import { ResponseDataLogin, returnTranslateProvider } from '../types/provider';

export const translateDataProvider = (data: ResponseDataLogin) => {
  console.log('objResponseData', data);
  const newObj: returnTranslateProvider = {
    banks: data.data.data.banks,
    token: data.data.data.token,
  };
  return newObj;
};
