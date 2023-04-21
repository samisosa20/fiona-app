import {
  View,
  ScrollView,
  Text,
  Box,
  Pressable,
  AddIcon,
  HStack,
} from 'native-base';

// Controllers
import useControllers from '../../../controllers';

// Components
import useLayouts from '../../layouts';

// Helper
import useHelpers from '../../../helpers';

const Payment = () => {
  const { useScreenHooks } = useControllers();
  const { usePayment } = useScreenHooks();
  const { payments, navigation } = usePayment();

  const { PrivateLayout } = useLayouts();

  const { useQuickFunctions } = useHelpers();
  const { currencyFormat } = useQuickFunctions();

  return (
    <PrivateLayout
      showBack
      centerLayout
      otherAction={
        <View flexDirection='row' alignItems='center'>
          <Pressable
            bg='tertiary.500'
            rounded='full'
            p='2'
            ml='4'
            onPress={() => navigation.navigate('PaymentCreate')}
          >
            <AddIcon color='white' sixe='lg' />
          </Pressable>
        </View>
      }
    >
      <Text fontSize='3xl' fontWeight='600' mt='4' textAlign='center'>
        Pagos Programados
      </Text>
      <Text fontSize='md' fontWeight='400' mt='4' textAlign='center'>
        Los pagos programados son para configurar de forma recurrentes ingresos o egresos
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} mb='40px' w='100%'>
        <View>
          {payments &&
            payments.map((payment) => (
              <Pressable
                key={'payment' + payment.id}
                onPress={() => navigation.navigate('PaymentCreate', { id: payment.id })}
              >
                <Box
                  h='100px'
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
                      {payment.account.name}
                    </Text>
                    <Text
                      fontSize='md'
                      fontWeight='600'
                      isTruncated
                      color={payment.amount < 0 ? 'neon.red' : 'neon.green'}
                      textAlign='right'
                    >
                      {currencyFormat(payment.amount) +
                        ' ' +
                        payment.account.currency.code}
                    </Text>
                  </HStack>
                  <HStack justifyContent='space-between'>
                    <Text
                      fontSize='md'
                      fontWeight='400'
                      lineHeight='18'
                      isTruncated
                      noOfLines={2}
                      h='10'
                      w='50%'
                    >
                      {payment.category.name}
                    </Text>
                    <Text
                      fontSize='md'
                      fontWeight='400'
                      lineHeight='18'
                      isTruncated
                      h='15'
                    >
                      los {payment.specific_day} de cada mes
                    </Text>
                  </HStack>
                </Box>
              </Pressable>
            ))}
        </View>
      </ScrollView>
    </PrivateLayout>
  );
};

export default Payment;
