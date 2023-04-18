import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';

import useHelpers from '../../../helpers';

// Selectors
import useSelectors from '../../../models/selectors';

// Services
import useApi from '../../../api';

// Interfaces
import { ListAccount } from '../../../ui/components/Carousel/Carousel.interface';

interface Form {
  email: string;
}

const useAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState<ListAccount[]>([]);
  const [balanceTime, setBalanceTime] = useState('month');
  const { height } = Dimensions.get('window');
  const listTime = [
    {id: 'month', name: 'Mes'},
    {id: 'year', name: 'Año'},
    {id: 'total', name: 'Total'},
  ]

  // Validators
  const { useValidators } = useHelpers();
  const { forgotValidator } = useValidators();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { useAuthSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const isAuth = loggedSelector();

  const { useActions } = useApi();
  const { useAccountActions } = useActions();
  const { actGetListAccount } = useAccountActions();


  // Form State
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgotValidator),
    mode: 'all',
  });

  const onSubmit = (data: Form) => {
    setIsLoading(true);
    console.log('submiting with ', data);
    navigation.navigate('Home');
  };

  const handleChangeTime = (time: string) =>{
    setBalanceTime(time);
  }

  useEffect(() => {
    const onSuccess = (data: ListAccount[]) => {
      setAccounts(data);
    };

    if (isAuth) {
      actGetListAccount(onSuccess);
    } else {
      navigation.navigate('Welcome');
    }
  }, []);

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
    height,
    navigation,
    accounts,
    handleChangeTime,
    balanceTime,
    listTime,
  };
};

export default useAccount;
