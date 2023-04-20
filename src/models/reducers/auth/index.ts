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
        EDIT_PROFILE,
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
        [EDIT_PROFILE](state: any, action: any) {
            const { payload } = action
            return {
                ...state,
                name: payload.data.name,
                email: payload.data.email,
            }
        },
        [LOG_OUT]() {
            return {
                auth_token: null,
                name: null,
                email: null,
            }
        },
    })

    return { auth }
}

export default useAuthReducers
