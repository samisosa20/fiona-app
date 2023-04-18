import Welcome from './Auth/Welcome';
import Login from './Auth/Login';
import Forgot from './Auth/Forgot';
import Register from './Auth/Register';
import Home from './Home';
import Account from './Account';
import AccountDetail from './Account/Detail';
import AccountCreate from './Account/Create';

const useScreens = () => {
  return {
    Welcome,
    Login,
    Forgot,
    Register,
    Home,
    Account,
    AccountDetail,
    AccountCreate,
  };
};

export default useScreens;
