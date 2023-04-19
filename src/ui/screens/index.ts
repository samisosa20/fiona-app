import Welcome from './Auth/Welcome';
import Login from './Auth/Login';
import Forgot from './Auth/Forgot';
import Register from './Auth/Register';
import Home from './Home';
import Account from './Account';
import AccountDetail from './Account/Detail';
import AccountCreate from './Account/Create';
import Event from './Event';
import EventDetail from './Event/Detail';
import EventCreate from './Event/Create';
import Heritage from './Heritage';
import HeritageDetail from './Heritage/Detail';
import HeritageCreate from './Heritage/Create';

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
    Event,
    EventDetail,
    EventCreate,
    Heritage,
    HeritageDetail,
    HeritageCreate,
  };
};

export default useScreens;
