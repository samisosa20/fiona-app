import { useDispatch } from 'react-redux'
import useAuthActions from './auth'

const useActions = () => {
    const dispatch = useDispatch()

    return {
        dispatch,
        useAuthActions,
    }
}

export default useActions
