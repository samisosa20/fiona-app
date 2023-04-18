import useStrings from '../../../strings'
import useProviders from '../../providers'

import { AppDispatch } from "../../../config/redux"


const useLoginActions = () => {

    // Providers
    const { useAuthProviders } = useProviders()
    const { loginProvider, registerProvider } = useAuthProviders()

    // Types
    const { useAuthTypes } = useStrings()
    const { LOGIN, LOG_OUT } = useAuthTypes()

    const actLogin =
        (data: {email: string; password: string}, onSuccess: Function = () => {}, onError: Function = () => {}) =>
        async (dispatch: AppDispatch) => {
            try {
                const response = await loginProvider(data)
                if (response.status !== 200) throw response
                dispatch({ type: LOGIN, payload: response.data })
                onSuccess && onSuccess(response)
            } catch (e) {
                onError && onError(e)
            }
        }
    
    const actRegister =
        (data: {email: string; password: string; name: string;}, onSuccess: Function = () => {}, onError: Function = () => {}) =>
        async (dispatch: AppDispatch) => {
            try {
                const response = await registerProvider(data)
                if (response.status !== 200) throw response
                dispatch({ type: LOGIN, payload: response.data })
                onSuccess && onSuccess(response)
            } catch (e) {
                onError && onError(e)
            }
        }

    const actLogout = () => async (dispatch: AppDispatch) => {
        dispatch({
            type: LOG_OUT,
        })
    }

    return {
        actLogin,
        actLogout,
        actRegister,
    }
}

export default useLoginActions
