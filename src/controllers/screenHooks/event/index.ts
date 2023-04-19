import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";

// Selectors
import useSelectors from '../../../models/selectors';

// Services
import useApi from '../../../api';

// Interfaces
import { ListEvent } from '../../../ui/components/Carousel/Carousel.interface';


const useEvent = () => {
  const isFocused = useIsFocused();
  const [events, setEvents] = useState<ListEvent[]>([]);
  const { height } = Dimensions.get('window');


  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { useAuthSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const isAuth = loggedSelector();

  const { useActions } = useApi();
  const { useEventActions } = useActions();
  const { actGetListEvent } = useEventActions();


  useEffect(() => {
    const onSuccess = (data: ListEvent[]) => {
      setEvents(data);
    };

    if (!isAuth) {
      navigation.navigate('Welcome');
    }
    
    if (isAuth && isFocused) {
        actGetListEvent(onSuccess);
    }
  }, [isFocused]);

  return {
    height,
    events,
    navigation,
  };
};

export default useEvent;
