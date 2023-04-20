import useStrings from '../../../strings';
import useProviders from '../../providers';

import { AppDispatch } from '../../../config/redux';

const useLoginActions = () => {
  // Providers
  const { useAuthProviders } = useProviders();
  const { loginProvider, registerProvider, logoutProvider, editProfileProvider } =
    useAuthProviders();

  // Types
  const { useAuthTypes } = useStrings();
  const { LOGIN, LOG_OUT, EDIT_PROFILE } = useAuthTypes();

  const actLogin =
    (
      data: { email: string; password: string },
      onSuccess: Function = () => {},
      onError: Function = () => {},
    ) =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await loginProvider(data);
        if (response.status !== 200) throw response;
        dispatch({ type: LOGIN, payload: response.data });
        onSuccess && onSuccess(response);
      } catch (e) {
        onError && onError(e);
      }
    };

  const actRegister =
    (
      data: { email: string; password: string; name: string },
      onSuccess: Function = () => {},
      onError: Function = () => {},
    ) =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await registerProvider(data);
        if (response.status !== 201) throw response;
        dispatch({ type: LOGIN, payload: response.data });
        onSuccess && onSuccess(response.data);
      } catch (e) {
        onError && onError(e);
      }
    };

  const actLogout =
    (onSuccess: Function = () => {}, onError: Function = () => {}) =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await logoutProvider();
        if (response.status !== 200) throw response;
        onSuccess && onSuccess(response.data.message);
        dispatch({
          type: LOG_OUT,
        });
      } catch (e) {
        onError && onError(e);
      }
    };

  const actEditProfile =
    (
      data: { name: string; email: string },
      onSuccess: Function = () => {},
      onError: Function = () => {},
    ) =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await editProfileProvider(data);
        if (response.status !== 200) throw response;
        onSuccess && onSuccess(response.data);
        dispatch({
          type: EDIT_PROFILE,
          payload: response.data,
        });
      } catch (e) {
        onError && onError(e);
      }
    };

  return {
    actLogin,
    actLogout,
    actRegister,
    actEditProfile,
  };
};

export default useLoginActions;
