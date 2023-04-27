import { useState, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

// Selectors
import useSelectors from '../../../../models/selectors';

// Services
import useApi from '../../../../api';

// Interfaces
import { ListAccount } from '../../../../ui/components/Carousel/Carousel.interface';
import { Movements } from '../../../../ui/components/ListMovements/ListMovements.interface';

interface TimeBalance {
  id: 'month' | 'year' | 'total';
  name: string;
}

type RootStackParamList = {
  AccountDetail: {
    id: number;
  };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'AccountDetail'>;

const useAccountDetail = () => {
  const isFocused = useIsFocused();
  const [account, setAccount] = useState<ListAccount>();
  const [movements, setMovements] = useState<Movements[]>();
  const [balanceTime, setBalanceTime] = useState<'month' | 'year' | 'total'>('month');

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<ProfileScreenRouteProp>();

  const { useAuthSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const isAuth = loggedSelector();

  const { useActions } = useApi();
  const { useAccountActions } = useActions();
  const { actGetDetailAccount, actGetMovementAccount } = useAccountActions();

  const listTime: TimeBalance[] = [
    { id: 'month', name: 'Mes' },
    { id: 'year', name: 'Año' },
    { id: 'total', name: 'Total' },
  ];

  const handleChangeTime = (time: 'month' | 'year' | 'total') =>{
    setBalanceTime(time);
  }

  useEffect(() => {
    const onSuccess = (data: ListAccount) => {
      setAccount(data);
    };

    const onSuccessMovement = (data: Movements[]) => {
      setMovements(data);
    };

    if (!isAuth) {
      navigation.navigate('Welcome');
    }

    if (isAuth && isFocused) {
      actGetDetailAccount(route.params.id, onSuccess);
      actGetMovementAccount(route.params.id, onSuccessMovement);
    }
  }, [isFocused]);

  return {
    navigation,
    account,
    movements,
    listTime,
    handleChangeTime,
    balanceTime,
  };
};

export default useAccountDetail;
