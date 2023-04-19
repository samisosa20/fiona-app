import { View, Text, ArrowBackIcon, Button, Center, Pressable } from 'native-base';
import { CommonActions } from '@react-navigation/native';


// Controllers
import useControllers from '../../../../controllers';

// Component
import useComponents from '../../../components';

const EventCreate = () => {
  const { useScreenHooks } = useControllers();
  const { useEventCreate } = useScreenHooks();
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
  } = useEventCreate();

  const { InputControl, DateTimeControl } = useComponents();

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

export default EventCreate;
