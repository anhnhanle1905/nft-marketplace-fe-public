import { UpdateProfileInputFieldUnSubmit } from '@/components/base/update-profile/text-field-un-submit'
import { useN2ArenaStore } from '@/store/n2Arena_store'
import { UpdatePasswordForm } from '@/types'
import { Box, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import { PasswordForm } from './password-form'
import { SubmitButton } from '@/components'
import { yupResolver } from '@hookform/resolvers/yup'
import { UpdateInfoSchema, UpdatePasswordSchema } from '@/validations'
import { useForm } from 'react-hook-form'
import { useUpdatePassword } from '@/services/users'
import { toast } from 'react-toastify'

export const BaseInfo = () => {
    const theme = useTheme()
    const { me } = useN2ArenaStore()

    const passwordDefaultValues: UpdatePasswordForm = {
        password: '',
        newPassword: '',
    }

    const { mutateAsync: updatePassword } = useUpdatePassword()

    // control password form
    const {
        control: changePasswordControl,
        handleSubmit: handleSubmitChangePassword,
        formState: { isSubmitting: isSubmittingChangePassword, isDirty: isDirtyChangePassword },
        watch,
        reset: resetChangePasswordForm,
    } = useForm<UpdatePasswordForm>({
        defaultValues: passwordDefaultValues,
        resolver: yupResolver(UpdatePasswordSchema),
    })

    const handleChangePasswordFormSubmit = async (formValues: UpdatePasswordForm) => {
        try {
            await updatePassword(formValues)
            toast.success('Password updated successfully')
            resetChangePasswordForm(passwordDefaultValues)
        } catch (error) {
            toast.error(`${error}`)
        }
    }

    const triggerSubmit = () => {
        if (isDirtyChangePassword) handleSubmitChangePassword(handleChangePasswordFormSubmit)()
    }

    return (
        <>
            <form>
                <Stack direction="column" spacing={3} marginBottom="24px">
                    <UpdateProfileInputFieldUnSubmit
                        id="email-address"
                        inputLabel="Email Address"
                        placeholder="name@gmail.com"
                        sx={{
                            marginTop: 0,
                            marginBottom: 0.5,
                            width: 744,
                            [theme.breakpoints.down(1220)]: {
                                width: '100%',
                            },
                            input: { cursor: 'not-allowed' },
                        }}
                        value={me?.email}
                        disabled
                    />
                    <UpdateProfileInputFieldUnSubmit
                        id="first_name"
                        name="first_name"
                        inputLabel="First Name"
                        placeholder="Join"
                        sx={{
                            marginTop: 0,
                            marginBottom: 0.5,
                            width: 744,
                            [theme.breakpoints.down(1220)]: {
                                width: '100%',
                            },
                            input: { cursor: 'not-allowed' },
                        }}
                        value={me?.firstName}
                        disabled
                    />
                    <UpdateProfileInputFieldUnSubmit
                        id="last_name"
                        name="last_name"
                        inputLabel="Last Name"
                        sx={{
                            marginTop: 0,
                            marginBottom: 0.5,
                            width: 744,
                            [theme.breakpoints.down(1220)]: {
                                width: '100%',
                            },
                            input: { cursor: 'not-allowed' },
                        }}
                        value={me?.lastName}
                        disabled
                    />
                </Stack>
            </form>
            <PasswordForm control={changePasswordControl} watchPassword={watch('newPassword')} />

            <Box sx={{ textAlign: 'right', marginBottom: '80px' }}>
                <SubmitButton
                    disabled={isSubmittingChangePassword || !isDirtyChangePassword}
                    // loading={isLoading}
                    sx={{
                        width: 142,
                        height: 48,
                        [theme.breakpoints.down(600)]: {
                            width: '100%',
                        },
                    }}
                    onClick={triggerSubmit}
                >
                    Save
                </SubmitButton>
            </Box>
        </>
    )
}
