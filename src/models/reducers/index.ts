import { combineReducers } from 'redux'
import useAuthReducers from './auth'
import useGeneralReducers from './general'

const { auth } = useAuthReducers()
const { toast } = useGeneralReducers()

const useReducers = () => {
    return combineReducers({
        auth,
        toast,
    })
}

export default useReducers
