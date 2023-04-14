import Home from './Auth/Home';
import Login from './Auth/Login';
import Forgot from './Auth/Forgot';
import Register from './Auth/Register';
import Account from './Account';

const useScreens = () => {
  return {
    Home,
    Login,
    Forgot,
    Register,
    Account,
  };
};

export default useScreens;
