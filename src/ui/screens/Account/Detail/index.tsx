import { View, Text, ArrowBackIcon, Box, Center, Pressable, Image } from 'native-base';
import { CommonActions } from '@react-navigation/native';

// Controllers
import useControllers from '../../../../controllers';

// Components
import useComponents from "../../../components";

// Helper
import useHelpers from '../../../../helpers';

// Assests
import iconArrow from '../../../../assets/icons/icon-arrow-white.png';

const Account = () => {
  const { useScreenHooks } = useControllers();
  const { useAccountDetail } = useScreenHooks();
  const { height, navigation, account, movements } = useAccountDetail();

  const { useQuickFunctions } = useHelpers();
  const { currencyFormat } = useQuickFunctions();

  const { ListMovements } = useComponents()

  return (
    <View bg='bg' h={height} pt='10'>
      <Pressable onPress={() => navigation.dispatch(CommonActions.goBack())} pl='4'>
        <ArrowBackIcon color='white' size='md' px='4' />
      </Pressable>
      <Center>
        <Text fontSize='xs' fontWeight='300' mt='4' w='80%' textAlign='right' lineHeight='sm'>
          {account.type}
        </Text>
        <Text fontSize='3xl' fontWeight='600' w='80%' textAlign='center' lineHeight='sm'>
          {account.name}
        </Text>
        <Text fontSize='lg' fontWeight='400' mt='2' w='80%' textAlign='center' lineHeight='sm'>
          {account.description}
        </Text>
        <View flexDirection='row' alignItems='center' my='8'>
          <View justifyContent='center' alignItems='center'>
            <Box
              w='40px'
              h='40px'
              bg='tertiary.700'
              rounded='lg'
              justifyContent='center'
              alignItems='center'
            >
              <Image source={iconArrow} alt='Incomes' />
            </Box>
            <Text fontSize='md' fontWeight='500' textAlign='center' lineHeight='sm' mt='1'>
              {currencyFormat(account.incomes) + ' ' + account.badge.code}
            </Text>
          </View>
          <View justifyContent='center' alignItems='center' ml='8'>
            <Box
              w='40px'
              h='40px'
              bg='danger.700'
              rounded='lg'
              justifyContent='center'
              alignItems='center'
            >
              <Image
                source={iconArrow}
                alt='Expensives'
                style={{ transform: [{ rotate: '180deg' }] }}
              />
            </Box>
            <Text fontSize='md' fontWeight='500' textAlign='center' lineHeight='sm' mt='1'>
              {currencyFormat(account.expensives) + ' ' + account.badge.code}
            </Text>
          </View>
        </View>
      </Center>
     <ListMovements movements={movements} />
    </View>
  );
};

export default Account;
