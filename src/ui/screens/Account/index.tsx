import { View, ScrollView, Text} from 'native-base';

// Controllers
import useControllers from '../../../controllers';

// Components
import useComponents from "../../components";

const Account = () => {
  const { useScreenHooks } = useControllers();
  const { useAccount } = useScreenHooks();
  const { height, accounts, events, budgets, heritages } = useAccount();

  const { Carousel } = useComponents()

  return (
    <View bg='primary.800' h={height} py='10' px='4'>
      <Text fontSize='3xl' fontWeight='600'>
        ¡Hola! Sammy
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} mb='50px'>
        <Carousel listAccount={accounts} label='Cuentas' type='account'/>
        <Carousel listEvent={events} label='Eventos' type='event'/>
        <Carousel listBudget={budgets} label='Presupuesto' type='budget'/>
        <Carousel listHeritage={heritages} label='Patrimonio' type='budget'/>
      </ScrollView>
    </View>
  );
};

export default Account;
