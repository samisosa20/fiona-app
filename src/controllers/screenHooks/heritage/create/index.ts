import { useState, useEffect } from 'react';
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
  comercial_amount: string;
  legal_amount: string;
  badge_id: string | null;
  year: string | null;
}

type RootStackParamList = {
  EventDetail: {
    id: number;
  };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;

const useHeritageCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listCurrency, setListCurrency] = useState([]);
  const [title, setTitle] = useState('Creacion de patrimonio');
  const [titleButton, setTitleButton] = useState('Crear');
  const currentYear = new Date().getFullYear();

  const listYear = Array.from({ length: 5 }, (_, i) => {
    return { label: (currentYear - 2 + i).toString(), value: (currentYear - 2 + i).toString() };
  });

  // Validators
  const { useValidators } = useHelpers();
  const { heritageValidator } = useValidators();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<ProfileScreenRouteProp>();

  const { useAuthSelectors, useGeneralSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const { currencySelector } = useGeneralSelectors();
  const isAuth = loggedSelector();
  const currencies = currencySelector();

  const { useActions } = useApi();
  const { useHeritageActions } = useActions();
  const { actCreateHeritage, actGetDetailHeritage, actEditHeritage } = useHeritageActions();

  // Form State
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      comercial_amount: '0',
      legal_amount: '0',
      badge_id: null,
      year: null,
    },
    resolver: yupResolver(heritageValidator),
    mode: 'all',
  });

  const onSubmit = (data: Form) => {
    console.log(data);
    const onSuccess = (message: string) => {
      Toast.show({
        type: 'success',
        text1: message,
      });
      navigation.dispatch(CommonActions.goBack());
      setIsLoading(false);
    };
    if (route?.params?.id) {
      actEditHeritage(route?.params?.id, data, onSuccess);
    } else {
      actCreateHeritage(data, onSuccess);
    }
  };

  useEffect(() => {
    const onSuccess = (data: any) => {
      reset({
        ...data,
        comercial_amount: data.comercial_amount.toString(),
        legal_amount: data.legal_amount.toString(),
        year: data.year.toString(),
      });
    };

    if (isAuth) {
      if (route?.params?.id) {
        setTitle('Edicion de patrimonio');
        setTitleButton('Editar');
        actGetDetailHeritage(route?.params?.id, onSuccess);
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
    title,
    control,
    errors,
    handleSubmit,
    onSubmit,
    isLoading,
    titleButton,
    listCurrency,
    listYear,
  };
};

export default useHeritageCreate;
