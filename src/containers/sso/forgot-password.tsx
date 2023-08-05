import { InputField, SsoForm, SubmitButton } from '@/components'
import SsoLayout from '@/layouts/sso'
import { useForgotPassword } from '@/services/auth'
import { ForgotPasswordForm } from '@/types'
import { ForgotPasswordSchema } from '@/validations'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

const ForgotPasswordContainer = () => {
    const theme = useTheme()
    const initialValues: ForgotPasswordForm = {
        email: '',
    } as ForgotPasswordForm

    const { mutateAsync: forgotPassword, isLoading } = useForgotPassword()

    const router = useRouter()

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ForgotPasswordForm>({
        mode: 'onChange',
        defaultValues: initialValues,
        resolver: yupResolver(ForgotPasswordSchema),
    })

    const handleFormSubmit = (formValues: ForgotPasswordForm) => {
        forgotPassword(formValues)
            .then(() => {
                // resetPassword(formValues.email)
                router.push('/login')
            })
            .catch((err) => {
                console.error(err)
            })

        console.log(formValues)
    }

    return (
        <SsoLayout
            title="Forgot your password"
            showPolicy={false}
            titleLeft={true}
            topRedirect={true}
        >
            <SsoForm onSubmit={handleSubmit(handleFormSubmit)}>
                <Box sx={{ marginBottom: 5 }}>
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
                </Box>

                <SubmitButton
                    sx={{
                        width: { xs: '100%', md: '384px' },
                        height: 44,
                        fontFamily: 'Linik Sans',
                        fontWeight: 700,
                    }}
                    disabled={isSubmitting}
                    loading={isLoading}
                >
                    &nbsp;Send email
                </SubmitButton>
            </SsoForm>
        </SsoLayout>
    )
}

export default ForgotPasswordContainer
