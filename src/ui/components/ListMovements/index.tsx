import { FlatList, Text, Box, Pressable, HStack, Image } from 'native-base';

// Helper
import useHelpers from '../../../helpers';

// Interface
import { ListMovementsProps } from './ListMovements.interface';

// Assets
import iconCalendar from '../../../assets/icons/icon-calendar.png'

const ListMovements = (props: ListMovementsProps) => {
  const { movements } = props;

  const { useQuickFunctions } = useHelpers();
  const { currencyFormat } = useQuickFunctions();

  return (
    <FlatList
      data={movements}
      showsVerticalScrollIndicator={false}
      bg='contrast'
      roundedTop='3xl'
      renderItem={({ item }) => (
        <Box key={item.id} borderBottomWidth='1' px='6' py='4' borderColor='white'>
          <HStack justifyContent='space-between'>
            <Text fontSize='md' fontWeight='500' lineHeight='sm'>
              {item.category?.name}
            </Text>
            <Text fontSize='md' fontWeight='400' lineHeight='sm'>
              {currencyFormat(item?.amount ?? 0)}
            </Text>
          </HStack>
          <HStack justifyContent='space-between'>
            <Text fontSize='sm' fontWeight='300' lineHeight='sm'>
              {item.date_purchase}
            </Text>
            {item.event && <Text fontSize='sm' fontWeight='300' lineHeight='sm' alignItems='center'>
              <Image source={iconCalendar} alt='Evento' w='4' h='4' tintColor='white' resizeMode="contain" mr='4'/>
              {item.event?.name}
            </Text>}
          </HStack>
        </Box>
      )}
    />
  );
};

export default ListMovements;
