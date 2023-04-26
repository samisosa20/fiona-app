import { useState, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Dimensions } from 'react-native';

// Selectors
import useSelectors from '../../../models/selectors';

// Services
import useApi from '../../../api';

import useHelpers from '../../../helpers';

// Interfaces
interface Open {
  income: number;
  expensive: number;
  utility: number;
  open_balance: number;
}

interface Amount {
  category: string;
  name?: string;
  porcent?: string;
  amount: number;
}
interface Balance {
  date: string;
  amount: number;
}

interface Report {
  open_close: Open;
  incomes: Amount[];
  main_expensive: Amount[];
  group_expensive: Amount[];
  list_expensives: Amount[];
  balances: Balance[];
}

const useReport = () => {
  const isFocused = useIsFocused();
  const [openclose, setOpenClose] = useState<Open>({
    income: 0,
    expensive: 0,
    utility: 0,
    open_balance: 0,
  });
  const [income, setIncome] = useState<Amount[]>();
  const [mainExpensive, setMainExpensive] = useState<Amount[]>();
  const [groupExpensive, setGroupExpensive] = useState<Amount[]>([]);
  const [listExpensive, setListExpensive] = useState<Amount[]>([]);
  const [listBalance, setListBalance] = useState<Balance[]>();
  const [listHiddenDots, setListHiddenDots] = useState<number[]>();
  const [listCurrency, setListCurrency] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = Dimensions.get('window');

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // Validators
  const { useValidators } = useHelpers();
  const { filterReportValidator } = useValidators();

  const colorChart = [
    '#5f76e8',
    '#ff4f70',
    '#01caf1',
    '#ff7f0e',
    '#ffbb78',
    '#2ca02c',
    '#98df8a',
    '#d62728',
    '#ff9896',
    '#9467bd',
    '#c5b0d5',
    '#8c564b',
    '#c49c94',
    '#e377c2',
    '#f7b6d2',
    '#7f7f7f',
    '#c7c7c7',
    '#bcbd22',
    '#dbdb8d',
    '#17becf',
    '#9edae5',
  ];

  const { useAuthSelectors, useGeneralSelectors } = useSelectors();
  const { loggedSelector, authSelector } = useAuthSelectors();
  const { currencySelector } = useGeneralSelectors();
  const isAuth = loggedSelector();
  const user = authSelector();
  const currencies = currencySelector();

  const { useActions } = useApi();
  const { useReportActions } = useActions();
  const { actGetReport } = useReportActions();

  const defaultDate = new Date();
  defaultDate.setMonth(defaultDate.getMonth() + 1);

  // Form State
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      end_date: new Date(defaultDate.setDate(0)),
      init_date: new Date(defaultDate.setDate(1)),
      currency: user.currency,
    },
    resolver: yupResolver(filterReportValidator),
    mode: 'all'
  });

  const onSubmit = (data: { init_date: Date; end_date: Date; currency: number }) => {
    const onSuccess = (data: Report) => {
      setOpenClose(data.open_close);
      setIncome(data.incomes);
      setMainExpensive(data.main_expensive);
      setGroupExpensive(data.group_expensive);
      setListExpensive(data.list_expensives);
      setListBalance(data.balances);
      const numeros = Array.from({ length: data.balances.length }, (_, index) => index);
      const eachHidden = data.balances.length / 3;
      numeros.splice(9 + eachHidden, 1);
      numeros.splice(eachHidden - 1, 1);
      numeros.pop();
      numeros.shift();
      setListHiddenDots(numeros);
      setShowModal(false);
      setIsLoading(false);
    };

    const onError = () => {
      setIsLoading(false);
    };

    setIsLoading(true);
    actGetReport(
      {
        init_date: data.init_date.toISOString().slice(0, 10),
        end_date: data.end_date.toISOString().slice(0, 10),
        currency: data.currency,
      },
      onSuccess,
      onError,
    );
  };

  useEffect(() => {
    const onSuccess = (data: Report) => {
      setOpenClose(data.open_close);
      setIncome(data.incomes);
      setMainExpensive(data.main_expensive);
      setGroupExpensive(data.group_expensive);
      setListExpensive(data.list_expensives);
      setListBalance(data.balances);
      const numeros = Array.from({ length: data.balances.length }, (_, index) => index);
      const eachHidden = data.balances.length / 3;
      numeros.splice(9 + eachHidden, 1);
      numeros.splice(eachHidden - 1, 1);
      numeros.pop();
      numeros.shift();
      setListHiddenDots(numeros);
    };

    if (!isAuth) {
      navigation.navigate('Welcome');
    }

    if (isAuth && isFocused) {
      const defaultDate = new Date();
      defaultDate.setMonth(defaultDate.getMonth() + 1);
      actGetReport(
        {
          end_date: new Date(defaultDate.setDate(0)).toISOString().slice(0, 10),
          init_date: new Date(defaultDate.setDate(1)).toISOString().slice(0, 10),
          currency: user.currency,
        },
        onSuccess,
      );
    }
  }, [isFocused]);

  useEffect(() => {
    setListCurrency(
      currencies?.map((v: { code: string; name: string; id: number }) => {
        return { label: `${v.code} - ${v.name}`, value: v.id };
      }),
    );
  }, [currencies]);

  return {
    openclose,
    income,
    mainExpensive,
    groupExpensive,
    listExpensive,
    listBalance,
    colorChart,
    listHiddenDots,
    control,
    errors,
    listCurrency,
    setShowModal,
    showModal,
    onSubmit,
    handleSubmit,
    isLoading,
    width,
  };
};

export default useReport;
