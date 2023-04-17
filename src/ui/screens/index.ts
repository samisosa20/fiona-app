import Welcome from './Auth/Welcome';
import Login from './Auth/Login';
import Forgot from './Auth/Forgot';
import Register from './Auth/Register';
import Home from './Home';

const useScreens = () => {
  return {
    Welcome,
    Login,
    Forgot,
    Register,
    Home,
  };
};

export default useScreens;
