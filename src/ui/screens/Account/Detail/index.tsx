import {
  View,
  Text,
  Box,
  Center,
  Pressable,
  ArrowDownIcon,
  ArrowUpIcon,
  Image,
  Input,
  Modal,
  Button,
} from 'native-base';

// Controllers
import useControllers from '../../../../controllers';

// Components
import useComponents from '../../../components';
import useLayouts from '../../../layouts';

// Helper
import useHelpers from '../../../../helpers';

// Assests
import iconEdit from '../../../../assets/icons/icon-edit.png';
import iconFilter from '../../../../assets/icons/icon-filter.png';

const AccountDetail = () => {
  const { useScreenHooks } = useControllers();
  const { useAccountDetail } = useScreenHooks();
  const {
    navigation,
    account,
    listTime,
    handleChangeTime,
    balanceTime,
    handleFilter,
    movementsFilter,
    setShowModal,
    showModal,
    isLoading,
    handleChane,
  } = useAccountDetail();

  const { useQuickFunctions } = useHelpers();
  const { currencyFormat } = useQuickFunctions();

  const { ListMovements } = useComponents();

  const { PrivateLayout } = useLayouts();

  return (
    <PrivateLayout
      withOutPaddingH
      showBack
      otherAction={
        <View flexDirection='row' alignItems='center'>
          <Pressable onPress={() => setShowModal(true)} ml='auto'>
            <Image source={iconFilter} alt='Filtrar' w='6' h='6' resizeMode='contain' />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('AccountCreate', { id: account?.id })}>
            <Image source={iconEdit} alt='Editar' w='6' h='6' resizeMode='contain' />
          </Pressable>
        </View>
      }
    >
      <Center>
        <Text fontSize='xs' fontWeight='300' mt='4' w='80%' textAlign='right' lineHeight='sm'>
          {account?.type + ' - ' + account?.currency.code}
        </Text>
        <Text fontSize='3xl' fontWeight='600' w='80%' textAlign='center' lineHeight='sm'>
          {account?.name}
        </Text>
        <Text fontSize='lg' fontWeight='400' mt='2' w='80%' textAlign='center' lineHeight='sm'>
          {account?.description}
        </Text>
        <View flexDirection='row' alignItems='center' justifyContent='space-between' mt='4' w='257'>
          {listTime.map((v) => (
            <Pressable key={v.id} onPress={() => handleChangeTime(v.id)}>
              <Text
                borderColor={balanceTime === v.id ? 'yellow.300' : 'white'}
                borderWidth='1'
                rounded='20'
                py='2'
                px='5'
                color={balanceTime === v.id ? 'yellow.300' : 'white'}
                key={v.id}
              >
                {v.name}
              </Text>
            </Pressable>
          ))}
        </View>
        <View flexDirection='row' alignItems='center' my='8'>
          <View justifyContent='center' alignItems='center'>
            <Box
              w='40px'
              h='40px'
              bg='tertiary.600'
              rounded='lg'
              justifyContent='center'
              alignItems='center'
            >
              <ArrowDownIcon color='white' size='md' px='4' />
            </Box>
            <Text fontSize='md' fontWeight='500' textAlign='center' lineHeight='sm' mt='1'>
              {account ? currencyFormat(account[balanceTime]?.incomes ?? 0) : null}
            </Text>
          </View>
          <View justifyContent='center' alignItems='center' ml='8'>
            <Box
              w='40px'
              h='40px'
              bg='danger.600'
              rounded='lg'
              justifyContent='center'
              alignItems='center'
            >
              <ArrowUpIcon color='white' size='md' px='4' />
            </Box>
            <Text fontSize='md' fontWeight='500' textAlign='center' lineHeight='sm' mt='1'>
              {account ? currencyFormat(account[balanceTime]?.expensives ?? 0) : null}
            </Text>
          </View>
        </View>
      </Center>
      <ListMovements movements={movementsFilter} />
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size='xl'
        _backdrop={{
          _dark: {
            bg: 'coolGray.800',
          },
          bg: 'warmGray.50',
        }}
      >
        <Modal.Content maxWidth='350'>
          <Modal.Header>Filtros</Modal.Header>
          <Modal.Body>
            <Input
              placeholder='Buscador'
              maxW='200'
              mb='4'
              mx='auto'
              onChangeText={(v) => handleChane(v)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
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
                isLoading={isLoading}
                isLoadingText='enviando'
                onPress={handleFilter}
                colorScheme='success'
              >
                Buscar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </PrivateLayout>
  );
};

export default AccountDetail;
