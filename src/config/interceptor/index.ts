import { useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import * as RNLocalize from 'react-native-localize';
import Config from 'react-native-config';

import { AppDispatch } from '../redux';

interface storeRedux {
  getState: any;
  dispatch: AppDispatch;
}

const useInterceptor = (store: storeRedux) => {
  //localize
  const localize = RNLocalize.getTimeZone();

  const handleRequestSuccess = async (request: any) => {
    const { getState } = store;
    const { auth_token } = getState();
    if (auth_token) request.headers.authorization = `Bearer ${auth_token}`;
    request.headers['Time-zone'] = localize;
    request.headers['Content-Type'] = 'application/json';
    request.headers['accept'] = 'application/json';
    return await request;
  };

  const handleRequestError = async (error: AxiosError) => {
    //console.log('request error')
    return error;
  };

  const handleResponseSuccess = (response: AxiosResponse) => {
    return response;
  };

  const handleResponseError = async (error: any) => {
    //console.log('response error', error.response)

    switch (error.response.status) {
      case 401:
        console.log('error 401', error.response.data.message);
        break;
      case 500:
        console.log('error 500', error.response.data.message);
        break;
      default:
        console.log('error 400', error.response.data.message);
    }
    return error;
  };

  useEffect(() => {
    console.log(`${Config.API_URL}`)
    axios.defaults.baseURL = `${Config.API_URL}`;
    axios.defaults.params = {};
    axios.interceptors.request.use(handleRequestSuccess, handleRequestError);
    axios.interceptors.response.use(handleResponseSuccess, handleResponseError);
  }, []);
};

export default useInterceptor;