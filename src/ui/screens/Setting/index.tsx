import { Text } from 'native-base';

import useLayouts from "../../layouts";

const Setting = () => {

    const { PrivateLayout } = useLayouts();

    return <PrivateLayout>
        <Text fontSize='3xl' fontWeight='600' mt='4' textAlign='center'>
          Configuraciones
        </Text>
    </PrivateLayout>
}

export default Setting;