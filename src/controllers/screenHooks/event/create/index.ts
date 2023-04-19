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
  end_event: Date;
}

type RootStackParamList = {
  EventDetail: {
    id: number;
  };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;

const useEventCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listCurrency, setListCurrency] = useState([]);
  const [title, setTitle] = useState('Creacion de evento');
  const [titleButton, setTitleButton] = useState('Crear');
  const { height } = Dimensions.get('window');

  // Validators
  const { useValidators } = useHelpers();
  const { eventValidator } = useValidators();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<ProfileScreenRouteProp>();

  const { useAuthSelectors, useGeneralSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const { currencySelector } = useGeneralSelectors();
  const isAuth = loggedSelector();
  const currencies = currencySelector();

  const { useActions } = useApi();
  const { useEventActions } = useActions();
  const {
    actCreateEvent,
    actGetDetailEvent,
    actEditEvent,
  } = useEventActions();

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
  } = useForm({
    defaultValues: {
      name: '',
      end_event: new Date(),
    },
    resolver: yupResolver(eventValidator),
    mode: 'all',
  });

  const onSubmit = (data: Form) => {
    
    const onSuccess = (message: string) => {
      Toast.show({
        type: 'success',
        text1: message,
      });
      navigation.dispatch(CommonActions.goBack());
      setIsLoading(false);
    };
    const form = {
      name: data.name,
      end_event: new Date(data.end_event).toISOString().slice(0, 10),
    }
    if (route?.params?.id) {
      actEditEvent(route?.params?.id, form, onSuccess);
    } else {
      actCreateEvent(form, onSuccess);
    }
  };

  useEffect(() => {
    const onSuccess = (data: Form) => {
      reset({...data, end_event: new Date(data.end_event)});
    };

    if (isAuth) {
      if (route?.params?.id) {
        //actGetDetailEvent(route.params.id, onSuccess);
        setTitle('Edicion de cuenta');
        setTitleButton('Editar');
        actGetDetailEvent(route?.params?.id, onSuccess);
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

export default useEventCreate;
