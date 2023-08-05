import {
    DirectionArea,
    InputField,
    PasswordCriteria,
    PWDRequisite,
    SsoForm,
    SubmitButton,
} from '@/components'

import SsoLayout from '@/layouts/sso'
import { useSignUp } from '@/services/auth'
import { SignUpForm } from '@/types'
import { SignUpSchema } from '@/validations'
import { yupResolver } from '@hookform/resolvers/yup'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { IconButton, InputAdornment, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import React from 'react'

import { useForm } from 'react-hook-form'
const SignUpContainer = () => {
    const theme = useTheme()

    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    const router = useRouter()
    const { mutateAsync: signUp, isLoading } = useSignUp()

    const [passwordCriteria, setPasswordCriteria] = React.useState<PasswordCriteria>({
        lowerCase: false,
        upperCase: false,
        number: false,
        specialChar: false,
        pwdLength: false,
    })
    const initialValues = React.useMemo(
        () => ({
            email: '',
            firstName: '',
            lastName: '',
            password: '',
        }),
        []
    )
    const {
        control,
        handleSubmit,
        formState: { isSubmitting, isValid },
        watch,
    } = useForm<SignUpForm>({
        mode: 'onChange',
        defaultValues: initialValues,
        resolver: yupResolver(SignUpSchema),
    })

    const handleFormSubmit = React.useCallback(async (formValues: SignUpForm) => {
        try {
            await signUp(formValues)

            router.push('/login')
        } catch (error: any) {
            console.log('error', error)
        }
    }, [])
    const handleClickShowPassword = React.useCallback(() => {
        setShowPassword((showPassword) => !showPassword)
    }, [])
    const handleMouseDownPassword = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault()
        },
        []
    )
    const watchPassword = watch('password')
    const handleOnKeyUp = () => {
        const lowerCase = /[a-z]/.test(watchPassword)
        const upperCase = /[A-Z]/.test(watchPassword)
        const number = /[0-9]/.test(watchPassword)
        const specialChar = /[!@#$%^&*]/.test(watchPassword)
        const pwdLength = watchPassword.length >= 8
        setPasswordCriteria({
            lowerCase,
            upperCase,
            number,
            specialChar,
            pwdLength,
        })
    }

    return (
        <SsoLayout
            title="Sign up"
            showPolicy={true}
            sx={{
                padding: {
                    xs: '120px 0 60px',
                    [theme.breakpoints.up(1600)]: {
                        padding: 0,
                        margin: 'auto',
                    },
                    md: '137px 0 103px',
                },
            }}
        >
            <SsoForm onSubmit={handleSubmit(handleFormSubmit)}>
                <Stack spacing={3}>
                    <InputField
                        id="email-address"
                        name="email"
                        inputLabel="Email address"
                        placeholder="name@gmail.com"
                        control={control}
                        sx={{
                            width: 384,
                            height: 44,
                            marginTop: 0,
                            marginBottom: 0.5,
                            [theme.breakpoints.down('sm')]: {
                                width: 320,
                            },
                            [theme.breakpoints.down(480)]: {
                                width: 280,
                            },
                        }}
                    />

                    <InputField
                        id="firstName"
                        name="firstName"
                        inputLabel="First Name"
                        placeholder="Jack"
                        control={control}
                        sx={{
                            width: 384,
                            height: 44,
                            marginTop: 0,
                            marginBottom: 0.5,
                            [theme.breakpoints.down('sm')]: {
                                width: 320,
                            },
                            [theme.breakpoints.down(480)]: {
                                width: 280,
                            },
                        }}
                    />

                    <InputField
                        id="lastName"
                        name="lastName"
                        inputLabel="Last Name"
                        placeholder="Weng"
                        control={control}
                        sx={{
                            width: 384,
                            height: 44,
                            marginTop: 0,
                            marginBottom: 0.5,
                            [theme.breakpoints.down('sm')]: {
                                width: 320,
                            },
                            [theme.breakpoints.down(480)]: {
                                width: 280,
                            },
                        }}
                    />
                    <InputField
                        id="password"
                        name="password"
                        control={control}
                        inputLabel="Password"
                        placeholder="Password"
                        type={showPassword ? 'text' : 'password'}
                        onKeyUp={handleOnKeyUp}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOffOutlinedIcon
                                                sx={{ width: 20, height: 20 }}
                                            />
                                        ) : (
                                            <VisibilityOutlinedIcon
                                                sx={{ width: 20, height: 20 }}
                                            />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            width: 384,
                            height: 44,
                            marginTop: 0,
                            marginBottom: 0.5,
                            [theme.breakpoints.down('sm')]: {
                                width: 320,
                            },
                            [theme.breakpoints.down(480)]: {
                                width: 280,
                            },
                        }}
                    />
                    <PWDRequisite passwordCriteria={passwordCriteria} />
                </Stack>

                <SubmitButton
                    sx={{ width: 384, height: 44, marginBottom: 3 }}
                    disabled={isSubmitting}
                    loading={isLoading}
                >
                    &nbsp;Sign up
                </SubmitButton>
                <DirectionArea
                    directionCaption="Already have an account?"
                    directionRedirectText="Login"
                    route="login"
                />
            </SsoForm>
        </SsoLayout>
    )
}
export default SignUpContainer
