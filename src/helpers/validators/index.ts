import * as Yup from 'yup'

import usePatterns from '../patterns'

const useValidators = () => {
    // Helpers
    const { emailPattern } = usePatterns()

    const loginValidator = Yup.object({
        email: Yup.string()
        .required('Campo requerido.')
        .matches(emailPattern, 'Formato incorrecto.'),
        password: Yup.string()
        .required('Campo requerido.')
        .min(8, 'La contraseña es muy corta.')
    })

    return {
        loginValidator,
    }
}

export default useValidators