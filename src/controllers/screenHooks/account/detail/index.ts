import { useState } from 'react';
import { Dimensions } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

import useHelpers from '../../../../helpers';

interface Form {
  email: string;
}

type RootStackParamList = {
  AccountDetail: {
    id: number
  };
}

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'AccountDetail'>;

const useAccountDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
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
  const route = useRoute<ProfileScreenRouteProp>();

  // Fake DataSource

  const account = {
      id: 1,
      name: 'Cuenta de ahorros banco Itau',
      description: 'Cuenta de banco',
      incomes: 35486250.25,
      expensives: -25486592.22,
      badge: {
        code: 'COP'
      },
      type: 'Ordinario',
    }

    const movements = [
      {
        id: 1,
        date_purchase: '2020-01-01 15:56:20',
        amount: 10000,
        category: {name: 'Ingreso'},
        description: 'Deposito de 10000 COP',
        event: null,
      },
      {
        id: 2,
        date_purchase: '2020-01-01 15:30:56',
        amount: -10000,
        category: {name: 'Casa'},
        description: 'Deposito de 10000 COP',
        event: { name: 'Cartagena - 2023'}
      },
    ]

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

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
    height,
    navigation,
    account,
    handleChangeTime,
    balanceTime,
    listTime,
    route,
    movements
  };
};

export default useAccountDetail;
