import { View, ScrollView, Text, HStack, Box, Center } from 'native-base';

// Controllers
import useControllers from '../../../controllers';

// Components
import useComponents from '../../components';

// Helper
import useHelpers from '../../../helpers';

const Home = () => {
  const { useScreenHooks } = useControllers();
  const { useHome } = useScreenHooks();
  const { height, accounts, events, budgets, heritages, user } = useHome();

  const { Carousel } = useComponents();

  const { useQuickFunctions } = useHelpers();
  const { currencyFormat } = useQuickFunctions();

  return (
    <View bg='bg' h={height} py='10' pl='4'>
      <HStack space={2} justifyContent='flex-start'>
        <Text fontSize='3xl' fontWeight='600' mt='4'>
          ¡Hola!
        </Text>
        <Text fontSize='3xl' fontWeight='400' mt='4'>
          {user.name.split(' ')[0]}
        </Text>
      </HStack>
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
              {currencyFormat(accounts.reduce((prev, curr) => prev + curr.balance + curr.init_amount, 0)) + ' ' + 'COP'}
            </Text>
          </Box>
        </Center>
        <Carousel listAccount={accounts} label='Cuentas' type='Account' />
        <Carousel listEvent={events} label='Eventos' type='Event' />
        <Carousel listBudget={budgets} label='Presupuesto' type='Budget' />
        <Carousel listHeritage={heritages} label='Patrimonio' type='Heritage' />
      </ScrollView>
    </View>
  );
};

export default Home;
