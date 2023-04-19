import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";

// Selectors
import useSelectors from '../../../models/selectors';

// Services
import useApi from '../../../api';

// Interfaces
import { ListAccount } from '../../../ui/components/Carousel/Carousel.interface';

const useAccount = () => {
  const isFocused = useIsFocused();
  const [showAllAccounts, setShowAllAccounts] = useState(false);
  const [accounts, setAccounts] = useState<ListAccount[]>([]);
  const [realAccounts, setRealAccounts] = useState<ListAccount[]>([]);
  const [balanceTime, setBalanceTime] = useState('month');
  const { height } = Dimensions.get('window');
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
  const { actGetListAccount } = useAccountActions();


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

    if (!isAuth) {
      navigation.navigate('Welcome');
    }
    
    if (isAuth && isFocused) {
      actGetListAccount(onSuccess);
    }
  }, [isFocused]);

  return {
    height,
    accounts,
    navigation,
    handleChangeTime,
    balanceTime,
    listTime,
    showAllAccounts,
    handleChangeView,
  };
};

export default useAccount;
