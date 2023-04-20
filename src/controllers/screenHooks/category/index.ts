import { useState, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

// Selectors
import useSelectors from '../../../models/selectors';

// Services
import useApi from '../../../api';

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
  deleted_at: string | null;
}

const useCategory = () => {
  const isFocused = useIsFocused();
  const [categories, setCategories] = useState<Category[]>([]);
  const [realCategory, setRealCategory] = useState<Category[]>([]);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { useAuthSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const isAuth = loggedSelector();

  const { useActions } = useApi();
  const { useCategoryActions } = useActions();
  const { actGetListCategory } = useCategoryActions();

  const handleChangeView = () => {
    if (!showAllCategories) {
      setCategories(realCategory)
    } else {
      setCategories(realCategory.filter(v => !v.deleted_at));
    }
    setShowAllCategories(!showAllCategories);
  }

  useEffect(() => {
    const onSuccess = (data: Category[]) => {
      setRealCategory(data)
      setCategories(data.filter(v => !v.deleted_at));
    };

    if (!isAuth) {
      navigation.navigate('Welcome');
    }

    if (isAuth && isFocused) {
      actGetListCategory(undefined, onSuccess);
    }
  }, [isFocused]);

  return {
    categories,
    navigation,
    showAllCategories,
    handleChangeView,
  };
};

export default useCategory;
