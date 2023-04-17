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

const useHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { height } = Dimensions.get('window');

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
  
  const events = [
    {
      id: 1,
      name: 'San Andres - 2023',
      balance: -150000,
      currency: 'COP',
    },
    {
      id: 2,
      name: 'Cumple 50',
      balance: -584000.00,
      currency: 'COP',
    },
    {
      id: 3,
      name: 'Madrid - 2020',
      balance: -12548639.45,
      currency: 'COP',
    }
  ]
  
  const budgets = [
    {
      id: 1,
      name: '2023',
      income: 500000.00,
      expensive: -150000.00,
      currency: 'COP',
    },
    {
      id: 2,
      name: '2022',
      income: 500000.00,
      expensive: -150000.00,
      currency: 'COP',
    },
    {
      id: 3,
      name: '2021',
      income: 500000.00,
      expensive: -150000.00,
      currency: 'COP',
    }
  ]
  
  const heritages = [
    {
      id: 1,
      name: '2023',
      balance: 350000000.00,
      currency: 'COP',
    },
    {
      id: 2,
      name: '2022',
      balance: 175000000.00,
      currency: 'COP',
    },
    {
      id: 3,
      name: '2021',
      balance: 245500000.00,
      currency: 'COP',
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

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
    height,
    navigation,
    accounts,
    events,
    budgets,
    heritages,
  };
};

export default useHome;
