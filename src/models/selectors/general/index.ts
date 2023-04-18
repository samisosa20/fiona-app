import useHelpers from '../../../helpers'
import { useSelector } from 'react-redux'

const useGeneralSelectors = () => {
    const { useCreateSelector } = useHelpers()
    const { createSelector } = useCreateSelector()

    const currencySelector = () =>
        useSelector(
            createSelector(
                (state: any) => state.general,
                general => general.currencies
            )
        )
    
    const gorupSelector = () =>
        useSelector(
            createSelector(
                (state: any) => state.groups,
                groups => groups
            )
        )

    return {
        currencySelector,
        gorupSelector,
    }
}

export default useGeneralSelectors
