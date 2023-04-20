
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import Toast from "react-native-toast-message";
import { useIsFocused } from "@react-navigation/native";

// Helpers
import useHelpers from '../../../helpers';

// Selectors
import useSelectors from '../../../models/selectors';

// Actions
import useActions from '../../../api/actions';
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
}

const useProfile = () => {
    const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const { height } = Dimensions.get('window');

  // Validators
  const { useValidators } = useHelpers();
  const { profileValidator } = useValidators();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // Actions
  const { dispatch, useAuthActions } = useActions();
  const { actLogout, actEditProfile } = useAuthActions();

  const { useAuthSelectors } = useSelectors();
  const { authSelector, loggedSelector } = useAuthSelectors();
  const user = authSelector();
  const isAuth = loggedSelector();

  // Form State
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    resolver: yupResolver(profileValidator),
    mode: 'all',
  });

  const handleLogout = () => {
    const onSuccess = (message: string) => {
        Toast.show({
            type: 'success',
            text1: message,
          });
        navigation.navigate('Welcome')
    }
    dispatch(actLogout(onSuccess))
  }

  const onSubmit = (data: Form) => {
    setIsLoading(true);
    const onSucces = (data: ResponseData) => {
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: data.message,
      })
    };
    const onError = () => {
      setIsLoading(false);
    };
    dispatch(actEditProfile(data, onSucces, onError))
  };

  useEffect(() => {
    if (!isAuth) {
      navigation.navigate('Welcome');
    }
    
    if (isAuth && isFocused) {
        reset({name: user.name, email: user.email});
    }
  }, [isFocused]);

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
    height,
    handleLogout,
  };
};

export default useProfile;
