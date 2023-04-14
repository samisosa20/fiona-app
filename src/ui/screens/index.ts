import Home from "./Auth/Home"
import Login from "./Auth/Login"
import Forgot from "./Auth/Forgot"
import Register from "./Auth/Register"

const useScreens = () => {
    return {
        Home,
        Login,
        Forgot,
        Register,
    }
}

export default useScreens