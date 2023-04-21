import { Text, ScrollView, Center, View, Button, HStack } from 'native-base';

// Components
import useComponents from '../../components';
import useLayouts from '../../layouts';

// Controllers
import useControllers from '../../../controllers';

const Movement = () => {
  const { PrivateLayout } = useLayouts();

  const { useScreenHooks } = useControllers();
  const { useMovement } = useScreenHooks();
  const {
    control,
    errors,
    autoCompleteFieldRef,
    accounts,
    events,
    categories,
    watch,
    handleSubmit,
    onSubmit,
    isLoading,
    isReadOnly,
    steps,
    setSteps,
    descriptionText,
  } = useMovement();

  const { InputControl, SelectControl, AutocompleteControl, DateTimeControl } = useComponents();

  return (
    <PrivateLayout centerLayout pb='110px'>
      <View mb='110px'>
        <Text fontSize='3xl' fontWeight='600' mt='4' textAlign='center'>
          Movimientos
        </Text>
        <Text fontSize='md' fontWeight='400' mt='4' textAlign='center'>
          Aca se ingresan todos los movimientos que haces cada dia
        </Text>
        <Text fontSize='lg' fontWeight='600' mt='6'>
          Paso {steps}
        </Text>
        <Text>{descriptionText[steps - 1]}</Text>
        <Center w='100%' marginX='auto' mt='8'>
          {steps === 1 && (
            <View w='100%'>
              <SelectControl
                label='Tipo de movimiento'
                control={control}
                errors={errors}
                name='type'
                options={[
                  {
                    value: 'move',
                    label: 'movimiento',
                  },
                  {
                    value: 'transfer',
                    label: 'Transferencia',
                  },
                ]}
              />
              <InputControl
                label='Monto'
                placeholder='Escribe cuanto el valor del movimeinto'
                name='amount'
                control={control}
                errors={errors}
                keyboardType={'numbers-and-punctuation'}
                helperText={
                  watch('type') === 'move'
                    ? 'valor negativo es para indicar una salida de dinero'
                    : 'Solo numeros positivos'
                }
              />
              <DateTimeControl
                name='date_purchase'
                control={control}
                errors={errors}
                label='Fecha'
                mode='datetime'
              />
            </View>
          )}
          {steps === 2 && (
            <View w='100%'>
              <SelectControl
                label={watch('type') === 'move' ? 'Cuenta' : 'Cuenta de salida'}
                control={control}
                errors={errors}
                name='account_id'
                options={accounts}
              />
              {watch('type') === 'move' ? (
                <AutocompleteControl
                  label='Categoria'
                  control={control}
                  errors={errors}
                  name='category_id'
                  options={categories}
                  autoCompleteFieldRef={autoCompleteFieldRef}
                />
              ) : (
                <SelectControl
                  label='Cuenta destino'
                  control={control}
                  errors={errors}
                  name='account_end_id'
                  options={accounts}
                />
              )}
              {watch('type') === 'transfer' && isReadOnly && (
                <InputControl
                  label='Monto real de ingreso'
                  placeholder='Escribe cuanto dinero le ingreso a la cuenta'
                  name='amount_end'
                  control={control}
                  errors={errors}
                  keyboardType={'numbers-and-punctuation'}
                  helperText='Escribe el real monto que te ingreso a la otra cuenta'
                />
              )}
            </View>
          )}
          {steps === 3 && (
            <View w='100%'>
              <InputControl
                label='Descripcion (Opcional)'
                placeholder='Escribe una descripcion o comentario aqui'
                name='description'
                control={control}
                errors={errors}
              />

              {watch('type') === 'move' && (
                <SelectControl
                  label='Evento (Opcional)'
                  control={control}
                  errors={errors}
                  name='event_id'
                  options={events}
                />
              )}
            </View>
          )}
        </Center>
      </View>
      <HStack space={4} w='100%' maxW='350px' mx='auto' mt='auto'>
        {steps > 1 && (
          <View w='50%' borderRadius='10' mt='6'>
            <Button
              isLoading={isLoading}
              isLoadingText='enviando'
              onPress={() => setSteps(steps - 1)}
              variant='unstyled'
              w='100%'
              color='white'
            >
              Devolver
            </Button>
          </View>
        )}
        <View w={steps === 1 ? '100%' : '50%'} borderRadius='10' bg='white' mt='6'>
          <Button
            isLoading={isLoading}
            isLoadingText='enviando'
            onPress={steps === 3 ? handleSubmit(onSubmit) : () => setSteps(steps + 1)}
            variant='ghost'
            w='100%'
          >
            {steps === 3 ? 'Guardar' : 'Siguiente'}
          </Button>
        </View>
      </HStack>
    </PrivateLayout>
  );
};

export default Movement;
