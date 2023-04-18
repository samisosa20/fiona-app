import useAuthProviders from './auth'
import useAccountProviders from './account'
import useMovementProviders from './movement'
import useGeneralProviders from './general'

const useProviders = () => {
    return {
        useAuthProviders,
        useAccountProviders,
        useMovementProviders,
        useGeneralProviders,
    }
}

export default useProviders
