import { View, Text, Button, Center } from 'native-base';


// Controllers
import useControllers from '../../../../controllers';

// Component
import useComponents from '../../../components';
import useLayouts from '../../../layouts';

const EventCreate = () => {
  const { useScreenHooks } = useControllers();
  const { useEventCreate } = useScreenHooks();
  const {
    title,
    control,
    errors,
    handleSubmit,
    onSubmit,
    isLoading,
    titleButton,
  } = useEventCreate();

  const { InputControl, DateTimeControl } = useComponents();

  const { PrivateLayout } = useLayouts();

  return (
    <PrivateLayout  showBack pb='10' centerLayout>
      <View>
        <Text fontSize='3xl' fontWeight='600' mt='4' textAlign='center'>
          {title}
        </Text>
        <Center w='90%' marginX='auto' mt='8'>
          <InputControl
            label='Nombre del evento'
            placeholder='Escribe el nombre del evento aqui'
            name='name'
            control={control}
            errors={errors}
          />
          <DateTimeControl name='end_event'
            control={control}
            errors={errors}
            label='Fecha fin del evento' />
        </Center>
      </View>
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

export default EventCreate;
