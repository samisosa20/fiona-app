import { View, Center, Text, Pressable, ArrowBackIcon, Button, HStack } from 'native-base';
import { CommonActions } from '@react-navigation/native';

// Controllers
import useControllers from '../../../../controllers';

// Component
import useComponents from '../../../components';

const Forgot = () => {

  const { InputControl } = useComponents();

  const { useScreenHooks } = useControllers();
  const { useForgot } = useScreenHooks();
  const { errors, control, handleSubmit, onSubmit, isLoading, height, navigation } = useForgot();

  return (
    <View bg='primary.800' h={height} justifyContent='space-between' py='10'>
      <View>
        <Pressable onPress={() => navigation.dispatch(CommonActions.goBack())}>
          <ArrowBackIcon color='white' size='md' px='4' />
        </Pressable>
        <Center>
          <Text color='white' fontSize='3xl' fontWeight='500' lineHeight='35' mt='3'>
            Sabemos que estas{"\n"}cosas pueden pasar
          </Text>
          <Text color='white' fontSize='md' mt='3' textAlign='center'>
            No te preocupes, solo necesitamos{"\n"}tu correo electronico.
          </Text>
        </Center>
        <Center w='90%' marginX='auto' mt='5'>
          <InputControl
            label='Email'
            placeholder='Escribe tu email aqui'
            name='email'
            control={control}
            errors={errors}
          />
        </Center>
      </View>
      <Center>
        <View flexDirection='column' w='90%' borderRadius='10'>
          <Center w='100%' borderRadius='10' bg='white'>
            <Button
              isLoading={isLoading}
              isLoadingText='enviando'
              onPress={handleSubmit(onSubmit)}
              variant='ghost'
              w='100%'
            >
              Restablecer contraseña
            </Button>
          </Center>
        </View>
      </Center>
    </View>
  );
};

export default Forgot;
