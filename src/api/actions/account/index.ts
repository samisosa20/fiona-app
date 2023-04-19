// Provider
import useProviders from '../../providers';

const useAccountActions = () => {
  // Providers
  const { useAccountProviders } = useProviders();
  const {
    listAccountProvider,
    createAccountProvider,
    updateAccountProvider,
    hiddenAccountProvider,
    detailAccountProvider,
    movementByAccountProvider,
    activateAccountProvider,
  } = useAccountProviders();

  const actGetListAccount = async (
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await listAccountProvider();
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actGetDetailAccount = async (id: number,
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await detailAccountProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actGetMovementAccount = async (id: number,
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await movementByAccountProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };

  const actCreateAccount = async (data: any,
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await createAccountProvider(data);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actEditAccount = async (id: number, data: any,
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await updateAccountProvider(id, data);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };

  const actHiddenAccount = async (id: number,
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await hiddenAccountProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };

  const actRecoverAccount = async (id: number,
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await activateAccountProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };

  return {
    actGetListAccount,
    actGetDetailAccount,
    actGetMovementAccount,
    actCreateAccount,
    actEditAccount,
    actHiddenAccount,
    actRecoverAccount,
  };
};

export default useAccountActions;
