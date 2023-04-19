import { View, Text, ArrowBackIcon, Button, Center, Pressable, Divider } from 'native-base';
import { CommonActions } from '@react-navigation/native';

// Controllers
import useControllers from '../../../../controllers';

// Component
import useComponents from '../../../components';

const AccountCreate = () => {
  const { useScreenHooks } = useControllers();
  const { useAccountCreate } = useScreenHooks();
  const {
    height,
    navigation,
    title,
    control,
    errors,
    handleSubmit,
    onSubmit,
    isLoading,
    listType,
    listCurrency,
    titleButton,
    route,
  } = useAccountCreate();

  const { InputControl, SelectControl, SwitchControl } = useComponents();

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
            label='Nombre de la cuenta'
            placeholder='Escribe el nombre de la cuenta aqui'
            name='name'
            control={control}
            errors={errors}
          />
          <InputControl
            label='Descripcion'
            placeholder='Escribe una descripcion aqui (optional)'
            name='description'
            control={control}
            errors={errors}
          />
          <InputControl
            label='Monto inicial'
            placeholder='Escribe cuanto tienes en esta cuenta (optional)'
            name='init_amount'
            control={control}
            errors={errors}
            keyboardType={'numbers-and-punctuation'}
            helperText='Indica cuanto tienes en la cuenta que vas a crear.'
          />
          <SelectControl
            label='Divisa'
            control={control}
            errors={errors}
            name='badge_id'
            options={listCurrency}
          />
          <SelectControl
            label='Tipo de cuenta'
            control={control}
            errors={errors}
            name='type'
            options={listType}
            helperText='Esto ayudara a segmentar tu plata'
          />
          {route?.params?.id && <Divider mb='5'/>}
          {route?.params?.id && <SwitchControl
            type='active'
            control={control}
            errors={errors}
            name='status'
            helperText="Al inactivar la cuenta quedara oculta y no la podras usar, hasta que se active de nuevo."
          />}
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

export default AccountCreate;
