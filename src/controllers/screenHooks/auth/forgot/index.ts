import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';


import useHelpers from '../../../../helpers'

interface Form {
    email: string;
}

const useForgot = () => {
    const [isLoading, setIsLoading] = useState(false)
  // Validators
  const { useValidators } = useHelpers();
  const { forgotValidator } = useValidators();

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

export default useForgot;
