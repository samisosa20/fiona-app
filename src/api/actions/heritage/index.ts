// Provider
import useProviders from '../../providers';

const useHeritageActions = () => {
  // Providers
  const { useHeritageProviders } = useProviders();
  const {
    listHeritageProvider,
    createHeritageProvider,
    updateHeritageProvider,
    hiddenHeritageProvider,
    detailHeritageProvider,
    consolidateHeritageProvider,
  } = useHeritageProviders();

  const actGetListHeritage = async (year:number, 
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await listHeritageProvider(year);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actGetDetailHeritage = async (id: number,
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await detailHeritageProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };

  const actCreateHeritage = async (data: any,
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await createHeritageProvider(data);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actEditHeritage = async (id: number, data: any,
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await updateHeritageProvider(id, data);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };

  const actDeleteHeritage = async (id: number,
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await hiddenHeritageProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };
  const actGetConsolidateHeritage = async (
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await consolidateHeritageProvider();
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };

  return {
    actGetListHeritage,
    actGetDetailHeritage,
    actCreateHeritage,
    actEditHeritage,
    actDeleteHeritage,
    actGetConsolidateHeritage,
  };
};

export default useHeritageActions;
