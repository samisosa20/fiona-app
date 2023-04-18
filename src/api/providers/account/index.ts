//Packages
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const useAccountProviders = () => {
  const listAccountProvider = () => {
    const request = axios({
      method: 'GET',
      url: `accounts`,
    });

    return trackPromise(request);
  };

  const createAccountProvider = (data: any) => {
    const request = axios({
      method: 'POST',
      url: `accounts`,
      data,
    });

    return trackPromise(request);
  };

  const updateAccountProvider = (id: number, data: any) => {
    const request = axios({
      method: 'PUT',
      url: `accounts/${id}`,
      data,
    });

    return trackPromise(request);
  };

  const hiddenAccountProvider = (id: number, data: any) => {
    const request = axios({
      method: 'DELETE',
      url: `accounts/${id}`,
      data,
    });

    return trackPromise(request);
  };

  const detailAccountProvider = (id: number) => {
    const request = axios({
      method: 'GET',
      url: `accounts/${id}`,
    });

    return trackPromise(request);
  };

  const movementByAccountProvider = (id: number) => {
    const request = axios({
      method: 'GET',
      url: `accounts/${id}/movements`,
    });

    return trackPromise(request);
  };

  return {
    listAccountProvider,
    createAccountProvider,
    updateAccountProvider,
    hiddenAccountProvider,
    detailAccountProvider,
    movementByAccountProvider,
  };
};

export default useAccountProviders;
