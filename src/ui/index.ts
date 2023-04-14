import useComponents from './components'
import useLayouts from './layouts'
import useScreens from './screens'

const useViews = () => {
    return {
        useScreens,
        useLayouts,
        useComponents,
    }
}

export default useViews
