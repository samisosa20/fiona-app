import { Dimensions } from 'react-native';
import { View, Center, Text, Pressable, Image } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import imgHome from '../../../../assets/img/img-login.png';

const Home = () => {
  const navigation = useNavigation();
  const { height } = Dimensions.get('window');

  return (
    <View bg='primary.800' h={height} justifyContent='space-between' py='10'>
      <Center>
        <Image source={imgHome} alt='login' w='300' h='300' />
      </Center>
      <Center>
        <Text color='white' fontSize='xl'>
          Fiona App.
        </Text>
        <Text color='white' fontSize='lg'>
          Manejo de finanzas personales
        </Text>
      </Center>
      <Center>
        <View bg='primary.500' flexDirection='row' h='39' w='90%' borderRadius='10'>
          <Center w='50%' bg='white' borderRadius='10'>
            <Pressable>
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

export default Home;
