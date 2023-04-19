import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
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

interface Heritage {
  id: number;
  name: string;
  comercial_amount: number;
  legal_amount: number;
  currency: {
    code: string;
  };
  year: number;
}

type RootStackParamList = {
  HeritageDetail: {
    year: number;
  };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'HeritageDetail'>;

const useHeritageDetail = () => {
  const isFocused = useIsFocused();
  const [heritage, setHeritage] = useState<Heritage[]>();
  const { height } = Dimensions.get('window');

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<ProfileScreenRouteProp>();

  const { useAuthSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const isAuth = loggedSelector();

  const { useActions } = useApi();
  const { useHeritageActions } = useActions();
  const { actGetListHeritage } = useHeritageActions();


  useEffect(() => {
    const onSuccess = (data: Heritage[]) => {
      setHeritage(data);
    };

    if (!isAuth) {
      navigation.navigate('Welcome');
    }

    if (isAuth && isFocused) {
      actGetListHeritage(route.params.year, onSuccess);
    }
  }, [isFocused]);

  return {
    height,
    navigation,
    heritage,
    route,
  };
};

export default useHeritageDetail;
