import {
  View,
  Text,
  Center,
  Pressable,
  Image as ImageNative,
  Modal,
  Button,
  ScrollView,
  Box,
  HStack,
  WarningTwoIcon,
} from 'native-base';
import { Image } from 'react-native'

// Controllers
import useControllers from '../../../../controllers';

// Components
import useLayouts from '../../../layouts';

// Assests
import iconEdit from '../../../../assets/icons/icon-edit.png';
import iconDelete from '../../../../assets/icons/icon-delete.png';
import iconHidden from '../../../../assets/icons/icon-hiden.png';
import iconShow from '../../../../assets/icons/icon-show.png';

const CategoryDetail = () => {
  const { useScreenHooks } = useControllers();
  const { useCategoryDetail } = useScreenHooks();
  const { navigation, subCategories, showModal, setShowModal, onSubmitDelet, route, category, showAllCategories, handleChangeView } =
    useCategoryDetail();

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
          <Pressable onPress={() => setShowModal(true)}>
            <ImageNative source={iconDelete} alt='Editar' w='6' h='6' resizeMode='contain' />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('CategoryCreate', { id: route.params.id })}
            ml='4'
          >
            <ImageNative source={iconEdit} alt='Editar' w='6' h='6' resizeMode='contain' />
          </Pressable>
        </View>
      }
    >
      <Center mb='8'>
        <Text fontSize='xs' fontWeight='300' mt='4' w='80%' textAlign='right' lineHeight='sm'>
          {category?.group?.name}
        </Text>
        <Text fontSize='3xl' fontWeight='600' w='80%' textAlign='center' lineHeight='sm'>
          Categoria{'\n'}
          {category?.name ?? ''}
        </Text>
        <Text fontSize='md' fontWeight='400' w='80%' textAlign='center' lineHeight='sm'>
          {category?.description ?? ''}
        </Text>
      </Center>
      <ScrollView showsVerticalScrollIndicator={false} mb='40px' w='100%'>
        <View>
          {subCategories && subCategories.length > 0 ? (
            subCategories.map((category) => (
              <Pressable
                key={'category' + category.id}
                onPress={() => navigation.navigate('CategoryDetail', { id: category.id })}
              >
                <Box
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
                    <Text fontSize='sm' fontWeight='300' lineHeight='sm'>
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
            ))
          ) : (
            <View>
              <Text fontSize='md' fontWeight='300' lineHeight='sm' textAlign='center'>
                Sin subcategorias.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        _backdrop={{
          _dark: {
            bg: 'coolGray.800',
          },
          bg: 'warmGray.50',
        }}
      >
        <Modal.Content maxWidth='350' maxH='212'>
          <Modal.Header>Confirmacion</Modal.Header>
          <Modal.Body>
            Estas seguro de eliminar esta categoria?
            <Button.Group space={2} mt='6' justifyContent='flex-end'>
              <Button
                variant='ghost'
                colorScheme='blueGray'
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                onPress={() => {
                  onSubmitDelet();
                }}
                colorScheme='danger'
              >
                Eliminar
              </Button>
            </Button.Group>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </PrivateLayout>
  );
};

export default CategoryDetail;
