import { useState, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";

// Selectors
import useSelectors from '../../../models/selectors';

// Services
import useApi from '../../../api';

// Interfaces
import { ListAccount } from '../../../ui/components/Carousel/Carousel.interface';

interface Balance {
  type: string;
  currency: string;
  balance: number;
}

const useAccount = () => {
  const isFocused = useIsFocused();
  const [showAllAccounts, setShowAllAccounts] = useState(false);
  const [accounts, setAccounts] = useState<ListAccount[]>([]);
  const [realAccounts, setRealAccounts] = useState<ListAccount[]>([]);
  const [balances, setBalances] = useState<Balance[]>([])
  const [balanceTime, setBalanceTime] = useState('month');
  const listTime = [
    {id: 'month', name: 'Mes'},
    {id: 'year', name: 'Año'},
    {id: 'total', name: 'Total'},
  ]

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { useAuthSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const isAuth = loggedSelector();

  const { useActions } = useApi();
  const { useAccountActions } = useActions();
  const { actGetListAccount, actGetBalanceMonthYearAccount } = useAccountActions();


  const handleChangeTime = (time: string) =>{
    setBalanceTime(time);
  }

  const handleChangeView = () => {
    if (!showAllAccounts) {
      setAccounts(realAccounts)
    } else {
      setAccounts(realAccounts.filter(v => !v.deleted_at));
    }
    setShowAllAccounts(!showAllAccounts);
  }

  useEffect(() => {
    const onSuccess = (data: ListAccount[]) => {
      setRealAccounts(data)
      setAccounts(data.filter(v => !v.deleted_at));
    };

    const onSuccessBalance = (data: Balance[]) => {
      setBalances(data)
    }

    if (!isAuth) {
      navigation.navigate('Welcome');
    }
    
    if (isAuth && isFocused) {
      actGetListAccount(onSuccess);
      actGetBalanceMonthYearAccount({}, onSuccessBalance);
    }
  }, [isFocused]);

  return {
    accounts,
    navigation,
    handleChangeTime,
    balanceTime,
    listTime,
    showAllAccounts,
    handleChangeView,
    balances,
  };
};

export default useAccount;
