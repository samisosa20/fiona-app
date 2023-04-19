//Packages
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const useBudgetProviders = () => {
  const listBudgetProvider = () => {
    const request = axios({
      method: 'GET',
      url: `budgets`,
    });

    return trackPromise(request);
  };

  const createBudgetProvider = (data: any) => {
    const request = axios({
      method: 'POST',
      url: `budgets`,
      data,
    });

    return trackPromise(request);
  };

  const updateBudgetProvider = (id: number, data: any) => {
    const request = axios({
      method: 'PUT',
      url: `budgets/${id}`,
      data,
    });

    return trackPromise(request);
  };

  const hiddenBudgetProvider = (id: number) => {
    const request = axios({
      method: 'DELETE',
      url: `budgets/${id}`,
    });

    return trackPromise(request);
  };

  const detailBudgetProvider = (id: number) => {
    const request = axios({
      method: 'GET',
      url: `budgets/${id}`,
    });

    return trackPromise(request);
  };

  return {
    listBudgetProvider,
    createBudgetProvider,
    updateBudgetProvider,
    hiddenBudgetProvider,
    detailBudgetProvider,
  };
};

export default useBudgetProviders;
