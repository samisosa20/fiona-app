import { useDispatch } from 'react-redux'
import useAuthActions from './auth'
import useAccountActions from './account'
import useMovementActions from './movement'
import useGeneralActions from './general'

const useActions = () => {
    const dispatch = useDispatch()

    return {
        dispatch,
        useAuthActions,
        useAccountActions,
        useMovementActions,
        useGeneralActions,
    }
}

export default useActions
