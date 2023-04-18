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

  return {
    actGetListAccount,
    actGetDetailAccount,
    actGetMovementAccount,
  };
};

export default useAccountActions;
