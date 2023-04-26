// Provider
import useProviders from '../../providers';

const useReportActions = () => {
  // Providers
  const { useReportProviders } = useProviders();
  const {
    listReportProvider,
  } = useReportProviders();

  const actGetReport = async (params: {init_date: string, end_date: string, currency: number},
    onSuccess: Function = () => {},
    onError: Function = () => {},
  ) => {
    try {
      const response = await listReportProvider(params);
      if (response.status !== 200) throw response;
      onSuccess && onSuccess(response.data);
    } catch (e) {
      onError && onError(e);
    }
  };

  return {
    actGetReport,
  };
};

export default useReportActions;
