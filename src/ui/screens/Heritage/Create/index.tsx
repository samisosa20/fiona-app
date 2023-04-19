import { View, Text, ArrowBackIcon, Button, Center, Pressable } from 'native-base';
import { CommonActions } from '@react-navigation/native';


// Controllers
import useControllers from '../../../../controllers';

// Component
import useComponents from '../../../components';

const HeritageCreate = () => {
  const { useScreenHooks } = useControllers();
  const { useHeritageCreate } = useScreenHooks();
  const {
    height,
    navigation,
    title,
    control,
    errors,
    handleSubmit,
    onSubmit,
    isLoading,
    titleButton,
    listCurrency,
    listYear,
  } = useHeritageCreate();

  const { InputControl, SelectControl } = useComponents();

  return (
    <View bg='bg' h={height} py='10' px='4' justifyContent='space-between'>
      <View>
        <Pressable onPress={() => navigation.dispatch(CommonActions.goBack())} mt='4'>
          <ArrowBackIcon color='white' size='md' px='4' />
        </Pressable>
        <Text fontSize='3xl' fontWeight='600' mt='4' textAlign='center'>
          {title}
        </Text>
        <Center w='90%' marginX='auto' mt='8'>
          <InputControl
            label='Nombre del rubro/elemento/activo/pasivo'
            placeholder='Escribe el nombre aqui'
            name='name'
            control={control}
            errors={errors}
          />
          <InputControl
            label='Valor legal'
            placeholder='Escribe el nombre aqui'
            name='legal_amount'
            control={control}
            errors={errors}
            keyboardType={'numbers-and-punctuation'}
            helperText='Indica cuanto vale desde el punto de vista legal'
          />
          <InputControl
            label='Valor comercial'
            placeholder='Escribe el nombre aqui'
            name='comercial_amount'
            control={control}
            errors={errors}
            keyboardType={'numbers-and-punctuation'}
            helperText='Indica cuanto vale comercialmente hablando'
          />
          <SelectControl
            label='Divisa'
            control={control}
            errors={errors}
            name='badge_id'
            options={listCurrency}
          />
          <SelectControl
            label='Año'
            control={control}
            errors={errors}
            name='year'
            options={listYear}
          />
        </Center>
      </View>
      <View w='100%' borderRadius='10' bg='white'>
        <Button
          isLoading={isLoading}
          isLoadingText='enviando'
          onPress={handleSubmit(onSubmit)}
          variant='ghost'
          w='100%'
        >
          {titleButton}
        </Button>
      </View>
    </View>
  );
};

export default HeritageCreate;
