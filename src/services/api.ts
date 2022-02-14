import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backofficeapi.alfreddelivery.com/',
});

export default api;
