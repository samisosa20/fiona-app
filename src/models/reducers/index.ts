import { combineReducers } from 'redux'
import useAuthReducers from './auth'

const { auth } = useAuthReducers()

const useReducers = () => {
    return combineReducers({
        auth,
    })
}

export default useReducers
