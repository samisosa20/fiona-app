//Packages
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const useHeritageProviders = () => {
  const listHeritageProvider = () => {
    const request = axios({
      method: 'GET',
      url: `heritages`,
    });

    return trackPromise(request);
  };

  const createHeritageProvider = (data: any) => {
    const request = axios({
      method: 'POST',
      url: `heritages`,
      data,
    });

    return trackPromise(request);
  };

  const updateHeritageProvider = (id: number, data: any) => {
    const request = axios({
      method: 'PUT',
      url: `heritages/${id}`,
      data,
    });

    return trackPromise(request);
  };

  const hiddenHeritageProvider = (id: number) => {
    const request = axios({
      method: 'DELETE',
      url: `heritages/${id}`,
    });

    return trackPromise(request);
  };

  const detailHeritageProvider = (id: number) => {
    const request = axios({
      method: 'GET',
      url: `heritages/${id}`,
    });

    return trackPromise(request);
  };

  return {
    listHeritageProvider,
    createHeritageProvider,
    updateHeritageProvider,
    hiddenHeritageProvider,
    detailHeritageProvider,
  };
};

export default useHeritageProviders;
