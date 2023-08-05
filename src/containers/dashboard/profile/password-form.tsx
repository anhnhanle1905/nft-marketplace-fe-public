import React from 'react'
import { Eye, EyeSlash } from '@/assets/icons'
import { NextImage, PasswordCriteria } from '@/components'
import { IconButton, InputAdornment, Stack, useTheme } from '@mui/material'
import { UpdateProfileInputField } from '@/components/base/update-profile/text-field'
import { UpdateProfilePWDRequisite } from '@/components/base/update-profile/pwd-requisite'

interface PasswordFormProps {
    control: any
    watchPassword: any
}

export const PasswordForm = ({ control, watchPassword }: PasswordFormProps) => {
    const theme = useTheme()

    const [showOldPassword, setOldShowPassword] = React.useState<boolean>(false)
    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const [passwordCriteria, setPasswordCriteria] = React.useState<PasswordCriteria>({
        lowerCase: false,
        upperCase: false,
        number: false,
        specialChar: false,
        pwdLength: false,
    })

    const handleClickOldShowPassword = React.useCallback(() => {
        setOldShowPassword((showOldPassword) => !showOldPassword)
    }, [])

    const handleMouseDownOldPassword = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault()
        },
        []
    )

    const handleClickShowPassword = React.useCallback(() => {
        setShowPassword((showPassword) => !showPassword)
    }, [])

    const handleMouseDownPassword = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault()
        },
        []
    )

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
        <form>
            <Stack direction="column" spacing={3}>
                <UpdateProfileInputField
                    id="password"
                    name="password"
                    control={control}
                    inputLabel="Old Password"
                    type={showOldPassword ? 'text' : 'password'}
                    onKeyUp={handleOnKeyUp}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickOldShowPassword}
                                    onMouseDown={handleMouseDownOldPassword}
                                    edge="end"
                                >
                                    {showOldPassword ? (
                                        <NextImage src={Eye} width={20} height={20} alt="eye" />
                                    ) : (
                                        <NextImage
                                            src={EyeSlash}
                                            width={20}
                                            height={20}
                                            alt="eye-slash"
                                        />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        height: 48,
                        width: 744,
                        marginTop: 0,
                        marginBottom: 0.5,
                        [theme.breakpoints.down(1220)]: {
                            width: '100%',
                        },
                    }}
                />
                <UpdateProfileInputField
                    id="new_password"
                    name="newPassword"
                    control={control}
                    inputLabel="New Password"
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
                                        <NextImage src={Eye} width={20} height={20} alt="eye" />
                                    ) : (
                                        <NextImage
                                            src={EyeSlash}
                                            width={20}
                                            height={20}
                                            alt="eye-slash"
                                        />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        height: 48,
                        width: 744,
                        marginTop: 0,
                        marginBottom: 0.5,
                        [theme.breakpoints.down(1220)]: {
                            width: '100%',
                        },
                    }}
                />
                <UpdateProfilePWDRequisite passwordCriteria={passwordCriteria} />
            </Stack>
        </form>
    )
}
