import { View, Text, Box, Center, Pressable, ArrowDownIcon, ArrowUpIcon, Image } from 'native-base';

// Controllers
import useControllers from '../../../../controllers';

// Components
import useComponents from '../../../components';
import useLayouts from '../../../layouts';

// Helper
import useHelpers from '../../../../helpers';

// Assests
import iconEdit from '../../../../assets/icons/icon-edit.png';

const AccountDetail = () => {
  const { useScreenHooks } = useControllers();
  const { useAccountDetail } = useScreenHooks();
  const { navigation, account, movements } = useAccountDetail();

  const { useQuickFunctions } = useHelpers();
  const { currencyFormat } = useQuickFunctions();

  const { ListMovements } = useComponents();

  const { PrivateLayout } = useLayouts();

  return (
    <PrivateLayout
      withOutPaddingH
      showBack
      otherAction={
        <Pressable onPress={() => navigation.navigate('AccountCreate', { id: account?.id })}>
          <Image source={iconEdit} alt='Editar' w='6' h='6' resizeMode='contain' />
        </Pressable>
      }
    >
      <Center>
        <Text fontSize='xs' fontWeight='300' mt='4' w='80%' textAlign='right' lineHeight='sm'>
          {account?.type}
        </Text>
        <Text fontSize='3xl' fontWeight='600' w='80%' textAlign='center' lineHeight='sm'>
          {account?.name}
        </Text>
        <Text fontSize='lg' fontWeight='400' mt='2' w='80%' textAlign='center' lineHeight='sm'>
          {account?.description}
        </Text>
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
              {currencyFormat(account?.incomes ?? 0) + ' ' + account?.currency.code}
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
              {currencyFormat(account?.expensives ?? 0) + ' ' + account?.currency.code}
            </Text>
          </View>
        </View>
      </Center>
      <ListMovements movements={movements} />
    </PrivateLayout>
  );
};

export default AccountDetail;
