//Packages
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const usePaymentProviders = () => {
  const listPaymentProvider = () => {
    const request = axios({
      method: 'GET',
      url: `payments`,
    });

    return trackPromise(request);
  };

  const createPaymentProvider = (data: any) => {
    const request = axios({
      method: 'POST',
      url: `payments`,
      data,
    });

    return trackPromise(request);
  };

  const updatePaymentProvider = (id: number, data: any) => {
    const request = axios({
      method: 'PUT',
      url: `payments/${id}`,
      data,
    });

    return trackPromise(request);
  };

  const hiddenPaymentProvider = (id: number) => {
    const request = axios({
      method: 'DELETE',
      url: `payments/${id}`,
    });

    return trackPromise(request);
  };

  const detailPaymentProvider = (id: number) => {
    const request = axios({
      method: 'GET',
      url: `payments/${id}`,
    });

    return trackPromise(request);
  };

  return {
    listPaymentProvider,
    createPaymentProvider,
    updatePaymentProvider,
    hiddenPaymentProvider,
    detailPaymentProvider,
  };
};

export default usePaymentProviders;
