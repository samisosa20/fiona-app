import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';

// Actions
import useActions from '../../../../api/actions';

// Selector
import useSelectors from '../../../../models/selectors';

const useWelcome = () => {
  const { height } = Dimensions.get('window');

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // Actions
  const { dispatch, useGeneralActions } = useActions();
  const { actGeneral } = useGeneralActions();

  const { useAuthSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const isLogin = loggedSelector();

  useEffect(() => {
    dispatch(actGeneral());
    if(isLogin) {
        navigation.navigate('Dashboard');
      }
  }, []);

  return {
    navigation,
    height,
  };
};

export default useWelcome;