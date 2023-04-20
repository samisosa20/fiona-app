import { useState, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { CommonActions } from '@react-navigation/native';

// Selectors
import useSelectors from '../../../../models/selectors';

// Services
import useApi from '../../../../api';


type RootStackParamList = {
  CategoryDetail: {
    id: number;
  };
};

// Interfaces
interface Category {
  id: number;
  name: string;
  description: string | null;
  group: {
    id: number;
    name: string;
  }
  sub_categories: number;
  category_father: {
    id: number;
    name: string;
  } | null;
  deleted_at: string | null;
}

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'CategoryDetail'>;

const useCategoryDetail = () => {
  const isFocused = useIsFocused();
  const [subCategories, setSubCategories] = useState<Category[]>();
  const [realCategory, setRealCategory] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category>();
  const [showModal, setShowModal] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<ProfileScreenRouteProp>();

  const { useAuthSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const isAuth = loggedSelector();

  const { useActions } = useApi();
  const { useCategoryActions } = useActions();
  const { actGetListCategory, actDeleteCategory, actGetDetailCategory } = useCategoryActions();

  const handleChangeView = () => {
    if (!showAllCategories) {
      setSubCategories(realCategory)
    } else {
      setSubCategories(realCategory.filter(v => !v.deleted_at));
    }
    setShowAllCategories(!showAllCategories);
  }

  const onSubmitDelet = () => {
    setShowModal(false);
    const onSuccess = (message: string) => {
      Toast.show({
        type: 'success',
        text1: message,
      });
      navigation.dispatch(CommonActions.goBack());
    };
    actDeleteCategory(route.params.id, onSuccess);
  };

  useEffect(() => {
    const onSuccess = (data: Category[]) => {
      setSubCategories(data.filter(v => !v.deleted_at));
      setRealCategory(data)
    };
    const onSuccessDetail = (data: Category) => {
      setCategory(data);
    };

    if (!isAuth) {
      navigation.navigate('Welcome');
    }

    if (isAuth && isFocused) {
      actGetListCategory({category_father: route.params.id}, onSuccess);
      actGetDetailCategory(route.params.id, onSuccessDetail);
    }
  }, [isFocused, route.params.id]);

  return {
    navigation,
    subCategories,
    showModal,
    setShowModal,
    onSubmitDelet,
    route,
    category,
    showAllCategories,
    handleChangeView,
  };
};

export default useCategoryDetail;
