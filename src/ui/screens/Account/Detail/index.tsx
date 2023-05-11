import {
  View,
  Text,
  Box,
  Center,
  Pressable,
  AddIcon,
  HStack,
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
      params={{
        screen: 'Account'
      }}
      otherAction={
        <View flexDirection='row' alignItems='center'>
          <Pressable onPress={() => setShowModal(true)} ml='auto'>
            <Image source={iconFilter} alt='Filtrar' w='6' h='6' resizeMode='contain' />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('AccountCreate', { id: account?.id })}
            ml='4'
          >
            <Image source={iconEdit} alt='Editar' w='6' h='6' resizeMode='contain' />
          </Pressable>
          <Pressable
            bg='tertiary.500'
            rounded='full'
            p='2'
            ml='4'
            onPress={() => navigation.navigate('Movement', { account_id: account?.id, screen: 'AccountDetail'})}
          >
            <AddIcon color='white' sixe='lg' />
          </Pressable>
        </View>
      }
    >
      <Center mb='6'>
        <Text fontSize='xs' fontWeight='300' mt='4' w='80%' textAlign='right' lineHeight='sm'>
          {account?.type + ' - ' + account?.currency.code}
        </Text>
        <Text fontSize='3xl' fontWeight='600' w='80%' textAlign='center' lineHeight='sm'>
          {account?.name}
        </Text>
        <Text fontSize='lg' fontWeight='400' mt='2' w='80%' textAlign='center' lineHeight='sm'>
          {account?.description}
        </Text>
        <Box
          h='122px'
          w='257'
          bg={{
            linearGradient: {
              colors: ['lightBlue.300', 'violet.800'],
              start: [0, 0],
              end: [1, 1],
            },
          }}
          rounded='xl'
          mr='3'
          py='3'
          px='2'
          borderColor='#344155'
          borderWidth='1'
          justifyContent='space-around'
        >
            <HStack justifyContent='space-between' alignItems='center'>
              <Text fontSize='lg' fontWeight='600'>
                Ingresos
              </Text>
              <Text fontSize='sm' fontWeight='600' textAlign='right'>
                {account
                  ? '...............'.substring(
                      0,
                      15 - currencyFormat(account[balanceTime]?.incomes ?? 0).length - 1,
                    ) + currencyFormat(account[balanceTime]?.incomes ?? 0)
                  : null}
              </Text>
            </HStack>
            <HStack justifyContent='space-between' alignItems='center'>
              <Text fontSize='lg' fontWeight='600'>
                Egresos
              </Text>
              <Text fontSize='sm' fontWeight='600' textAlign='right'>
                {account
                  ? '...............'.substring(
                      0,
                      15 - currencyFormat(account[balanceTime]?.expensives ?? 0).length - 1,
                    ) + currencyFormat(account[balanceTime]?.expensives ?? 0)
                  : null}
              </Text>
            </HStack>
            <HStack justifyContent='space-between' alignItems='center'>
              <Text fontSize='lg' fontWeight='600'>
                Utilidad
              </Text>
              <Text fontSize='sm' fontWeight='600' textAlign='right'>
                {'...............'.substring(0, 15 - currencyFormat(account?.balance?.filter(v => v.type === balanceTime)[0].balance ?? 0).length - 1) +
                  currencyFormat(account?.balance?.filter(v => v.type === balanceTime)[0].balance ?? 0)}
              </Text>
            </HStack>
        </Box>
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
      </Center>
      <ListMovements movements={movementsFilter} pageName='AccountDetail' />
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