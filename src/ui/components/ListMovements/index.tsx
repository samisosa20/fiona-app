import { FlatList, Text, Box, Divider, HStack, Image, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';

// Helper
import useHelpers from '../../../helpers';

// Interface
import { ListMovementsProps } from './ListMovements.interface';

// Assets
import iconCalendar from '../../../assets/icons/icon-calendar.png';

const ListMovements = (props: ListMovementsProps) => {
  const { movements, pageName, showAccount } = props;
  const navigation = useNavigation();

  const { useQuickFunctions } = useHelpers();
  const { currencyFormat } = useQuickFunctions();

  return (
    <FlatList
      data={movements}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      bg='contrast'
      roundedTop='3xl'
      renderItem={({ item }) => (
        <Pressable key={item.id} onPress={() => navigation.navigate('Movement', {id: item.id, screen: pageName, account_id: pageName === 'EventDetail' ? item.event?.id : item.account.id})}>
          <Box borderBottomWidth='1' px='6' py='4' borderColor='white'>
            <HStack justifyContent='space-between'>
              <Text fontSize='md' fontWeight='500' lineHeight='sm'>
                {item.category?.name}
              </Text>
              <Text
                fontSize='md'
                fontWeight='400'
                lineHeight='sm'
                color={item?.amount < 0 ? 'neon.red' : 'neon.green'}
              >
                {currencyFormat(item?.amount ?? 0)}
              </Text>
            </HStack>
            <HStack justifyContent='space-between'>
              <Text fontSize='sm' fontWeight='300' lineHeight='sm'>
                {item.date_purchase}
              </Text>
              {item.event && !showAccount ? (
                <Text fontSize='sm' fontWeight='300' lineHeight='sm' alignItems='center'>
                  <Image
                    source={iconCalendar}
                    alt='Evento'
                    w='4'
                    h='4'
                    tintColor='white'
                    resizeMode='contain'
                    mr='4'
                  />
                  {item.event?.name}
                </Text>
              ) : 
              <Text fontSize='sm' fontWeight='300' lineHeight='sm' alignItems='center'>
                  {item.account?.name}
                </Text>
              }
            </HStack>
            {item.description && <Divider my='2' />}
            {item.description && (
              <Text fontSize='sm' fontWeight='300' lineHeight='sm' alignItems='center'>
                {item.description}
              </Text>
            )}
          </Box>
        </Pressable>
      )}
    />
  );
};

export default ListMovements;