// Provider
import useProviders from '../../providers';

const useCategoryActions = () => {
  // Providers
  const { useCategoryProviders } = useProviders();
  const {
    listCategoryProvider,
    createCategoryProvider,
    updateCategoryProvider,
    hiddenCategoryProvider,
    detailCategoryProvider,
    activateCategoryProvider,
    listFieldCategoryProvider,
  } = useCategoryProviders();

  const actGetListCategory = async (params?: {category_father: number},
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await listCategoryProvider(params);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actGetListFieldCategory = async (
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await listFieldCategoryProvider();
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actGetDetailCategory = async (id: number,
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await detailCategoryProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };

  const actCreateCategory = async (data: any,
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await createCategoryProvider(data);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };
  
  const actEditCategory = async (id: number, data: any,
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await updateCategoryProvider(id, data);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };

  const actDeleteCategory = async (id: number,
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await hiddenCategoryProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };

  const actRecoverCategory = async (id: number,
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await activateCategoryProvider(id);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data.message);
    } catch (e) {
      onError && onError(e);
    }
  };

  return {
    actGetListCategory,
    actGetDetailCategory,
    actCreateCategory,
    actEditCategory,
    actDeleteCategory,
    actRecoverCategory,
    actGetListFieldCategory,
  };
};

export default useCategoryActions;
