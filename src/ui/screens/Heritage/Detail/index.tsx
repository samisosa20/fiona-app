import { View, Text, ArrowBackIcon, Center, Pressable, FlatList, HStack, Box } from 'native-base';
import { CommonActions } from '@react-navigation/native';

// Controllers
import useControllers from '../../../../controllers';

// Helpers
import useHelpers from '../../../../helpers';

// Components
import useLayouts from '../../../layouts';

const HeritageDetail = () => {
  const { useScreenHooks } = useControllers();
  const { useHeritageDetail } = useScreenHooks();
  const { navigation, heritage, route } = useHeritageDetail();

  const { useQuickFunctions } = useHelpers();
  const { currencyFormat } = useQuickFunctions();

  const { PrivateLayout } = useLayouts();

  return (
    <PrivateLayout showBack withOutPaddingH>
      <Center mb='8'>
        <Text fontSize='3xl' fontWeight='600' w='80%' textAlign='center' lineHeight='sm'>
          Patrimonio del {route.params.year}
        </Text>
      </Center>
      <FlatList
        data={heritage}
        showsVerticalScrollIndicator={false}
        bg='contrast'
        roundedTop='3xl'
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('HeritageCreate', { id: item.id })}
            key={item.id}
          >
            <Box borderBottomWidth='1' px='6' py='4' borderColor='white'>
              <HStack justifyContent='space-between'>
                <Text fontSize='md' fontWeight='500' lineHeight='sm'>
                  {item.name}
                </Text>
              </HStack>
              <HStack justifyContent='space-between' mt='2'>
                <Text fontSize='sm' fontWeight='300' lineHeight='sm'>
                  Valor comercial
                </Text>
                <Text
                  fontSize='md'
                  fontWeight='400'
                  lineHeight='sm'
                  color={item?.comercial_amount < 0 ? 'neon.red' : 'neon.green'}
                >
                  {currencyFormat(item?.comercial_amount ?? 0) + ' ' + item.currency.code}
                </Text>
              </HStack>
              <HStack justifyContent='space-between'>
                <Text fontSize='sm' fontWeight='300' lineHeight='sm'>
                  Valor Legal
                </Text>
                <Text
                  fontSize='md'
                  fontWeight='400'
                  lineHeight='sm'
                  color={item?.legal_amount < 0 ? 'neon.red' : 'neon.green'}
                >
                  {currencyFormat(item?.legal_amount ?? 0) + ' ' + item.currency.code}
                </Text>
              </HStack>
            </Box>
          </Pressable>
        )}
      />
    </PrivateLayout>
  );
};

export default HeritageDetail;
