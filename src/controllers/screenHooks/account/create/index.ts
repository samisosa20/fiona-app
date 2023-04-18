import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

import useHelpers from '../../../../helpers';

// Selectors
import useSelectors from '../../../../models/selectors';

// Services
import useApi from '../../../../api';

// Interfaces
import { ListAccount } from '../../../../ui/components/Carousel/Carousel.interface';

interface Form {
  name: string;
  description: string;
  init_amount: number;
  badge_id: number;
  type: string;
}

type RootStackParamList = {
  AccountDetail: {
    id: number;
  };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'AccountDetail'>;

const useAccountCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('Creacion de cuenta');
  const { height } = Dimensions.get('window');


  // Validators
  const { useValidators } = useHelpers();
  const { accountValidator } = useValidators();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<ProfileScreenRouteProp>();

  const { useAuthSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const isAuth = loggedSelector();

  const { useActions } = useApi();
  const { useAccountActions } = useActions();
  const { actGetDetailAccount, actGetMovementAccount } = useAccountActions();

  const listType = [
    {
      label: 'Corriente',
      value: 'Corriente',
    },
    {
      label: 'Ahorros',
      value: 'Ahorros',
    },
    {
      label: 'Inversion',
      value: 'Inversion',
    },
    {
      label: 'Tarjeta de credito',
      value: 'Tarjeta de credito',
    },
    {
      label: 'Credito',
      value: 'Credito',
    },
  ]

  // Form State
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      init_amount: 0,
      badge_id: 0,
      type: '',
    },
    resolver: yupResolver(accountValidator),
    mode: 'all',
  });

  const onSubmit = (data: Form) => {
    setIsLoading(true);
    console.log('submiting with ', data);
    setIsLoading(false);
    //navigation.navigate('Home');
  };


  useEffect(() => {
    /* const onSuccess = (data: ListAccount) => {
      setAccount(data);
    }; */

    if (isAuth) {
      if (route?.params?.id) {
        //actGetDetailAccount(route.params.id, onSuccess);
        setTitle('Edicion de cuenta')
      }
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
    title,
    listType,
  };
};

export default useAccountCreate;
