import useLogin from './auth/login'
import useForgot from './auth/forgot'
import useRegister from './auth/register'
import useHome from './home'
import useAccount from './account'
import useAccountDetail from './account/detail'

const useScreenHooks = () => {
    return {
        useLogin,
        useForgot,
        useRegister,
        useHome,
        useAccount,
        useAccountDetail,
    }
}

export default useScreenHooks