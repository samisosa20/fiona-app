import { View, Text, Button, Center } from 'native-base';


// Controllers
import useControllers from '../../../../controllers';

// Component
import useComponents from '../../../components';
import useLayouts from '../../../layouts';

const CategoryCreate = () => {
  const { useScreenHooks } = useControllers();
  const { useCategoryCreate } = useScreenHooks();
  const {
    title,
    control,
    errors,
    handleSubmit,
    onSubmit,
    isLoading,
    titleButton,
    listGroup,
    listFieldCategory,
    autoCompleteFieldRef,
  } = useCategoryCreate();

  const { InputControl, SelectControl, AutocompleteControl } = useComponents();

  const { PrivateLayout } = useLayouts();

  return (
    <PrivateLayout showBack pb='10' centerLayout>
      <View>
        <Text fontSize='3xl' fontWeight='600' mt='4' textAlign='center'>
          {title}
        </Text>
        <Center w='90%' marginX='auto' mt='8'>
          <InputControl
            label='Nombre de la categoria'
            placeholder='Escribe el nombre de la categoria aqui'
            name='name'
            control={control}
            errors={errors}
          />
          <InputControl
            label='Descripcion (opcional)'
            placeholder='Escribe una descripcion de la categoria aqui'
            name='description'
            control={control}
            errors={errors}
          />
          <SelectControl
            label='Grupo'
            control={control}
            errors={errors}
            name='group_id'
            options={listGroup}
          />
          <AutocompleteControl
            label='Categoria padre (opcional)'
            control={control}
            errors={errors}
            name='category_id'
            options={listFieldCategory}
            autoCompleteFieldRef={autoCompleteFieldRef}
            helperText="Si especificas una categoria, la categoria que estas creando quedara adentro de la categoria padre"
          />
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

export default CategoryCreate;
