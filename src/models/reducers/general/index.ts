import useHelpers from '../../../helpers'
import useStrings from '../../../strings'
import useInitialStates from '../../initialstates'

const useGeneralReducers = () => {
    const { useCreateReducer } = useHelpers()
    const { createReducer } = useCreateReducer()

    const { useGeneralInitialStates } = useInitialStates()
    const { initialStateAuth } = useGeneralInitialStates()

    const { useGeneralTypes } = useStrings()
    const {
        SHOW,
        HIDDEN,
    } = useGeneralTypes()

    const toast = createReducer(initialStateAuth, {
        [SHOW](state: any, action: any) {
            const { payload } = action
            return {
                ...state,
                show: true,
                status: payload.status,
                message: payload.message,
            }
        },
        [HIDDEN]() {
            return initialStateAuth
        },
    })

    return { toast }
}

export default useGeneralReducers
