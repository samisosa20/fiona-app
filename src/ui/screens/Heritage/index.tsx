import { View, ScrollView, Text, ArrowBackIcon, Box, Pressable, AddIcon } from 'native-base';
import { CommonActions } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';

// Controllers
import useControllers from '../../../controllers';

// Helper
import useHelpers from '../../../helpers';

const Heritage = () => {
  const { useScreenHooks } = useControllers();
  const { useHeritage } = useScreenHooks();
  const { height, listHeirtages, navigation, width, dataChart } = useHeritage();

  const { useQuickFunctions } = useHelpers();
  const { currencyFormat } = useQuickFunctions();

  return (
    <View bg='bg' h={height} py='10' px='4'>
      <View flexDirection='row' justifyContent='space-between' alignItems='center' px='4' mt='3'>
        <Pressable onPress={() => navigation.dispatch(CommonActions.goBack())}>
          <ArrowBackIcon color='white' size='md' px='4' />
        </Pressable>
        <Pressable
          bg='tertiary.500'
          rounded='full'
          p='2'
          onPress={() => navigation.navigate('HeritageCreate')}
        >
          <AddIcon color='white' sixe='lg' />
        </Pressable>
      </View>
      <Text fontSize='3xl' fontWeight='600' mt='4' textAlign='center' mb='8'>
        Listado de patrimonio
      </Text>
      <View>
        <LineChart
          data={{
            labels: listHeirtages.map(v => { return v.year}),
            datasets: dataChart
          }}
          width={width - 45}
          height={220}
          yAxisLabel='$'
          yAxisInterval={1} // optional, defaults to 1
          formatYLabel={(v) => (parseFloat(v) / (parseFloat(v) >= 1000000 ? 1000000 : 1000)).toFixed(2) + (parseFloat(v) >= 1000000 ? 'M' : 'K')}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            
          }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} mb='40px' w='100%'>
        <View>
          {listHeirtages &&
            listHeirtages.map((heritage) => (
              <Pressable
                key={'heritage' + heritage.year}
                onPress={() => navigation.navigate('HeritageDetail', { year: heritage.year })}
                mb='4'
              >
                <Box
                  bg='contrast'
                  rounded='xl'
                  mr='3'
                  py='3'
                  px='2'
                  borderColor='#344155'
                  borderWidth='1'
                >
                  <Text fontSize='md' fontWeight='600' lineHeight='20' isTruncated noOfLines={2}>
                    {heritage.year}
                  </Text>
                  {heritage.balance &&
                    heritage.balance.slice(0, 2).map((balance) => (
                      <Text
                        fontSize='md'
                        fontWeight='600'
                        lineHeight='20'
                        isTruncated
                        noOfLines={2}
                        color={
                          balance.comercial_amount + balance.movements < 0
                            ? 'neon.red'
                            : 'neon.green'
                        }
                        textAlign='right'
                        key={heritage.year + balance.currency}
                      >
                        {currencyFormat(balance.comercial_amount + balance.movements) +
                          ' ' +
                          balance.currency}
                      </Text>
                    ))}
                </Box>
              </Pressable>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Heritage;
