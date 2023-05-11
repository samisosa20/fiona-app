import { View, Text, Center, Pressable, Image, Modal, Button } from 'native-base';

// Controllers
import useControllers from '../../../../controllers';

// Components
import useComponents from '../../../components';
import useLayouts from '../../../layouts';

// Assests
import iconEdit from '../../../../assets/icons/icon-edit.png';
import iconDelete from '../../../../assets/icons/icon-delete.png';

const EventDetail = () => {
  const { useScreenHooks } = useControllers();
  const { useEventDetail } = useScreenHooks();
  const { navigation, event, showModal, setShowModal, onSubmitDelet } = useEventDetail();

  const { ListMovements } = useComponents();

  const { PrivateLayout } = useLayouts();

  return (
    <PrivateLayout
      showBack
      withOutPaddingH
      otherAction={
        <View flexDirection='row' alignItems='center'>
          <Pressable onPress={() => setShowModal(true)}>
            <Image source={iconDelete} alt='Editar' w='6' h='6' resizeMode='contain' />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('EventCreate', { id: event?.id })} ml='4'>
            <Image source={iconEdit} alt='Editar' w='6' h='6' resizeMode='contain' />
          </Pressable>
        </View>
      }
    >
      <Center mb='8'>
        <Text fontSize='xs' fontWeight='300' mt='4' w='80%' textAlign='right' lineHeight='sm'>
          Fecha fin: {event?.end_event}
        </Text>
        <Text fontSize='3xl' fontWeight='600' w='80%' textAlign='center' lineHeight='sm'>
          {event?.name}
        </Text>
      </Center>
      <ListMovements movements={event?.movements} pageName='EventDetail' />
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
            Estas seguro de eliminar este evento?
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

export default EventDetail;