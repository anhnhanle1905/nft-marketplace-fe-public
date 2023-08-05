import { CheckboxFiled, DirectionArea, InputField, SsoForm, SubmitButton } from '@/components'
import { auth_configs } from '@/configs/auth'
import SsoLayout from '@/layouts/sso'
import { useLogin } from '@/services/auth'
import { useN2ArenaStore } from '@/store/n2Arena_store'
import { LoginForm, Response, ResponseLogin } from '@/types'
import { LoginSchema } from '@/validations'
// import { LoginSchema } from '@/validations'
import { yupResolver } from '@hookform/resolvers/yup'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Box, IconButton, InputAdornment, Stack } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
// import debounce from 'debounce'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
const ForgotPasswordLink = styled(Link)(({ theme }) => ({
    fontWeight: 'normal',
    color: theme.palette.primary['main'],
    fontFamily: 'Linik Sans Semi Bold',
    fontSize: 14,
    lineHeight: '20px',
    '&:hover': {
        textDecoration: 'underline',
    },
    [theme.breakpoints.down(480)]: {
        fontSize: 12,
    },
}))

const LoginContainer = () => {
    const theme = useTheme()
    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const { storeUser } = useN2ArenaStore()
    const router = useRouter()

    const { mutateAsync: login, isLoading } = useLogin()

    const initialValues: LoginForm = React.useMemo(
        () => ({
            email: '',
            password: '',
        }),
        []
    )

    const {
        control,
        handleSubmit,
        trigger,
        formState: { isSubmitting, isValid },
    } = useForm<LoginForm>({
        mode: 'onChange',
        defaultValues: initialValues,
        resolver: yupResolver(LoginSchema),
    })

    const handleFormSubmit = (formValues: LoginForm) => {
        login(formValues)
            .then((response: Response<ResponseLogin>) => {
                const { data } = response
                localStorage.setItem(auth_configs.storageTokenKeyName, data.token)

                router.push('/marketplace')
                console.log('data', data?.payload)
                storeUser(data?.payload)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const handleClickShowPassword = () => {
        setShowPassword((showPassword) => !showPassword)
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return (
        <SsoLayout
            title="Welcome!"
            showPolicy={true}
            sx={{ padding: { xs: '120px 0 60px', md: '137px 0 103px' } }}
        >
            <SsoForm onSubmit={handleSubmit(handleFormSubmit)}>
                <Stack spacing={3} mb="7px">
                    <InputField
                        id="email-address"
                        name="email"
                        inputLabel="Email address"
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
                        type={showPassword ? 'text' : 'password'}
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
                                            <VisibilityOutlinedIcon fontSize="small" />
                                        ) : (
                                            <VisibilityOffOutlinedIcon fontSize="small" />
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
                </Stack>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '32px',
                    }}
                >
                    <CheckboxFiled label="Remember me" />
                    <ForgotPasswordLink href={'/forgot-password'}>
                        Forgot password
                    </ForgotPasswordLink>
                </Box>
                <SubmitButton
                    sx={{
                        width: 384,
                        height: 44,
                        marginBottom: 3,
                        fontFamily: 'Linik Sans Bold',
                    }}
                    disabled={isSubmitting}
                    loading={isLoading}
                >
                    &nbsp;Login
                </SubmitButton>

                <DirectionArea
                    directionCaption="Don’t have an account?"
                    directionRedirectText="Sign up"
                    route="sign-up"
                />
            </SsoForm>
        </SsoLayout>
    )
}

export default LoginContainer
