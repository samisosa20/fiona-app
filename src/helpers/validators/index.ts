import * as Yup from 'yup'

import usePatterns from '../patterns'

const useValidators = () => {
    // Helpers
    const { emailPattern, lettersPattern } = usePatterns()

    const loginValidator = Yup.object({
        email: Yup.string()
        .required('Campo requerido.')
        .matches(emailPattern, 'Formato incorrecto.'),
        password: Yup.string()
        .required('Campo requerido.')
        .min(8, 'La contraseña es muy corta.')
    })
    
    const forgotValidator = Yup.object({
        email: Yup.string()
        .required('Campo requerido.')
        .matches(emailPattern, 'Formato incorrecto.'),
    })
    
    const registerValidator = Yup.object({
        name: Yup.string()
        .required('Campo requerido.')
        .matches(lettersPattern, 'Formato incorrecto.'),
        email: Yup.string()
        .required('Campo requerido.')
        .matches(emailPattern, 'Formato incorrecto.'),
        password: Yup.string()
        .required('Campo requerido.')
        .min(8, 'La contraseña es muy corta.'),
        passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    })

    return {
        loginValidator,
        forgotValidator,
        registerValidator
    }
}

export default useValidators