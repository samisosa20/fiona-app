import useLogin from './auth/login'
import useForgot from './auth/forgot'
import useRegister from './auth/register'

const useScreenHooks = () => {
    return {
        useLogin,
        useForgot,
        useRegister,
    }
}

export default useScreenHooks