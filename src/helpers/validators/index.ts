import * as Yup from 'yup'

import usePatterns from '../patterns'

const useValidators = () => {
    // Helpers
    const { emailPattern, lettersPattern, numbersPattern } = usePatterns()

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
    
    const accountValidator = Yup.object({
        name: Yup.string()
        .required('Campo requerido.')
        .matches(lettersPattern, 'Formato incorrecto.'),
        description: Yup.string().nullable(),
        type: Yup.string()
        .required('Campo requerido.'),
        badge_id: Yup.string()
        .required('Campo requerido.'),
        init_amount: Yup.number()
        .typeError("Formato incorrecto")
            .default(undefined)
            .transform((curr, orig) => (orig === "" ? 0 : curr))
    })

    const eventValidator = Yup.object({
        name: Yup.string()
        .required('Campo requerido.'),
        end_event: Yup.string().required('Campo requerido.'),
    })

    return {
        loginValidator,
        forgotValidator,
        registerValidator,
        accountValidator,
        eventValidator,
    }
}

export default useValidators