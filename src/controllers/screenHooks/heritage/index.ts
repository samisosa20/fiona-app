import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

// Selectors
import useSelectors from '../../../models/selectors';

// Services
import useApi from '../../../api';

// Interfaces
import { ListHeritage } from '../../../ui/components/Carousel/Carousel.interface';

interface ChartData {
  currencyData: string;
  data: any | never;
}

const useHeritage = () => {
  const isFocused = useIsFocused();
  const [listHeirtages, setHeritages] = useState<ListHeritage[]>([]);
  const [dataChart, setDatachart] = useState([
    {
      data: [0],
    },
  ]);
  const { width } = Dimensions.get('window');

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { useAuthSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const isAuth = loggedSelector();

  const { useActions } = useApi();
  const { useHeritageActions } = useActions();
  const { actGetConsolidateHeritage } = useHeritageActions();

  useEffect(() => {
    const onSuccess = (data: ListHeritage[]) => {
      setHeritages(data);

      // transform data to can read the line chart
      const newData = data
        .flatMap(({ year, balance }) =>
          balance.map(({ currency, comercial_amount, movements }) => ({
            year,
            currency,
            comercial_amount,
            movements,
          })),
        )
        .reduce((acc: ChartData[] | never, { year, currency, comercial_amount, movements }) => {
          const data = { year, comercial_amount, movements };
          const currencyData = acc.find(({ currencyData }) => currencyData === currency);
          if (currencyData) {
            currencyData.data.push(data);
          } else {
            acc.push({ currencyData: currency, data: [data] });
          }
          return acc;
        }, [])
        .map(({ currencyData, data }) => ({ data }));

      setDatachart(
        newData.map((v) => {
          return { data: v.data.map((v: any) => v.comercial_amount) };
        }),
      );
    };

    if (!isAuth) {
      navigation.navigate('Welcome');
    }

    if (isAuth && isFocused) {
      actGetConsolidateHeritage(onSuccess);
    }
  }, [isFocused]);

  return {
    listHeirtages,
    navigation,
    width,
    dataChart,
  };
};

export default useHeritage;
