import { Text } from 'native-base';

import useLayouts from "../../layouts";

const Report = () => {

    const { PrivateLayout } = useLayouts();

    return <PrivateLayout>
        <Text fontSize='3xl' fontWeight='600' mt='4' textAlign='center'>
          ¿Como te fue?
        </Text>
    </PrivateLayout>
}

export default Report;