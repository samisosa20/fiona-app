import { useSelector } from 'react-redux'
import useAuthSelectors from './auth'

const useSelectors = () => {
    return {
        useSelector,
        useAuthSelectors,
    }
}

export default useSelectors
