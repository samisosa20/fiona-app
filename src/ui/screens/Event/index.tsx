import { View, ScrollView, Text, Box, Pressable, AddIcon } from 'native-base';

// Controllers
import useControllers from '../../../controllers';

// Helper
import useHelpers from '../../../helpers';

// Components
import useLayouts from '../../layouts';

const Event = () => {
  const { useScreenHooks } = useControllers();
  const { useEvent } = useScreenHooks();
  const { events, navigation } = useEvent();

  const { useQuickFunctions } = useHelpers();
  const { currencyFormat } = useQuickFunctions();

  const { PrivateLayout } = useLayouts();

  return (
    <PrivateLayout
      showBack
      centerLayout
      otherAction={
        <Pressable
          bg='tertiary.500'
          rounded='full'
          p='2'
          onPress={() => navigation.navigate('EventCreate')}
        >
          <AddIcon color='white' sixe='lg' />
        </Pressable>
      }
    >
      <Text fontSize='3xl' fontWeight='600' mt='4' textAlign='center'>
        Listado de eventos
      </Text>
      <Text fontSize='md' fontWeight='400' mt='4' textAlign='center'>
        los eventos pueden ser utiles para saber cuanto te costo o ganaste en un viaje, fietsa,
        ventas, eventos, etc.
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} mb='40px' w='100%'>
        <View>
          {events &&
            events.map((event) => (
              <Pressable
                key={'account' + event.id}
                onPress={() => navigation.navigate('EventDetail', { id: event.id })}
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
                  <Text
                    fontSize='md'
                    fontWeight='600'
                    lineHeight='20'
                    isTruncated
                    noOfLines={2}
                    h='10'
                  >
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
                    {currencyFormat(event.balance)}
                  </Text>
                </Box>
              </Pressable>
            ))}
        </View>
      </ScrollView>
    </PrivateLayout>
  );
};

export default Event;
