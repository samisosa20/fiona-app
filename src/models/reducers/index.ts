import { combineReducers } from 'redux'
import useAuthReducers from './auth'
import useGeneralReducers from './general'

const { auth } = useAuthReducers()
const { general } = useGeneralReducers()

const useReducers = () => {
    return combineReducers({
        auth,
        general,
    })
}

export default useReducers
