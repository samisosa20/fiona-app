import { useState, useEffect } from "react";
import { View, Pressable, ArrowBackIcon, Modal, Button } from 'native-base';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Dimensions } from 'react-native';
import { CommonActions } from '@react-navigation/native';

// Selectors
import useSelectors from '../../../models/selectors';

interface PLayout {
  centerLayout?: boolean;
  withOutPaddingH?: boolean;
  showBack?: boolean;
  pb?: number | string;
  children: JSX.Element
  | JSX.Element[]
  | string
  | string[];
  otherAction?: JSX.Element
  | JSX.Element[]
  | string
  | string[];
}

const PrivateLayout = (props: PLayout) => {
  const [showModal, setShowModal] = useState(false)
  const { children, centerLayout, otherAction, withOutPaddingH, showBack, pb, ...rest } = props;
  const { height } = Dimensions.get('window');
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { useAuthSelectors } = useSelectors();
  const { loggedSelector, authSelector } = useAuthSelectors();
  const isAuth = loggedSelector();
  const auth = authSelector();

  useEffect(() => {
    {console.log(auth)}
    setShowModal(!isAuth)
  }, [isAuth])

  return (
    <View
      bg='bg'
      h={height}
      pt='10'
      pb={pb ? pb : 0}
      pl={withOutPaddingH ? 0 : 4}
      pr={centerLayout ? 4 : 0}
      {...rest}
    >
      <View
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        px={withOutPaddingH ? 4 : 0}
        mt='3'
      >
        {showBack && (
          <Pressable onPress={() => navigation.dispatch(CommonActions.goBack())}>
            <ArrowBackIcon color='white' size='md' />
          </Pressable>
        )}
        {otherAction}
      </View>
      {children}
      <Modal
        isOpen={showModal}
        _backdrop={{
          _dark: {
            bg: 'coolGray.800',
          },
          bg: 'warmGray.50',
        }}
      >
        <Modal.Content maxWidth='350' maxH='212'>
          <Modal.Header>Upsss!</Modal.Header>
          <Modal.Body>
            Tu sesion ha expirado, deberas volver a inicar sesion.
            <Button onPress={() => navigation.navigate("Welcome")} bg='info.400' mt='4'>
              Salir
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default PrivateLayout;
