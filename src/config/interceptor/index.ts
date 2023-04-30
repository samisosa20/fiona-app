import { useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {API_URL} from "@env"
import Toast from 'react-native-toast-message';

import { AppDispatch } from '../redux';

import useStrings from '../../strings';

interface storeRedux {
  getState: any;
  dispatch: AppDispatch;
}

const useInterceptor = (store: storeRedux) => {

  const handleRequestSuccess = async (request: any) => {
    const { getState } = store;
    const { auth } = getState();
    const { auth_token } = auth;

    if (auth_token) request.headers.authorization = `Bearer ${auth_token}`;
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
    const { dispatch } = store;
    const { useAuthTypes } = useStrings();
    const { LOG_OUT } = useAuthTypes();
    switch (error.response.status) {
      case 401:
        await dispatch({ type: LOG_OUT });
        console.log('error 401', error.response.data.message);
        break;
      case 500:
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
          text2: error.response.data.detail,
        });
        console.log('error 500', error.response.data.message);
        break;
      default:
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
          text2: error.response.data.detail,
        });
        console.log('error 400', error.response.data.message);
    }
    return error;
  };

  useEffect(() => {
    axios.defaults.baseURL = `${API_URL}`;
    axios.defaults.params = {};
    axios.interceptors.request.use(handleRequestSuccess, handleRequestError);
    axios.interceptors.response.use(handleResponseSuccess, handleResponseError);
  }, []);
};

export default useInterceptor;
