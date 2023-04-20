import { Pressable, Text, Box, View, Image } from 'native-base';

import useLayouts from '../../layouts';

// Controllers
import useControllers from '../../../controllers';

const Setting = () => {
  const { PrivateLayout } = useLayouts();

  const { useScreenHooks } = useControllers();
  const { useSetting } = useScreenHooks();
  const { settings, navigation } = useSetting();


  return (
    <PrivateLayout withOutPaddingH>
      <Text fontSize='3xl' fontWeight='600' mt='4' textAlign='center'>
        Configuraciones
      </Text>

    <View bg='contrast' mt='10'>
      {settings.map((item, index) => (
        <Pressable key={item.name} onPress={() => navigation.navigate(item.route)}>
          <Box borderColor='white' py='4' borderBottomWidth={settings.length - 1 > index ? 1 : 0} flexDirection='row'>
            <Image source={item.icon} alt={item.name} resizeMode="contain" w='6' h='6' ml='4'/>
            <Text fontSize='xl' fontWeight='400' px='4'>
              {item.name}
            </Text>
          </Box>
        </Pressable>
      ))}
    </View>

    </PrivateLayout>
  );
};

export default Setting;
