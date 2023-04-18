import { useState } from 'react';
import { Dimensions } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import Toast from "react-native-toast-message";

import useHelpers from '../../../../helpers';

// Actions
import useActions from '../../../../api/actions';
interface Form {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface ResponseData {
  message: string;
  data: {
    name: string;
    email: string;
  }
  token: string;
}

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { height } = Dimensions.get('window');

  // Validators
  const { useValidators } = useHelpers();
  const { registerValidator } = useValidators();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // Actions
  const { dispatch, useAuthActions } = useActions();
  const { actRegister } = useAuthActions();

  // Form State
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    resolver: yupResolver(registerValidator),
    mode: 'all',
  });

  const onSubmit = (data: Form) => {
    console.log(data);
    setIsLoading(true);
    const onSucces = (data: ResponseData) => {
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: data.message,
      })
      navigation.navigate('Dashboard');
    };
    const onError = () => {
      setIsLoading(false);
    };
    dispatch(actRegister(data, onSucces, onError))
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
    height,
    navigation,
  };
};

export default useRegister;
