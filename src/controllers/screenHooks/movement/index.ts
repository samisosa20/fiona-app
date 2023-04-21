import { useState, useEffect, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';

// Helpers
import useHelpers from '../../../helpers';

// Selectors
import useSelectors from '../../../models/selectors';

// Actions
import useActions from '../../../api/actions';

// Interfaces
import { ListAccount, ListEvent } from '../../../ui/components/Carousel/Carousel.interface';
import { Options } from '../../../ui/components/AutocompleteControl/AutocompleteControl.interface';
import { Options as SelectField } from '../../../ui/components/SelectControl/SelectControl.interface';

interface Form {
  type: string;
  amount: string;
  account_id: null | string;
  category_id: {
    id: string;
    name: string;
  } | null;
  description: null | string;
  date_purchase: string | Date;
  event_id: null | string;
  account_end_id: null | string;
  amount_end: string;
}

interface ResponseData {
  message: string;
  data: {
    name: string;
    email: string;
  };
}

const useMovement = () => {
  const isFocused = useIsFocused();
  const autoCompleteFieldRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [steps, setSteps] = useState(1);
  const [accounts, setAccounts] = useState<SelectField[]>([]);
  const [events, setEvents] = useState<SelectField[]>([]);
  const [categories, setCategories] = useState<Options[]>([]);

  // Validators
  const { useValidators } = useHelpers();
  const { movementValidator } = useValidators();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // Actions
  const { useAccountActions, useEventActions, useCategoryActions, useMovementActions } =
    useActions();
  const { actGetListAccount } = useAccountActions();
  const { actGetListActiveEvent } = useEventActions();
  const { actGetListFieldCategory } = useCategoryActions();
  const { actGetDetailMovement, actCreateMovement } = useMovementActions();

  const { useAuthSelectors } = useSelectors();
  const { authSelector, loggedSelector } = useAuthSelectors();
  const user = authSelector();
  const isAuth = loggedSelector();

  // Form State
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: 'move',
      amount: '',
      account_id: '0',
      category_id: null,
      description: null,
      date_purchase: new Date(),
      event_id: '',
      account_end_id: '',
      amount_end: '',
    },
    resolver: yupResolver(movementValidator),
    mode: 'all',
  });

  const watchAccountInitField = watch("account_id");
  const watchAccountEndField = watch("account_end_id");

  const descriptionText = [
    'Inicia indicando que tipo de movimiento haras, cuanto te ingreso o gastaste y cuando lo hiciste',
    'Ahora indica de a que cuenta te ingreo o salio el dinero y el motivo',
    'Por ultimo agrega una descripcion, comentario u observacion o si pertenece algun evento'
  ]

  const onSubmit = (data: Form) => {
    setIsLoading(true);
    const onSucces = (data: ResponseData) => {
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: data.message,
      });
      reset();
      autoCompleteFieldRef.current?.setItem({});
      setSteps(1)
    };
    const onError = () => {
      setIsLoading(false);
    };
    if (data.type === 'transfer') {
      if (
        data.account_end_id === '' ||
        data.account_end_id === null ||
        data.account_end_id === undefined
      ) {
        setError('account_end_id', { type: 'required', message: 'campo requerido' });
        setIsLoading(false);
        return;
      }
      if (isReadOnly && (data.amount_end === null || data.amount_end === undefined || data.amount_end === '')) {
        setError('amount_end', { type: 'required', message: 'campo requerido' });
        setIsLoading(false);
        return;
      }
    } else {
      if (data.category_id === null || data.category_id === undefined) {
        setError('category_id', { type: 'required', message: 'campo requerido' });
        setIsLoading(false);
        return;
      }
    }
    const date = new Date(data.date_purchase);
    const form = {
      type: data.type,
      amount: data.type === 'move' ? data.amount : Math.abs(parseFloat(data.amount)),
      account_id: data.account_id,
      category_id: data.type === 'move' ? data.category_id?.id : user.transfer_id,
      description: data.description,
      event_id: data.type === 'move' ? data.event_id : null,
      account_end_id: data.type === 'move' ? null : data.account_end_id,
      amount_end: data.type === 'move' ? null : (isReadOnly ? data.amount_end : data.amount),
      date_purchase: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
        .getSeconds()
        .toString()
        .padStart(2, '0')}`,
    };
    actCreateMovement(form, onSucces, onError);
  };

  useEffect(() => {
    const onSuccessAccount = (data: ListAccount[]) => {
      setAccounts(
        data
          .filter((v) => !v.deleted_at)
          .map((v) => {
            return { label: v.name + ' - ' + v.currency.code, value: v.id.toString() };
          }),
      );
    };
    const onSuccessEvent = (data: ListEvent[]) => {
      setEvents(
        data.map((v) => {
          return { label: v.name, value: v.id.toString() };
        }),
      );
    };
    const onSuccessCategory = (data: Options[]) => {
      setCategories(data);
    };
    if (!isAuth) {
      navigation.navigate('Welcome');
    }
    if (isFocused && isAuth) {
      actGetListAccount(onSuccessAccount);
      actGetListActiveEvent(onSuccessEvent);
      actGetListFieldCategory(onSuccessCategory);
    }
  }, [isFocused]);

  useEffect(() => {
    const account_init = accounts.filter( v => v.value === watchAccountInitField)
    const account_end = accounts.filter( v => v.value === watchAccountEndField)
    if(account_init[0]?.label?.split(' - ')[1] !== account_end[0]?.label?.split(' - ')[1] && watchAccountEndField !== ''){
      setIsReadOnly(true)
    } else {
      setIsReadOnly(false)
    }
  }, [watchAccountInitField, watchAccountEndField]);

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
    autoCompleteFieldRef,
    accounts,
    events,
    categories,
    watch,
    isReadOnly,
    steps,
    setSteps,
    descriptionText,
  };
};

export default useMovement;
