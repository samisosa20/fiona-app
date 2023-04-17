import { View, Center, Text, Pressable, ScrollView, Box } from 'native-base';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Helpers
import useHelper from '../../../helpers';

// Interface
import { CarouselProp } from './Carousel.interface'

const Carousel = (props: CarouselProp) => {
  const { listAccount, label, type, listEvent, listBudget, listHeritage } = props;

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  const { useQuickFunctions } = useHelper();
  const { currencyFormat } = useQuickFunctions();
  return (
    <View mt='4'>
      <View flexDirection='row' justifyContent='space-between' alignItems='center' mb='2' pr='4'>
        <Text fontSize='lg' fontWeight='700'>
          {label}
        </Text>
        <Pressable onPress={() => navigation.navigate(type)}>
          <Text underline>Ver mas</Text>
        </Pressable>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {listAccount && listAccount.map((account) => (
          <Pressable key={label + account.id} onPress={() => navigation.navigate('AccountDetail', {id: account.id})}>
            <Box h='100px' w='210' bg='contrast' rounded='xl' mr='3' py='3' px='2' borderColor='#344155' borderWidth='1'>
              <Text fontSize='md' fontWeight='600' lineHeight='xs' isTruncated noOfLines={2} h='10'>
                {account.name}
              </Text>
              <Text
                fontSize='md'
                fontWeight='600'
                isTruncated
                color={account.balance < 0 ? 'neon.red' : 'neon.green'}
                textAlign='right'
              >
                {currencyFormat(account.balance) + ' ' + account.currency}
              </Text>
              <Text fontSize='xs' fontWeight='300' textAlign='right'>
                {account.type}
              </Text>
            </Box>
          </Pressable>
        ))}
        {listEvent && listEvent.map(event =>(
            <Pressable key={label + event.id}>
            <Box h='80px' w='210' bg='contrast' rounded='xl' mr='3' py='3' px='2' borderColor='#344155' borderWidth='1'>
              <Text fontSize='md' fontWeight='600' lineHeight='20' isTruncated noOfLines={2} h='10'>
                {event.name}
              </Text>
              <Text
                fontSize='md'
                fontWeight='600'
                lineHeight='20'
                isTruncated
                noOfLines={2}
                color={event.balance < 0 ? 'neon.red' : 'neon.green'}
                textAlign='right'
              >
                {currencyFormat(event.balance) + ' ' + event.currency}
              </Text>
            </Box>
          </Pressable>
        ))}
        {listBudget && listBudget.map(budget =>(
            <Pressable key={label + budget.id}>
            <Box h='80px' w='210' bg='contrast' rounded='xl' mr='3' py='3' px='2' borderColor='#344155' borderWidth='1'>
              <Text fontSize='md' fontWeight='600' lineHeight='20' isTruncated noOfLines={2}>
                {budget.name}
              </Text>
              <Text
                fontSize='md'
                fontWeight='600'
                lineHeight='20'
                isTruncated
                noOfLines={2}
                color={budget.income < 0 ? 'neon.red' : 'neon.green'}
                textAlign='right'
              >
                {currencyFormat(budget.income) + ' ' + budget.currency}
              </Text>
              <Text
                fontSize='md'
                fontWeight='600'
                lineHeight='20'
                isTruncated
                noOfLines={2}
                color={budget.expensive < 0 ? 'neon.red' : 'neon.green'}
                textAlign='right'
              >
                {currencyFormat(budget.expensive) + ' ' + budget.currency}
              </Text>
            </Box>
          </Pressable>
        ))}
        {listHeritage && listHeritage.map(heritage =>(
            <Pressable key={label + heritage.id}>
            <Box h='80px' w='210' bg='contrast' rounded='xl' mr='3' py='3' px='2' borderColor='#344155' borderWidth='1'>
              <Text fontSize='md' fontWeight='600' lineHeight='20' isTruncated noOfLines={2} h='10'>
                {heritage.name}
              </Text>
              <Text
                fontSize='md'
                fontWeight='600'
                lineHeight='20'
                isTruncated
                noOfLines={2}
                color={heritage.balance < 0 ? 'neon.red' : 'neon.green'}
                textAlign='right'
              >
                {currencyFormat(heritage.balance) + ' ' + heritage.currency}
              </Text>
            </Box>
          </Pressable>
        ))}
        <Pressable>
          <Center
            h={type === 'Account' ? '100px' : '80px'}
            w='40'
            borderColor='white'
            rounded='md'
            mr='4'
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
      </ScrollView>
    </View>
  );
};

export default Carousel;
