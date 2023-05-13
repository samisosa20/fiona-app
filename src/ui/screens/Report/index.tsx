import {
  Text,
  View,
  Pressable,
  Box,
  HStack,
  ScrollView,
  FlatList,
  CircleIcon,
  Image,
  Modal,
  Button,
} from 'native-base';
import { PieChart, LineChart } from 'react-native-chart-kit';

// Components
import useLayouts from '../../layouts';
import useComponents from '../../components';

// Helper
import useHelpers from '../../../helpers';

// Controllers
import useControllers from '../../../controllers';

// Assests
import iconFilter from '../../../assets/icons/icon-filter.png';

const Report = () => {
  const { PrivateLayout } = useLayouts();

  const { useScreenHooks } = useControllers();
  const { useReport } = useScreenHooks();
  const {
    openclose,
    income,
    mainExpensive,
    groupExpensive,
    listExpensive,
    listBalance,
    colorChart,
    listHiddenDots,
    control,
    errors,
    listCurrency,
    setShowModal,
    showModal,
    onSubmit,
    handleSubmit,
    isLoading,
    width,
  } = useReport();

  const { DateTimeControl, SelectControl } = useComponents();

  const { useQuickFunctions } = useHelpers();
  const { currencyFormat } = useQuickFunctions();

  return (
    <PrivateLayout
      centerLayout
      otherAction={
        <Pressable onPress={() => setShowModal(true)} ml='auto'>
          <Image source={iconFilter} alt='Filtrar' w='6' h='6' resizeMode='contain' />
        </Pressable>
      }
    >
      <Text fontSize='3xl' fontWeight='600' textAlign='center'>
        ¿Como te fue?
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} mb='110px' nestedScrollEnabled={true} maxW='1024px' mx='auto'>
        <HStack justifyContent='space-between'>
          <Box mt='4' bg='contrast' p='2' w='48%' rounded='md'>
            <Text fontSize='sm' fontWeight='300'>
              Balance Inicial
            </Text>
            <Text
              fontSize='md'
              fontWeight='500'
              textAlign='right'
              color={openclose.open_balance < 0 ? 'neon.red' : 'neon.green'}
            >
              {currencyFormat(openclose.open_balance)}
            </Text>
          </Box>
          <Box mt='4' bg='contrast' p='2' w='48%' rounded='md'>
            <Text fontSize='sm' fontWeight='300'>
              Ingresos
            </Text>
            <Text fontSize='md' fontWeight='500' textAlign='right' color={'neon.green'}>
              {currencyFormat(openclose.income)}
            </Text>
          </Box>
        </HStack>
        <HStack justifyContent='space-between'>
          <Box mt='4' bg='contrast' p='2' w='48%' rounded='md'>
            <Text fontSize='sm' fontWeight='300'>
              Egresos
            </Text>
            <Text fontSize='md' fontWeight='500' textAlign='right' color={'neon.red'}>
              {currencyFormat(openclose.expensive)}
            </Text>
          </Box>
          <Box mt='4' bg='contrast' p='2' w='48%' rounded='md'>
            <Text fontSize='sm' fontWeight='300'>
              Balance final
            </Text>
            <Text
              fontSize='md'
              fontWeight='500'
              textAlign='right'
              color={openclose.utility < 0 ? 'neon.red' : 'neon.green'}
            >
              {currencyFormat(openclose.utility)}
            </Text>
          </Box>
        </HStack>
        <View mt='3' textAlign='center'>
          <Text fontSize='md' fontWeight='400'>
            Ingresos
          </Text>
          <View flexDirection='row' bg='contrast' rounded='lg'>
            {income && (
              <PieChart
                data={income?.map((v, i) => {
                  return {
                    name: v.category,
                    category: v.amount,
                    color: colorChart[i],
                    legendFontColor: 'white',
                    legendFontSize: 12,
                  };
                })}
                width={220}
                height={220}
                accessor={'category'}
                backgroundColor={'transparent'}
                center={[50, 0]}
                paddingLeft='0'
                chartConfig={{
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                hasLegend={false}
              />
            )}
            <ScrollView flex='1' mt='5' h='220'>
              {income?.map(({ category, amount }, i) => {
                return (
                  <View key={category} mb='1' alignItems='flex-start'>
                    <Text fontSize='xs' fontWeight='400'>
                      <CircleIcon mr='1' color={colorChart[i]} />
                      {category}
                    </Text>
                    <Text fontSize='xs' fontWeight='400'>
                      {currencyFormat(amount)}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
        <View mt='3' textAlign='center'>
          <Text fontSize='md' fontWeight='400'>
            Principales categorias en gastos
          </Text>
          <View flexDirection='row' bg='contrast' rounded='lg'>
            {mainExpensive && (
              <PieChart
                data={mainExpensive?.map((v, i) => {
                  return {
                    name: v.category,
                    category: v.amount,
                    color: colorChart[i],
                    legendFontColor: 'white',
                    legendFontSize: 12,
                  };
                })}
                width={220}
                height={220}
                accessor={'category'}
                backgroundColor={'transparent'}
                center={[50, 0]}
                paddingLeft='0'
                chartConfig={{
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                hasLegend={false}
              />
            )}
            <ScrollView flex='1' mt='5' h='220'>
              {mainExpensive?.map(({ category, amount }, i) => {
                return (
                  <View key={category} mb='1' alignItems='flex-start'>
                    <Text fontSize='xs' fontWeight='400'>
                      <CircleIcon mr='1' color={colorChart[i]} />
                      {category}
                    </Text>
                    <Text fontSize='xs' fontWeight='400'>
                      {currencyFormat(amount)}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
        <View mt='3' textAlign='center'>
          <Text fontSize='md' fontWeight='400'>
            Balance por dia
          </Text>
          <LineChart
            data={{
              labels: listBalance?.map((v) => v.date) ?? [],
              datasets: [
                {
                  data: listBalance?.map((v) => v.amount) ?? [0],
                },
              ],
            }}
            width={width - 32}
            height={220}
            yAxisLabel='$'
            yAxisInterval={1} // optional, defaults to 1
            formatYLabel={(v) =>
              (parseFloat(v) / (parseFloat(v) >= 1000000 ? 1000000 : 1000)).toFixed(2) +
              (parseFloat(v) >= 1000000 ? 'M' : 'K')
            }
            hidePointsAtIndex={listHiddenDots}
            formatXLabel={(v) => v}
            chartConfig={{
              backgroundColor: '#242836',
              backgroundGradientFrom: '#242836',
              backgroundGradientTo: '#242836',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 8,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        <View mt='3' textAlign='center'>
          <Text fontSize='md' fontWeight='400'>
            Gastos por grupo
          </Text>
          <View bg='contrast' rounded='lg'>
            {groupExpensive?.map((item, i) => (
              <Box py='4' px='3' borderBottomWidth='1' borderColor='white' key={i}>
                <Text fontSize='sm' fontWeight='300' textAlign='left'>
                  {item.name}
                </Text>
                <Text
                  fontSize='md'
                  fontWeight='500'
                  textAlign='right'
                  color={item.amount < 0 ? 'neon.red' : 'neon.green'}
                >
                  {item.porcent !== undefined ? `${currencyFormat(item.amount)} (${item.porcent}%)` : currencyFormat(item.amount) }
                </Text>
              </Box>
            ))}
          </View>
        </View>
        <View mt='3' textAlign='center'>
          <Text fontSize='md' fontWeight='400'>
            Listado de Gastos
          </Text>
          <ScrollView horizontal={true} h='220'>
            <FlatList
              data={listExpensive}
              bg='contrast'
              rounded='lg'
              nestedScrollEnabled={true}
              renderItem={({ item }) => (
                <Box w={width - 32} maxW='1024px' flex='1' py='4' px='3' borderBottomWidth='1' borderColor='white'>
                  <Text fontSize='sm' fontWeight='300' textAlign='left'>
                    {item.category}
                  </Text>
                  <Text fontSize='md' fontWeight='500' textAlign='right' color='neon.red'>
                    {currencyFormat(item.amount)}
                  </Text>
                </Box>
              )}
            />
          </ScrollView>
        </View>
      </ScrollView>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size='xl'
        _backdrop={{
          _dark: {
            bg: 'coolGray.800',
          },
          bg: 'warmGray.50',
        }}
      >
        <Modal.Content maxWidth='350'>
          <Modal.Header>Filtros</Modal.Header>
          <Modal.Body>
            <DateTimeControl control={control} errors={errors} name='init_date' label='Inicio' />
            <DateTimeControl control={control} errors={errors} name='end_date' label='Fin' />
            <SelectControl
              control={control}
              errors={errors}
              name='currency'
              label='Divisa '
              options={listCurrency}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant='ghost'
                colorScheme='blueGray'
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                isLoading={isLoading}
                isLoadingText='enviando'
                onPress={handleSubmit(onSubmit)}
                colorScheme='success'
              >
                Buscar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </PrivateLayout>
  );
};

export default Report;
