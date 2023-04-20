import {
  View,
  ScrollView,
  Text,
  Box,
  Pressable,
  AddIcon,
  HStack,
  WarningTwoIcon,
} from 'native-base';
import { Image } from 'react-native'

// Controllers
import useControllers from '../../../controllers';

// Components
import useLayouts from '../../layouts';

// Assets
import iconHidden from '../../../assets/icons/icon-hiden.png';
import iconShow from '../../../assets/icons/icon-show.png';

const Category = () => {
  const { useScreenHooks } = useControllers();
  const { useCategory } = useScreenHooks();
  const { categories, navigation, showAllCategories, handleChangeView } = useCategory();

  const { PrivateLayout } = useLayouts();

  return (
    <PrivateLayout
      showBack
      centerLayout
      otherAction={
        <View flexDirection='row' alignItems='center'>
          <Pressable onPress={() => handleChangeView()}>
            <Image
              source={showAllCategories ? iconShow : iconHidden}
              alt={showAllCategories ? 'Ocultar' : 'Mostrar'}
              resizeMode='contain'
              style={{ height: 24 }}
            />
          </Pressable>
          <Pressable
            bg='tertiary.500'
            rounded='full'
            p='2'
            ml='4'
            onPress={() => navigation.navigate('CategoryCreate')}
          >
            <AddIcon color='white' sixe='lg' />
          </Pressable>
        </View>
      }
    >
      <Text fontSize='3xl' fontWeight='600' mt='4' textAlign='center'>
        Listado de categorias
      </Text>
      <Text fontSize='md' fontWeight='400' mt='4' textAlign='center'>
        las categorias nos ayuda a segmentar los ingresos y los gastos y entender mejor el flujo de
        nuestro dinero
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} mb='40px' w='100%'>
        <View>
          {categories &&
            categories.map((category) => (
              <Pressable
                key={'category' + category.id}
                onPress={() => navigation.navigate('CategoryDetail', { id: category.id })}
              >
                <Box
                  h='100px'
                  bg='contrast'
                  rounded='xl'
                  mt='4'
                  py='3'
                  px='2'
                  borderColor='#344155'
                  borderWidth='1'
                >
                  <HStack justifyContent='space-between'>
                    <Text
                      fontSize='md'
                      fontWeight='600'
                      lineHeight='20'
                      isTruncated
                      noOfLines={2}
                      h='10'
                      w='60%'
                    >
                      {category.name}
                    </Text>
                    <Text fontSize='sm' fontWeight='300' lineHeight='sm' textAlign='right'>
                      {category.group.name}
                    </Text>
                  </HStack>
                  <HStack justifyContent='space-between'>
                    <Text
                      fontSize='md'
                      fontWeight='400'
                      lineHeight='16'
                      isTruncated
                      noOfLines={2}
                      h='10'
                      w='50%'
                    >
                      {category.description}
                    </Text>
                    {category.sub_categories > 0 && (
                      <Text fontSize='sm' fontWeight='300' lineHeight='sm'>
                        <WarningTwoIcon mr='2' color='amber.500' />
                        {category.sub_categories} subcategoria
                        {category.sub_categories > 1 ? 's' : ''}
                      </Text>
                    )}
                  </HStack>
                </Box>
              </Pressable>
            ))}
        </View>
      </ScrollView>
    </PrivateLayout>
  );
};

export default Category;
