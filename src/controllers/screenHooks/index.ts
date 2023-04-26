import useLogin from './auth/login'
import useForgot from './auth/forgot'
import useRegister from './auth/register'
import useWelcome from './auth/welcome'
import useHome from './home'
import useAccount from './account'
import useAccountDetail from './account/detail'
import useAccountCreate from './account/create'
import useEvent from './event'
import useEventDetail from './event/detail'
import useEventCreate from './event/create'
import useHeritage from './heritage'
import useHeritageDetail from './heritage/detail'
import useHeritageCreate from './heritage/create'
import useSetting from './setting'
import useCategory from './category'
import useCategoryDetail from './category/detail'
import useCategoryCreate from './category/create'
import useProfile from './profile'
import useMovement from './movement'
import usePayment from './payment'
import usePaymentCreate from './payment/create'
import useReport from './report'

const useScreenHooks = () => {
    return {
        useLogin,
        useForgot,
        useRegister,
        useWelcome,
        useHome,
        useAccount,
        useAccountDetail,
        useAccountCreate,
        useEvent,
        useEventDetail,
        useEventCreate,
        useHeritage,
        useHeritageDetail,
        useHeritageCreate,
        useSetting,
        useCategory,
        useCategoryDetail,
        useCategoryCreate,
        useProfile,
        useMovement,
        usePayment,
        usePaymentCreate,
        useReport,
    }
}

export default useScreenHooks