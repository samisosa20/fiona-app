import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';


import useHelpers from '../../../../helpers'

interface Form {
    email: string;
    password: string;
}

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
  // Validators
  const { useValidators } = useHelpers();
  const { loginValidator } = useValidators();

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
    setIsLoading(true)
    console.log('submiting with ', data);
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
  };
};

export default useLogin;
