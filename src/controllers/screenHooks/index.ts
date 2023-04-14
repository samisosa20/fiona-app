import useLogin from './auth/login'
import useForgot from './auth/forgot'
import useRegister from './auth/register'
import useAccount from './account'

const useScreenHooks = () => {
    return {
        useLogin,
        useForgot,
        useRegister,
        useAccount,
    }
}

export default useScreenHooks