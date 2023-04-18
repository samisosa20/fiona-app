import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

// Selectors
import useSelectors from '../../../../models/selectors';

// Services
import useApi from '../../../../api';

// Interfaces
import { ListAccount } from '../../../../ui/components/Carousel/Carousel.interface';
import { Movements } from '../../../../ui/components/ListMovements/ListMovements.interface';


type RootStackParamList = {
  AccountDetail: {
    id: number;
  };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'AccountDetail'>;

const useAccountDetail = () => {
  const [account, setAccount] = useState<ListAccount>();
  const [movements, setMovements] = useState<Movements[]>();
  const [balanceTime, setBalanceTime] = useState('month');
  const { height } = Dimensions.get('window');
  const listTime = [
    { id: 'month', name: 'Mes' },
    { id: 'year', name: 'Año' },
    { id: 'total', name: 'Total' },
  ];

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<ProfileScreenRouteProp>();

  const { useAuthSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const isAuth = loggedSelector();

  const { useActions } = useApi();
  const { useAccountActions } = useActions();
  const { actGetDetailAccount, actGetMovementAccount } = useAccountActions();


  const handleChangeTime = (time: string) => {
    setBalanceTime(time);
  };

  useEffect(() => {
    const onSuccess = (data: ListAccount) => {
      setAccount(data);
    };

    const onSuccessMovement = (data: Movements[]) => {
      setMovements(data);
    };

    if (isAuth) {
      actGetDetailAccount(route.params.id, onSuccess);
      actGetMovementAccount(route.params.id, onSuccessMovement);
    } else {
      navigation.navigate('Welcome');
    }
  }, []);

  return {
    height,
    navigation,
    account,
    handleChangeTime,
    balanceTime,
    listTime,
    route,
    movements,
  };
};

export default useAccountDetail;
