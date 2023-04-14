import { View, Center, Text, Pressable, ArrowBackIcon, Button, HStack } from 'native-base';
import { CommonActions } from '@react-navigation/native';

// Controllers
import useControllers from '../../../../controllers';

// Component
import useComponents from '../../../components';

const Login = () => {
  const { InputControl } = useComponents();

  const { useScreenHooks } = useControllers();
  const { useLogin } = useScreenHooks();
  const { errors, control, handleSubmit, onSubmit, isLoading, navigation, height } = useLogin();

  return (
    <View bg='primary.800' h={height} justifyContent='space-between' py='10'>
      <View>
        <Pressable onPress={() => navigation.dispatch(CommonActions.goBack())}>
          <ArrowBackIcon color='white' size='md' px='4' />
        </Pressable>
        <Center>
          <Text color='white' fontSize='3xl' fontWeight='500' mt='4'>
            ¡Bienvenido!
          </Text>
          <Text color='white' fontSize='md'>
            Ingresa tus credenciales para continuar.
          </Text>
        </Center>
        <Center w='90%' marginX='auto' mt='8'>
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
