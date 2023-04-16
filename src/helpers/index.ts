import useValidators from './validators'
import usePatterns from './patterns'
import useQuickFunctions from './quickFunctions'

const useHelpers = () => {
    return {
        useValidators,
        usePatterns,
        useQuickFunctions,
    }
}

export default useHelpers