import { useState } from 'react';
import { Dimensions } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';

// Helper
import useHelpers from '../../../../helpers';

// Actions
import useActions from '../../../../api/actions';
interface Form {
  email: string;
  password: string;
}

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { height } = Dimensions.get('window');

  // Validators
  const { useValidators } = useHelpers();
  const { loginValidator } = useValidators();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // Actions
  const { dispatch, useAuthActions } = useActions();
  const { actLogin } = useAuthActions();

  // Form State
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginValidator),
    mode: 'all',
  });

  const onSubmit = (data: Form) => {
    setIsLoading(true);
    const onSucces = () => {
      setIsLoading(false);
      navigation.navigate('Dashboard');
    };
    const onError = () => {
      setIsLoading(false);
    };
    dispatch(actLogin(data, onSucces, onError))
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
    navigation,
    height,
  };
};

export default useLogin;
