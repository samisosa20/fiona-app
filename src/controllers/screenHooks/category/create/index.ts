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

import {Options} from '../../../../ui/components/AutocompleteControl/AutocompleteControl.interface'

interface Form {
  name: string;
  description: string | null;
  group_id: string | null;
  category_id: {
    id: string;
    name: string;
  } | null;
  category_father?: {
    id: number;
    name: string;
  } | undefined | null
}



type RootStackParamList = {
  EventDetail: {
    id: number;
  };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;

const useCategoryCreate = () => {
  const autoCompleteFieldRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('Creacion de categoria');
  const [titleButton, setTitleButton] = useState('Crear');
  const [listGroup, setListGroup] = useState([]);
  const [listFieldCategory, setListFieldCategory] = useState<Options[]>([]);

  // Validators
  const { useValidators } = useHelpers();
  const { categoryValidator } = useValidators();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<ProfileScreenRouteProp>();

  const { useAuthSelectors, useGeneralSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const { groupSelector } = useGeneralSelectors();
  const isAuth = loggedSelector();
  const group = groupSelector();


  const { useActions } = useApi();
  const { useCategoryActions } = useActions();
  const {
    actCreateCategory,
    actGetDetailCategory,
    actEditCategory,
    actGetListFieldCategory,
  } = useCategoryActions();


  // Form State
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      description: null,
      group_id: null,
      category_id: null,
    },
    resolver: yupResolver(categoryValidator),
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
      description: data.description,
      group_id: data.group_id,
      category_id: data.category_id?.id,
    }

    if (route?.params?.id) {
      actEditCategory(route?.params?.id, form, onSuccess);
    } else {
      actCreateCategory(form, onSuccess);
    }
  };

  useEffect(() => {
    const onSuccess = (data: Form) => {
      reset(data);
      autoCompleteFieldRef.current?.setItem({id: data.category_father?.id, title: data.category_father?.name})
    };

    const onSeccesField = (data: Options[]) => {
      setListFieldCategory(data)
    }

    if (isAuth) {
      actGetListFieldCategory(onSeccesField)
      if (route?.params?.id) {
        setTitle('Edicion de categoria');
        setTitleButton('Editar');
        actGetDetailCategory(route?.params?.id, onSuccess);
      }
    } else {
      navigation.navigate('Welcome');
    }
  }, []);

  useEffect(() => {
    setListGroup(
      group?.map((v: { name: string; id: number }) => {
        return { label: v.name, value: v.id };
      })
    );
  }, [group]);

  return {
    title,
    control,
    errors,
    handleSubmit,
    onSubmit,
    isLoading,
    titleButton,
    listGroup,
    listFieldCategory,
    autoCompleteFieldRef,
  };
};

export default useCategoryCreate;
