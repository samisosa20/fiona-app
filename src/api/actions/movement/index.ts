// Provider
import useProviders from '../../providers';

const useMovementActions = () => {
  // Providers
  const { useMovementProviders } = useProviders();
  const {
    listMovementProvider,
    createMovementProvider,
    updateMovementProvider,
    hiddenMovementProvider,
    detailMovementProvider,
  } = useMovementProviders();

  const actGetListMovement = async (
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await listMovementProvider();
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actGetDetailMovement = async (id: number,
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await detailMovementProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };

  return {
    actGetListMovement,
    actGetDetailMovement,
  };
};

export default useMovementActions;
