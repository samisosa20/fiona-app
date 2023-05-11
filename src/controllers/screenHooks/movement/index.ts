import { useState, useEffect, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';
import dayjs from 'dayjs'
import { Platform } from 'react-native';

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
  transfer_in: any;
  transfer_out: any;
  event: {
    id: number;
    name: string;
  } | null;
  category: {
    id: number;
    name: string;
  } | null;
  account: {
    id: number;
    name: string;
  } | null;
}

interface ResponseData {
  message: string;
  data: {
    name: string;
    email: string;
  };
}

type RootStackParamList = {
  Movement: {
    id: number;
    account_id: number;
    screen: string;
  };
};

type MovementScreenRouteProp = RouteProp<RootStackParamList, 'Movement'>;

const useMovement = () => {
  const isFocused = useIsFocused();
  const autoCompleteFieldRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [amountFormat, setAmountFormat] = useState('');
  const [auxCategory, setAuxCategory] = useState<Options | null>(null);
  const [steps, setSteps] = useState(1);
  const [accounts, setAccounts] = useState<SelectField[]>([]);
  const [events, setEvents] = useState<SelectField[]>([]);
  const [categories, setCategories] = useState<Options[]>([]);

  // Validators
  const { useValidators } = useHelpers();
  const { movementValidator } = useValidators();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<MovementScreenRouteProp>();

  // Actions
  const { useAccountActions, useEventActions, useCategoryActions, useMovementActions } =
    useActions();
  const { actGetListAccount } = useAccountActions();
  const { actGetListActiveEvent } = useEventActions();
  const { actGetListFieldCategory } = useCategoryActions();
  const { actGetDetailMovement, actCreateMovement, actEditMovement, actDeleteMovement } =
    useMovementActions();

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
    setValue,
    getValues,
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

  const watchAccountInitField = watch('account_id');
  const watchAccountEndField = watch('account_end_id');

  const descriptionText = [
    'Inicia indicando que tipo de movimiento haras, cuanto te ingreso o gastaste y cuando lo hiciste',
    'Ahora indica de a que cuenta te ingreo o salio el dinero y el motivo',
    'Por ultimo agrega una descripcion, comentario u observacion o si pertenece algun evento',
  ];

  const handleDelete = () => {
    setIsLoading(true);
    const onSuccess = (message: string) => {
      setShowModal(false);
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: message,
      });
      if (route?.params?.account_id) {
        navigation.navigate(route?.params?.screen, {id: route.params?.account_id});
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Movement' }],
        });
      }
    };
    const onError = () => {
      setIsLoading(false);
      setShowModal(false);
    };
    actDeleteMovement(route.params.id, onSuccess, onError);
  };

  const onSubmit = (data: Form) => {
    setIsLoading(true);
    const onSucces = (data: ResponseData) => {
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: data.message,
      });
      reset({
        type: 'move',
        amount: '',
        account_id: '0',
        category_id: null,
        description: null,
        date_purchase: new Date(),
        event_id: '',
        account_end_id: '',
        amount_end: '',
      });
      autoCompleteFieldRef.current?.setItem({});
      setSteps(1);
      if (route?.params?.account_id) {
        navigation.navigate(route?.params?.screen, {id: route.params?.account_id});
      }
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
      if (
        isReadOnly &&
        (data.amount_end === null || data.amount_end === undefined || data.amount_end === '')
      ) {
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
      amount_end: data.type === 'move' ? null : isReadOnly ? data.amount_end : data.amount,
      date_purchase: Platform.OS !== 'web' ?  `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
        .getSeconds()
        .toString()
        .padStart(2, '0')}` : dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
    };
    if (route?.params?.id) {
      actEditMovement(route.params.id, form, onSucces, onError);
    } else {
      actCreateMovement(form, onSucces, onError);
    }
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
    const onSuccessMovement = (data: Form) => {
      let daraTransfer, account, amount, account_end_id, amount_end;
      if (data.transfer_in || data.transfer_out) {
        if (data.transfer_out) {
          account = data.transfer_out.account?.id;
          amount = data.transfer_out.amount;
          account_end_id = data.account?.id;
          amount_end = data.amount;
        } else {
          account = data.account?.id;
          amount = data.amount;
          account_end_id = data.transfer_in.account?.id;
          amount_end = data.transfer_in.amount;
        }
        daraTransfer = true;
      }
      reset({
        type: daraTransfer ? 'transfer' : 'move',
        amount: daraTransfer ? amount.toString() : data.amount.toString(),
        account_id: daraTransfer ? account.toString() : data.account?.id.toString(),
        description: data.description,
        date_purchase: new Date(data.date_purchase),
        event_id: data.event ? data.event.id.toString() : null,
        account_end_id: daraTransfer ? account_end_id.toString() : null,
        amount_end: daraTransfer ? amount_end.toString() : null,
        category_id: null,
      });
      setAuxCategory(
        daraTransfer ? null : { id: data.category?.id.toString(), title: data.category?.name },
      );
    };
    if (!isAuth) {
      navigation.navigate('Welcome');
    }
    if (isFocused && isAuth) {
      actGetListAccount(onSuccessAccount);
      actGetListActiveEvent(onSuccessEvent);
      actGetListFieldCategory(onSuccessCategory);

      if (route?.params?.id) {
        actGetDetailMovement(route?.params?.id, onSuccessMovement);
      } else {
        reset();
        if (route?.params?.account_id) {
          setValue('account_id', route?.params?.account_id.toString());
        }
      }
    }
  }, [isFocused]);

  useEffect(()=> {
    if(steps === 2 && route?.params?.id){
      autoCompleteFieldRef.current?.setItem(auxCategory);
    }
  }, [steps])

  useEffect(() => {
    const account_init = accounts.filter((v) => v.value === watchAccountInitField);
    const account_end = accounts.filter((v) => v.value === watchAccountEndField);
    if (
      account_init[0]?.label?.split(' - ')[1] !== account_end[0]?.label?.split(' - ')[1] &&
      watchAccountEndField !== ''
    ) {
      setIsReadOnly(true);
    } else {
      setIsReadOnly(false);
    }
  }, [watchAccountInitField, watchAccountEndField]);

  useEffect(() => {
    const newFormatter = parseFloat(getValues('amount').replace(/[^\d.-]/g, '')).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    setAmountFormat(getValues('amount') === '' ? '' : newFormatter)
  }, [getValues('amount')])

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
    route,
    showModal,
    setShowModal,
    handleDelete,
    amountFormat,
  };
};

export default useMovement;