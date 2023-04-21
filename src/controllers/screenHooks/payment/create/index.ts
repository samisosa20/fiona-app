import { useState, useEffect, useRef } from 'react';
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

// Interface
import { ListAccount } from '../../../../ui/components/Carousel/Carousel.interface';
import { Options } from '../../../../ui/components/AutocompleteControl/AutocompleteControl.interface';
import { Options as SelectField } from '../../../../ui/components/SelectControl/SelectControl.interface';

interface Form {
  account_id: string;
  category_id: {
    id: string;
    name: string;
  };
  amount: string;
  start_date: string | Date;
  end_date: string | Date;
  specific_day: string;
  description: string | null;
  category?: {
    id: string;
    name: string;
  };
  account?: {
    id: string;
    name: string;
  };
}

type RootStackParamList = {
  PaymentCreate: {
    id: number;
  };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'PaymentCreate'>;

const usePaymentCreate = () => {
  const autoCompleteFieldRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('Creacion de pagos');
  const [titleButton, setTitleButton] = useState('Crear');
  const [listFieldCategory, setListFieldCategory] = useState<Options[]>([]);
  const [accounts, setAccounts] = useState<SelectField[]>([]);

  // Validators
  const { useValidators } = useHelpers();
  const { paymentValidator } = useValidators();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<ProfileScreenRouteProp>();

  const { useAuthSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const isAuth = loggedSelector();

  const { useActions } = useApi();
  const { usePaymentActions, useCategoryActions, useAccountActions } = useActions();
  const { actCreatePayment, actGetDetailPayment, actEditPayment } = usePaymentActions();
  const { actGetListFieldCategory } = useCategoryActions();
  const { actGetListAccount } = useAccountActions();

  // Form State
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      account_id: '',
      category_id: {
        id: '',
        name: '',
      },
      amount: '',
      start_date: new Date(),
      end_date: new Date(),
      specific_day: '',
      description: null,
    },
    resolver: yupResolver(paymentValidator),
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
    const start_date = new Date(data.start_date)
    const end_date = new Date(data.end_date)

    const form = {
      account_id: data.account_id,
      category_id: data.category_id.id,
      description: data.description,
      amount: data.amount,
      start_date: start_date.toISOString().slice(0, 10),
      end_date: end_date.toISOString() <= start_date.toISOString() ? null : end_date.toISOString().slice(0, 10),
      specific_day: data.specific_day,
    };
    console.log(form);
    if (route?.params?.id) {
      actEditPayment(route?.params?.id, form, onSuccess);
    } else {
      actCreatePayment(form, onSuccess);
    }
  };

  useEffect(() => {
    const onSuccess = (data: Form) => {
      reset({
        account_id: data.account.id.toString(),
        amount: data.amount.toString(),
        specific_day: data.specific_day.toString(),
        start_date: new Date(data.start_date),
        end_date: data.end_date ? new Date(data.end_date) : new Date(data.start_date),
        description: data.description
      });
      autoCompleteFieldRef.current?.setItem({
        id: data.category?.id,
        title: data.category?.name,
      });
    };

    const onSuccessAccount = (data: ListAccount[]) => {
      setAccounts(
        data
          .filter((v) => !v.deleted_at)
          .map((v) => {
            return { label: v.name + ' - ' + v.currency.code, value: v.id.toString() };
          }),
      );
    };

    const onSeccesField = (data: Options[]) => {
      setListFieldCategory(data);
    };

    if (isAuth) {
      actGetListFieldCategory(onSeccesField);
      actGetListAccount(onSuccessAccount);
      if (route?.params?.id) {
        setTitle('Edicion de pagos');
        setTitleButton('Editar');
        actGetDetailPayment(route?.params?.id, onSuccess);
      }
    } else {
      navigation.navigate('Welcome');
    }
  }, []);

  return {
    title,
    control,
    errors,
    handleSubmit,
    onSubmit,
    isLoading,
    titleButton,
    accounts,
    listFieldCategory,
    autoCompleteFieldRef,
  };
};

export default usePaymentCreate;
