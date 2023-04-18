import { Alert, Text, VStack, HStack } from 'native-base';

// Selector
import useSelectors from '../../../models/selectors';

const Toast = () => {
  const { useGeneralSelectors } = useSelectors();
  const { toastSelector } = useGeneralSelectors();
  const toast = toastSelector();

  return toast.show && (
    <Alert w='100%' status={toast.status} variant='top-accent'>
      <Text fontSize='md' color='coolGray.800'>
        <VStack space={2} flexShrink={1} w='100%'>
          <HStack flexShrink={1} space={2} alignItems='center' justifyContent='space-between'>
            <HStack space={2} flexShrink={1} alignItems='center'>
              <Alert.Icon />
              <Text>{toast.message}</Text>
            </HStack>
          </HStack>
        </VStack>
      </Text>
    </Alert>
  );
};

export default Toast;
