import { Text, View, Center, Divider, Image, Button, Pressable } from 'native-base';

// Controllers
import useControllers from '../../../controllers';

// Components
import useLayouts from '../../layouts';
import useComponents from '../../components';

// Assests
import iconLogOut from '../../../assets/icons/icon-logout.png'

const Profile = () => {
  const { PrivateLayout } = useLayouts();
  const { InputControl } = useComponents();

  const { useScreenHooks } = useControllers();
  const { useProfile } = useScreenHooks();
  const { control, errors, handleLogout, handleSubmit, onSubmit, isLoading } = useProfile();

  return (
    <PrivateLayout
      centerLayout
      pb='100px'
      otherAction={
        <Pressable onPress={() => handleLogout()} ml='auto'>
          <Image source={iconLogOut} alt='Editar' w='6' h='6' resizeMode='contain' />
        </Pressable>
      }
    >
      <View>
        <Text fontSize='3xl' fontWeight='600' mt='4' textAlign='center'>
          Perfil
        </Text>
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
          <Divider mb='8' mt='4'/>
          <Text mb='4'>
            Cambia tu contraseña cuando quieras
          </Text>
          <InputControl
            label='Contraseña'
            placeholder='Escribe tu contraseña aqui'
            type='password'
            name='password'
            control={control}
            errors={errors}
          />
          <InputControl
            label='Confirma la contraseña'
            placeholder='Confirma tu contraseña aqui'
            type='password'
            name='passwordConfirmation'
            control={control}
            errors={errors}
          />
        </Center>
      </View>
      <View w='100%' borderRadius='10' bg='white' mt='auto'>
        <Button
          isLoading={isLoading}
          isLoadingText='enviando'
          onPress={handleSubmit(onSubmit)}
          variant='ghost'
          w='100%'
        >
          Actualizar
        </Button>
      </View>
    </PrivateLayout>
  );
};

export default Profile;
