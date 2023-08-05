import { Error } from '@/components'
import { Box, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { InputHTMLAttributes } from 'react'
import { Control, useController } from 'react-hook-form'

export interface UpdateProfileInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    control?: Control<any>
    label?: string
    InputProps?: any
    inputLabel?: string
    [x: string]: any
    onKeyUp?: () => void
}

const UpdateProfileInput = styled(TextField)(({ theme }) => ({
    marginBottom: '0 !important',
    color: 'rgba(35, 34, 51, 1)',
    '& input.Mui-disabled': {
        border: '2px solid rgba(233, 233, 240, 1)',
        // borderColor: 'rgba(233, 233, 240, 1)'
    },
    '& .MuiTextField-root': {
        marginTop: 0,
        '& $disabled': {
            border: '2px solid rgba(233, 233, 240, 1)',
        },
    },
    '& .MuiOutlinedInput-root:hover': {
        '& > fieldset': {
            border: `1px solid ${theme.palette.secondary['light']} !important`,
        },
    },
    '& .MuiOutlinedInput-root::placeholder': {
        color: 'rgba(175, 174, 184, 1)',
    },
    '& .MuiInputBase-root': {
        // border: '2px solid rgba(233, 233, 240, 1)',
        borderColor: 'rgba(233, 233, 240, 1)',
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
        '& > fieldset': {
            border: `1px solid ${theme.palette.primary['main']} !important`,
            // borderColor: 'rgba(233, 233, 240, 1)'
        },
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        border: '2px solid rgba(233, 233, 240, 1)',
    },
    '& .MuiOutlinedInput-root': {
        height: 48,
        borderRadius: 4,
        // border: '2px solid rgba(233, 233, 240, 1)',
        borderColor: 'rgba(233, 233, 240, 1)',
    },
    '& input:valid + fieldset': {
        border: '2px solid rgba(233, 233, 240, 1)',
        borderColor: 'rgba(233, 233, 240, 1)',
    },
    '& .MuiFormControl-root': {
        // border: '1px solid rgba(233, 233, 240, 1)',
    },
    '& .MuiFormLabel-root': {
        fontFamily: 'Linik Sans',
        fontSize: '14px',
        borderColor: 'rgba(233, 233, 240, 1)',
    },
    '&:focus .MuiFormLabel-root': {
        color: theme.palette.primary['main'] + ' !important',
    },

    '& .MuiFormControl-root-MuiTextField-root .MuiOutlinedInput-root': {
        '& > fieldset': { border: '2px solid rgba(233, 233, 240, 1)' },
    },
}))

const UpdateProfileInputLabel = styled(Typography)(({ theme }) => ({
    color: 'rgba(35, 34, 51, 1)',
    fontFamily: 'Linik Sans Bold',
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 700,
    marginBottom: 6,
    [theme.breakpoints.down(600)]: {
        fontSize: 14,
    },
}))

export function UpdateProfileInputField({
    id,
    name,
    control,
    label,
    InputProps,
    inputLabel,
    sx,
    onKeyUp,
    ...inputProps
}: UpdateProfileInputFieldProps) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    })
    const router = useRouter()

    return (
        <Box>
            {inputLabel && <UpdateProfileInputLabel>{inputLabel}</UpdateProfileInputLabel>}
            <UpdateProfileInput
                id={id}
                fullWidth
                size="small"
                margin="normal"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                variant="outlined"
                inputRef={ref}
                error={invalid}
                label={label}
                InputProps={InputProps}
                inputProps={inputProps}
                sx={sx}
            />
            {error && <Error error={true}>{error?.message}</Error>}
        </Box>
    )
}
