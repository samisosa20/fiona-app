import { View, Text, Button, Center, ScrollView } from 'native-base';

// Controllers
import useControllers from '../../../../controllers';

// Component
import useComponents from '../../../components';
import useLayouts from '../../../layouts';

const PaymentCreate = () => {
  const { useScreenHooks } = useControllers();
  const { usePaymentCreate } = useScreenHooks();
  const {
    title,
    control,
    errors,
    handleSubmit,
    onSubmit,
    isLoading,
    titleButton,
    accounts,
    listFieldCategory,
    autoCompleteFieldRef,
  } = usePaymentCreate();

  const { InputControl, SelectControl, AutocompleteControl, DateTimeControl } = useComponents();

  const { PrivateLayout } = useLayouts();

  return (
    <PrivateLayout showBack pb='10' centerLayout>
      <ScrollView>
        <Text fontSize='3xl' fontWeight='600' mt='4' textAlign='center'>
          {title}
        </Text>
        <Center w='90%' marginX='auto' mt='8'>
          <SelectControl
            label='Cuenta'
            control={control}
            errors={errors}
            name='account_id'
            options={accounts}
          />
          <AutocompleteControl
            label='Categoria'
            control={control}
            errors={errors}
            name='category_id'
            options={listFieldCategory}
            autoCompleteFieldRef={autoCompleteFieldRef}
          />
          <InputControl
            label='Monto'
            placeholder='Escribe cuanto dinero'
            name='amount'
            control={control}
            errors={errors}
            keyboardType={'numbers-and-punctuation'}
          />
          <DateTimeControl
            name='start_date'
            control={control}
            errors={errors}
            label='Fecha Inicio'
            helperText="Escribe a partir de cuando quieres que inicie los pagos recurrentes"
          />
          <DateTimeControl
            name='end_date'
            control={control}
            errors={errors}
            label='Fecha Fin (Opcional)'
            helperText="Si la fecha fin es menor o igual a la fecha inicio se ausme que sera para siempre."
          />
          <InputControl
            label='Dia'
            placeholder='Escribe un dia'
            name='specific_day'
            control={control}
            errors={errors}
            keyboardType={'number-pad'}
            helperText="Escribe que dia quieres que se haga el movimiento"
          />
          <InputControl
            label='Descripcion'
            placeholder='Escribe una descripcion'
            name='description'
            control={control}
            errors={errors}
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

export default PaymentCreate;
