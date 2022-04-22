/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import React from 'react';
import { BusinessProvider } from './Context';
import BusinessTemplate from '../../components/templates/Business';

const Business = () => {
  return (
    <BusinessProvider>
      <BusinessTemplate />
    </BusinessProvider>
  );
};

export default Business;
