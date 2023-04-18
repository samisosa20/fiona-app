import { View, ScrollView, Text, ArrowBackIcon, Box, Center, Pressable } from 'native-base';
import { CommonActions } from '@react-navigation/native';

// Controllers
import useControllers from '../../../controllers';

// Helper
import useHelpers from '../../../helpers';

const Account = () => {
  const { useScreenHooks } = useControllers();
  const { useAccount } = useScreenHooks();
  const { height, accounts, navigation, handleChangeTime, balanceTime, listTime } = useAccount();

  const { useQuickFunctions } = useHelpers();
  const { currencyFormat } = useQuickFunctions();

  return (
    <View bg='bg' h={height} py='10' px='4'>
      <Pressable onPress={() => navigation.dispatch(CommonActions.goBack())}>
        <ArrowBackIcon color='white' size='md' px='4' />
      </Pressable>
      <Text fontSize='3xl' fontWeight='600' mt='4'>
        Listado de cuentas
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} mb='40px'>
        <Center mt='8'>
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
            justifyContent='space-between'
          >
            <Text fontSize='md' fontWeight='600'>
              Balance
            </Text>
            <Text fontSize='lg' fontWeight='600' textAlign='right'>
              {currencyFormat(accounts.reduce((prev: number, curr) => prev + curr.balance + curr.init_amount, 0)) +
                ' ' +
                'COP'}
            </Text>
          </Box>
          <View
            flexDirection='row'
            alignItems='center'
            justifyContent='space-between'
            mt='4'
            w='257'
          >
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
        <View
          flexWrap='wrap'
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
        >
          {accounts &&
            accounts.map((account) => (
              <Pressable key={'account' + account.id} onPress={() => navigation.navigate('AccountDetail', {id: account.id})}>
                <Box
                  h='100px'
                  w='190'
                  bg='contrast'
                  rounded='xl'
                  mt='4'
                  py='3'
                  px='2'
                  borderColor='#344155'
                  borderWidth='1'
                >
                  <Text
                    fontSize='md'
                    fontWeight='600'
                    lineHeight='xs'
                    isTruncated
                    noOfLines={2}
                    h='10'
                  >
                    {account.name}
                  </Text>
                  <Text
                    fontSize='md'
                    fontWeight='600'
                    isTruncated
                    color={account.balance + account.init_amount < 0 ? 'neon.red' : 'neon.green'}
                    textAlign='right'
                  >
                    {currencyFormat(account.balance + account.init_amount) + ' ' + account.currency.code}
                  </Text>
                  <Text fontSize='xs' fontWeight='300' textAlign='right'>
                    {account.type}
                  </Text>
                </Box>
              </Pressable>
            ))}
        </View>
        <Center>
          <Pressable>
            <Center
              h='100px'
              w='40'
              borderColor='white'
              rounded='md'
              mt='4'
              borderStyle='dashed'
              borderWidth='2'
            >
              <Text fontSize='md' fontWeight='600'>
                +
              </Text>
              <Text fontSize='md' fontWeight='600'>
                Crear
              </Text>
            </Center>
          </Pressable>
        </Center>
      </ScrollView>
    </View>
  );
};

export default Account;
