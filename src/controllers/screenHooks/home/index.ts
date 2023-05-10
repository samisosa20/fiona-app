import { useState, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

// Selectors
import useSelectors from '../../../models/selectors';

// Services
import useApi from '../../../api';

// Interfaces
import {
  ListAccount,
  ListEvent,
  ListHeritage,
} from '../../../ui/components/Carousel/Carousel.interface';

interface Balance {
  balance: number;
  currency: string;
}

const useHome = () => {
  const isFocused = useIsFocused();
  const [accounts, setAccounts] = useState<ListAccount[]>([]);
  const [events, setEvents] = useState<ListEvent[]>([]);
  const [heritages, setHeritage] = useState<ListHeritage[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);


  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { useAuthSelectors } = useSelectors();
  const { authSelector, loggedSelector } = useAuthSelectors();
  const user = authSelector();
  const isAuth = loggedSelector();

  const { useActions } = useApi();
  const { useAccountActions, useEventActions, useHeritageActions } = useActions();
  const { actGetListAccount, actGetBalanceAccount } = useAccountActions();
  const { actGetListActiveEvent } = useEventActions();
  const { actGetConsolidateHeritage } = useHeritageActions();

  // Fake DataSource

  const budgets = [
    /* {
      id: 1,
      name: '2023',
      income: 500000.0,
      expensive: -150000.0,
      currency: 'COP',
    },
    {
      id: 2,
      name: '2022',
      income: 500000.0,
      expensive: -150000.0,
      currency: 'COP',
    },
    {
      id: 3,
      name: '2021',
      income: 500000.0,
      expensive: -150000.0,
      currency: 'COP',
    }, */
  ];

  useEffect(() => {
    const onSuccess = (data: ListAccount[]) => {
      setAccounts(data.filter((v) => !v.deleted_at));
    };
    const onSuccessEvent = (data: ListEvent[]) => {
      setEvents(data);
    };
    const onSuccessHeritage = (data: ListHeritage[]) => {
      setHeritage(data.sort((a, b) => {
        return b.year - a.year;
      }).slice(0, 3));
    };
    const onSuccessBalance = (data: Balance[]) => {
      setBalances(data);
    };
    if (!isAuth) {
      navigation.navigate('Welcome');
    }

    if (isAuth && isFocused) {
      actGetListAccount(onSuccess);
      actGetListActiveEvent(onSuccessEvent);
      actGetConsolidateHeritage(onSuccessHeritage);
      actGetBalanceAccount(null, onSuccessBalance);
    }
  }, [isFocused]);

  return {
    accounts,
    events,
    budgets,
    heritages,
    user,
    balances,
  };
};

export default useHome;
