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

// Interfaces
import { ListEvent } from '../../../../ui/components/Carousel/Carousel.interface';

type RootStackParamList = {
  AccountDetail: {
    id: number;
  };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'AccountDetail'>;

const useEventDetail = () => {
  const isFocused = useIsFocused();
  const [event, setEvent] = useState<ListEvent>();
  const [showModal, setShowModal] = useState(false);
  const { height } = Dimensions.get('window');

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<ProfileScreenRouteProp>();

  const { useAuthSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const isAuth = loggedSelector();

  const { useActions } = useApi();
  const { useEventActions } = useActions();
  const { actGetDetailEvent, actDeleteEvent } = useEventActions();


  const onSubmitDelet = () => {
    setShowModal(false)
    const onSuccess = (message: string) => {
      Toast.show({
        type: 'success',
        text1: message,
      });
      navigation.dispatch(CommonActions.goBack());
    }
    actDeleteEvent(route.params.id, onSuccess);
  }

  useEffect(() => {
    const onSuccess = (data: ListEvent) => {
      setEvent(data);
    };

    if (!isAuth) {
      navigation.navigate('Welcome');
    }

    if (isAuth && isFocused) {
      actGetDetailEvent(route.params.id, onSuccess);
    }
  }, [isFocused]);

  return {
    height,
    navigation,
    event,
    showModal,
    setShowModal,
    onSubmitDelet,
  };
};

export default useEventDetail;
