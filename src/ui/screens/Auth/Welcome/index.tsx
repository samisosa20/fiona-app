import { View, Center, Text, Pressable, Image } from 'native-base';

import imgHome from '../../../../assets/img/img-login.png';

// Controllers
import useControllers from '../../../../controllers';

const Welcome = () => {
  const { useScreenHooks } = useControllers();
  const { useWelcome } = useScreenHooks();
  const {height, navigation } = useWelcome();

  return (
    <View bg='primary.800' h={height} justifyContent='space-between' py='10'>
      <View>
        <Center>
          <Image source={imgHome} alt='login' w='300' h='300' />
        </Center>
        <Center>
          <Text color='white' fontSize='4xl' fontWeight='600' textTransform='uppercase'>
            Fiona App.
          </Text>
          <Text color='white' fontSize='lg' fontWeight='500'>
            Manejo de finanzas personales
          </Text>
        </Center>
      </View>
      <Center>
        <View bg='primary.500' flexDirection='row' h='45px' w='90%' borderRadius='10' maxW='750px'>
          <Center w='50%' bg='white' borderRadius='10'>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text color='#19181f'>Registro</Text>
            </Pressable>
          </Center>
          <Center w='50%' borderRadius='10'>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text color='white'>Inicio Sesion</Text>
            </Pressable>
          </Center>
        </View>
      </Center>
    </View>
  );
};

export default Welcome;
