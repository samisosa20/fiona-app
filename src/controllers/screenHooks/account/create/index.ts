import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import useHelpers from '../../../../helpers';

// Selectors
import useSelectors from '../../../../models/selectors';

// Services
import useApi from '../../../../api';

interface Form {
  name: string;
  description: string;
  init_amount: string;
  badge_id: number;
  type: string;
  deleted_at?: string | null;
}

type RootStackParamList = {
  AccountDetail: {
    id: number;
  };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'AccountDetail'>;

const useAccountCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [intStatus, setInitStatus] = useState(false);
  const [listCurrency, setListCurrency] = useState([]);
  const [title, setTitle] = useState('Creacion de cuenta');
  const [titleButton, setTitleButton] = useState('Crear');
  const { height } = Dimensions.get('window');

  // Validators
  const { useValidators } = useHelpers();
  const { accountValidator } = useValidators();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<ProfileScreenRouteProp>();

  const { useAuthSelectors, useGeneralSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const { currencySelector } = useGeneralSelectors();
  const isAuth = loggedSelector();
  const currencies = currencySelector();

  const { useActions } = useApi();
  const { useAccountActions } = useActions();
  const {
    actCreateAccount,
    actGetDetailAccount,
    actEditAccount,
    actHiddenAccount,
    actRecoverAccount,
  } = useAccountActions();

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
  ];

  // Form State
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      init_amount: '0',
      badge_id: 0,
      type: '',
      status: true,
    },
    resolver: yupResolver(accountValidator),
    mode: 'all',
  });

  const onSubmit = (data: Form) => {
    setIsLoading(true);
    const onSuccess = (message: string) => {
      Toast.show({
        type: 'success',
        text1: message,
      });
      navigation.dispatch(CommonActions.goBack());
      setIsLoading(false);
    };
    if (route?.params?.id) {
      if (intStatus) {
        actEditAccount(route?.params?.id, data, onSuccess);
      }
      if (!watch('status')) {
        actHiddenAccount(route.params.id);
      } else {
        actRecoverAccount(route.params.id);
      }
    } else {
      actCreateAccount(data, onSuccess);
    }
  };

  useEffect(() => {
    const onSuccess = (data: Form) => {
      setInitStatus(!data.deleted_at)
      reset({ ...data, init_amount: data.init_amount.toString(), status: !data.deleted_at });
    };

    if (isAuth) {
      if (route?.params?.id) {
        //actGetDetailAccount(route.params.id, onSuccess);
        setTitle('Edicion de cuenta');
        setTitleButton('Editar');
        actGetDetailAccount(route?.params?.id, onSuccess);
      }
    } else {
      navigation.navigate('Welcome');
    }
  }, []);

  useEffect(() => {
    setListCurrency(
      currencies?.map((v: { code: string; name: string; id: number }) => {
        return { label: `${v.code} - ${v.name}`, value: v.id };
      }),
    );
  }, [currencies]);

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
    listCurrency,
    titleButton,
    route,
  };
};

export default useAccountCreate;
