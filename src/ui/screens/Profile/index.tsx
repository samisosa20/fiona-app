import { Text } from 'native-base';

import useLayouts from "../../layouts";

const Profile = () => {

    const { PrivateLayout } = useLayouts();

    return <PrivateLayout>
        <Text fontSize='3xl' fontWeight='600' mt='4' textAlign='center'>
          Perfil
        </Text>
    </PrivateLayout>
}

export default Profile;