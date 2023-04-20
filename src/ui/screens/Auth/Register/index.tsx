import { View, Center, Text, Pressable, ArrowBackIcon, Button, HStack } from 'native-base';
import { CommonActions } from '@react-navigation/native';

// Controllers
import useControllers from '../../../../controllers';

// Component
import useComponents from '../../../components';

const Register = () => {

  const { InputControl } = useComponents();

  const { useScreenHooks } = useControllers();
  const { useRegister } = useScreenHooks();
  const { errors, control, handleSubmit, onSubmit, isLoading, height, navigation } = useRegister();

  return (
    <View bg='primary.800' h={height} justifyContent='space-between' py='10'>
      <View>
        <Pressable onPress={() => navigation.dispatch(CommonActions.goBack())} pl='4' mt='2'>
          <ArrowBackIcon color='white' size='md' px='4' />
        </Pressable>
        <Center>
          <Text color='white' fontSize='3xl' fontWeight='500' mt='4'>
            ¡Bienvenido!
          </Text>
          <Text color='white' fontSize='md'>
            Estas a un paso de cambiar tu vida.
          </Text>
        </Center>
        <Center w='90%' marginX='auto' mt='8'>
          <InputControl
            label='Nombre'
            placeholder='Escribe tu nombre aqui'
            name='name'
            control={control}
            errors={errors}
          />
          <InputControl
            label='Email'
            placeholder='Escribe tu email aqui'
            name='email'
            control={control}
            errors={errors}
          />
          <InputControl
            label='Contraseña'
            placeholder='Escribe tu contraseña aqui'
            type='password'
            name='password'
            control={control}
            errors={errors}
          />
          <InputControl
            label='Confirma tu contraseña'
            placeholder='Confirma tu contraseña aqui'
            type='password'
            name='passwordConfirmation'
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
              Registrarme
            </Button>
          </Center>
          <Center>
            <HStack mt='4' justifyContent='center'>
              <Text color='white' fontSize='sm'>
                Ya tengo una cuenta.{' '}
              </Text>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text underline fontWeight='bold'>
                  Iniciar sesion
                </Text>
              </Pressable>
            </HStack>
          </Center>
        </View>
      </Center>
    </View>
  );
};

export default Register;
