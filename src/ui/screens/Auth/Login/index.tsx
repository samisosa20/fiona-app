import { Dimensions } from 'react-native';
import { View, Center, Text, Pressable, ArrowBackIcon, Button, HStack } from 'native-base';
import { CommonActions, useNavigation } from '@react-navigation/native';

// Controllers
import useControllers from '../../../../controllers';

// Component
import useComponents from '../../../components';

const Login = () => {
  const navigation = useNavigation();
  var { height } = Dimensions.get('window');

  const { InputControl } = useComponents();

  const { useScreenHooks } = useControllers();
  const { useLogin } = useScreenHooks();
  const { errors, control, handleSubmit, onSubmit, isLoading } = useLogin();

  return (
    <View bg='primary.800' h={height} justifyContent='space-between' py='10'>
      <Pressable onPress={() => navigation.dispatch(CommonActions.goBack())}>
        <ArrowBackIcon color='white' size='md' px='4' />
      </Pressable>
      <Center>
        <Text color='white' fontSize='xl'>
          ¡Que bueno tenerte devuelta!
        </Text>
        <Text color='white' fontSize='lg'>
          Ingresa tus credenciales para continuar.
        </Text>
      </Center>
      <Center w='90%' marginX='auto'>
        <InputControl
          label='Email'
          placeholder='Escribe tu email aqui'
          name='email'
          control={control}
          errors={errors}
        />
        <View w='100%' alignItems='flex-end'>
          <InputControl
            label='Contraseña'
            placeholder='Escribe tu contraseña aqui'
            type='password'
            name='password'
            control={control}
            errors={errors}
          />
          <Pressable onPress={() => navigation.navigate('Forgot')}>
            <Text underline fontWeight='bold' fontSize='xs'>
              ¿Olvidaste tu contraseña?
            </Text>
          </Pressable>
        </View>
      </Center>
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
              Iniciar sesion
            </Button>
          </Center>
          <Center>
            <HStack mt='4' justifyContent='center'>
              <Text color='white' fontSize='sm'>
                Soy un nuevo usuario.{' '}
              </Text>
              <Pressable onPress={() => navigation.navigate('Register')}>
                <Text underline fontWeight='bold'>
                  Registrarme
                </Text>
              </Pressable>
            </HStack>
          </Center>
        </View>
      </Center>
    </View>
  );
};

export default Login;
