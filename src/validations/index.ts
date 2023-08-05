import * as yup from 'yup'

const passwordValidations = yup
    .string()
    .required('Please enter your password')
    .min(8, 'Type at least 8 characters')
    .max(20, 'Exceeded 20 characters')
    .matches(
        /(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'Password must contains all conditions below:'
    )

export const HomeSchema = yup.object().shape({
    email: yup.string().required('Please enter your email').email('Must be an email'),
})

export const LoginSchema = yup.object().shape({
    email: yup.string().required('Please enter your email').email('Must be an email'),
    password: yup
        .string()
        .required('Please enter your password')
        .min(8, 'Type at least 8 characters.'),
})

export const SignUpSchema = yup.object().shape({
    email: yup.string().required('Please enter your email').email('Must be an email'),
    firstName: yup.string().required('Please enter your first name'),
    lastName: yup.string().required('Please enter your last name'),
    password: passwordValidations,
})

export const ForgotPasswordSchema = yup.object().shape({
    email: yup.string().required('Please enter your email').email('Must be an email'),
})

export const ResetPasswordSchema = yup.object().shape({
    password: passwordValidations,
})

export const UpdateInfoSchema = yup.object().shape({
    firstName: yup.string().required('Please enter your first name'),
    lastName: yup.string().required('Please enter your last name'),
})

export const UpdatePasswordSchema = yup.object().shape({
    newPassword: passwordValidations,
    password: passwordValidations,
})
