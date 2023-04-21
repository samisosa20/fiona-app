import { useState, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

// Selectors
import useSelectors from '../../../models/selectors';

// Services
import useApi from '../../../api';

// Interfaces
interface Payment {
  id: number;
  name: string;
  description: string | null;
  account: {
    id: number;
    name: string;
    currency: {
        id: number;
        code: string;
    }
  };
  category: {
    id: number;
    name: string;
  };
  amount: number;
  specific_day: number;
}

const usePayment = () => {
  const isFocused = useIsFocused();
  const [payments, setPayments] = useState<Payment[]>([]);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { useAuthSelectors } = useSelectors();
  const { loggedSelector } = useAuthSelectors();
  const isAuth = loggedSelector();

  const { useActions } = useApi();
  const { usePaymentActions } = useActions();
  const { actGetListPayment } = usePaymentActions();

  useEffect(() => {
    const onSuccess = (data: Payment[]) => {

      setPayments(data);
    };

    if (!isAuth) {
      navigation.navigate('Welcome');
    }

    if (isAuth && isFocused) {
        actGetListPayment(onSuccess);
    }
  }, [isFocused]);

  return {
    payments,
    navigation,
  };
};

export default usePayment;
