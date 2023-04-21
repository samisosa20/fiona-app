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
import Report from './Report';
import Setting from './Setting';
import Profile from './Profile';
import Category from './Category';
import CategoryDetail from './Category/Detail';
import CategoryCreate from './Category/Create';
import Movement from './Movement';

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
    Report,
    Setting,
    Profile,
    Category,
    CategoryDetail,
    CategoryCreate,
    Movement
  };
};

export default useScreens;
