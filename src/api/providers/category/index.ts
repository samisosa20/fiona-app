//Packages
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const useCategoryProviders = () => {
  const listCategoryProvider = () => {
    const request = axios({
      method: 'GET',
      url: `categories`,
    });

    return trackPromise(request);
  };

  const createCategoryProvider = (data: any) => {
    const request = axios({
      method: 'POST',
      url: `categories`,
      data,
    });

    return trackPromise(request);
  };

  const updateCategoryProvider = (id: number, data: any) => {
    const request = axios({
      method: 'PUT',
      url: `categories/${id}`,
      data,
    });

    return trackPromise(request);
  };

  const hiddenCategoryProvider = (id: number) => {
    const request = axios({
      method: 'DELETE',
      url: `categories/${id}`,
    });

    return trackPromise(request);
  };

  const detailCategoryProvider = (id: number) => {
    const request = axios({
      method: 'GET',
      url: `categories/${id}`,
    });

    return trackPromise(request);
  };

  const activateCategoryProvider = (id: number) => {
    const request = axios({
      method: 'POST',
      url: `categories/${id}/restore`,
    });

    return trackPromise(request);
  };

  return {
    listCategoryProvider,
    createCategoryProvider,
    updateCategoryProvider,
    hiddenCategoryProvider,
    detailCategoryProvider,
    activateCategoryProvider,
  };
};

export default useCategoryProviders;
