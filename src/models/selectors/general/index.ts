import useHelpers from '../../../helpers'
import { useSelector } from 'react-redux'

const useGeneralSelectors = () => {
    const { useCreateSelector } = useHelpers()
    const { createSelector } = useCreateSelector()

    const toastSelector = () =>
        useSelector(
            createSelector(
                (state: any) => state.toast,
                toast => toast
            )
        )

    return {
        toastSelector,
    }
}

export default useGeneralSelectors
