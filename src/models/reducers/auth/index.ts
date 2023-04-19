import useHelpers from '../../../helpers'
import useStrings from '../../../strings'
import useInitialStates from '../../initialstates'

const useAuthReducers = () => {
    const { useCreateReducer } = useHelpers()
    const { createReducer } = useCreateReducer()

    const { useAuthInitialStates } = useInitialStates()
    const { initialStateAuth } = useAuthInitialStates()

    const { useAuthTypes } = useStrings()
    const {
        LOGIN,
        LOG_OUT,
    } = useAuthTypes()

    const auth = createReducer(initialStateAuth, {
        [LOGIN](state: any, action: any) {
            const { payload } = action
            return {
                ...state,
                auth_token: payload.token,
                name: payload.data.name,
                email: payload.data.email,
            }
        },
        [LOG_OUT]() {
            console.log('LOG_OUT')
            return initialStateAuth
        },
    })

    return { auth }
}

export default useAuthReducers
