import { View, Text, Button, Center, ScrollView } from 'native-base';


// Controllers
import useControllers from '../../../../controllers';

// Component
import useComponents from '../../../components';
import useLayouts from '../../../layouts';

const HeritageCreate = () => {
  const { useScreenHooks } = useControllers();
  const { useHeritageCreate } = useScreenHooks();
  const {
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

  const { PrivateLayout } = useLayouts();

  return (
    <PrivateLayout showBack centerLayout pb='10'>
      <ScrollView>
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
      </ScrollView>
      <View w='100%' borderRadius='10' bg='white' mt='auto'>
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
    </PrivateLayout>
  );
};

export default HeritageCreate;
