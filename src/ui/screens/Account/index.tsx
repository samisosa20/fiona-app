import { View, Center, Text, Pressable, Image } from 'native-base';

// Controllers
import useControllers from '../../../controllers';

const Account = () => {
  const { useScreenHooks } = useControllers();
  const { useForgot } = useScreenHooks();
  const { errors, control, handleSubmit, onSubmit, isLoading, height, navigation } = useForgot();

  return <View bg='primary.800' h={height} justifyContent='space-between' py='10'>

  </View>;
};

export default Account;
