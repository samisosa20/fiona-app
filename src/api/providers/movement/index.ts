//Packages
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const useMovementProviders = () => {
  const listMovementProvider = () => {
    const request = axios({
      method: 'GET',
      url: `movements`,
    });

    return trackPromise(request);
  };

  const createMovementProvider = (data: any) => {
    const request = axios({
      method: 'POST',
      url: `movements`,
      data,
    });

    return trackPromise(request);
  };

  const updateMovementProvider = (id: number, data: any) => {
    const request = axios({
      method: 'PUT',
      url: `movements/${id}`,
      data,
    });

    return trackPromise(request);
  };

  const deleteMovementProvider = (id: number) => {
    const request = axios({
      method: 'DELETE',
      url: `movements/${id}`,
    });

    return trackPromise(request);
  };

  const detailMovementProvider = (id: number) => {
    const request = axios({
      method: 'GET',
      url: `movements/${id}`,
    });

    return trackPromise(request);
  };

  return {
    listMovementProvider,
    createMovementProvider,
    updateMovementProvider,
    deleteMovementProvider,
    detailMovementProvider,
  };
};

export default useMovementProviders;
