import { useState } from 'react';
import { Dimensions } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';

import useHelpers from '../../../helpers';

interface Form {
  email: string;
}

const useAccount = () => {
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

  // Fake DataSource

  const accounts = [
    {
      id: 1,
      name: 'Cuenta de ahorros banco Itau',
      balance: 150000,
      currency: 'COP',
      type: 'Ordinario'
    },
    {
      id: 2,
      name: 'FIC Itau',
      balance: 150256348.45,
      currency: 'COP',
      type: 'Ahorros'
    },
    {
      id: 3,
      name: 'Efectivo',
      balance: 15348.45,
      currency: 'COP',
      type: 'Ordinario'
    },
    {
      id: 4,
      name: 'TC Visa',
      balance: -548276.55,
      currency: 'COP',
      type: 'Tarjeta Credito'
    }
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
    accounts,
    handleChangeTime,
    balanceTime,
    listTime,
  };
};

export default useAccount;
