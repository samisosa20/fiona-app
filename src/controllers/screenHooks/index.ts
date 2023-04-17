import useLogin from './auth/login'
import useForgot from './auth/forgot'
import useRegister from './auth/register'
import useHome from './home'

const useScreenHooks = () => {
    return {
        useLogin,
        useForgot,
        useRegister,
        useHome,
    }
}

export default useScreenHooks