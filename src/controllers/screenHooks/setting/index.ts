import { useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

// Selectors
import useSelectors from '../../../models/selectors';

// Services
import useApi from '../../../api';


// Assets
import iconCategory from '../../../assets/icons/icon-category.png'
import iconTicket from '../../../assets/icons/icon-ticket.png'

const useSetting = () => {
  const isFocused = useIsFocused();


  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { useAuthSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const isAuth = loggedSelector();



  const settings = [
    {
      name: 'Categorias',
      route: 'Category',
      icon: iconCategory,
    },
    {
      name: 'Pagos programados',
      route: 'Payment',
      icon: iconTicket,
    },
  ];

  useEffect(() => {
    /* const onSuccess = (data: ListAccount[]) => {
      setAccounts(data.filter((v) => !v.deleted_at));
    }; */

    if (!isAuth) {
      navigation.navigate('Welcome');
    }

    if (isAuth && isFocused) {
      //actGetListAccount(onSuccess);
    }
  }, [isFocused]);

  return {
    navigation,
    settings,
  };
};

export default useSetting;
