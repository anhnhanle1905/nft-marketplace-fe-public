import { Box, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { InputHTMLAttributes } from 'react'

export interface UpdateProfileInputFieldUnSubmitProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    InputProps?: any
    inputLabel?: string
    [x: string]: any
    onKeyUp?: () => void
}

const CustomInputUnSubmit = styled(TextField)(({ theme }) => ({
    marginBottom: '0 !important',
    color: 'rgba(35, 34, 51, 1)',
    '& .MuiTextField-root': {
        marginTop: 0,
    },
    '& .MuiOutlinedInput-root:hover': {
        '& > fieldset': {
            // borderColor: `${theme.palette.secondary['light']}`,
            border: `1px solid ${theme.palette.secondary['light']}`,
        },
    },
    '& .MuiOutlinedInput-root::placeholder': {
        color: 'rgba(175, 174, 184, 1)',
    },
    '& .MuiInputBase-root': {
        borderColor: 'rgba(233, 233, 240, 1)',
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
        '& > fieldset': {
            border: `1px solid ${theme.palette.primary['main']}`,
        },
    },
    '& .MuiOutlinedInput-root': {
        height: 48,
        borderRadius: 4,
        borderColor: 'rgba(233, 233, 240, 1)',
    },
    '& input:valid + fieldset': {
        borderColor: 'rgba(233, 233, 240, 1)',
        '&:disabled': {
            borderColor: 'rgba(233, 233, 240, 1)',
        },
    },

    '& .MuiFormLabel-root': {
        fontFamily: 'Linik Sans',
        fontSize: '14px',
        borderColor: 'rgba(233, 233, 240, 1)',
    },
    '&:focus .MuiFormLabel-root': {
        color: theme.palette.primary['main'] + ' !important',
    },
    '& .MuiInputBase-root.Mui-disabled': {
        borderColor: 'rgba(233, 233, 240, 1)',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        border: '2px solid rgba(233, 233, 240, 1)',
    },
}))

const UpdateProfileUnSubmitInputLabel = styled(Typography)(({ theme }) => ({
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

export function UpdateProfileInputFieldUnSubmit({
    id,
    name,
    control,
    label,
    InputProps,
    inputLabel,
    value,
    sx,
    onKeyUp,
    ...inputProps
}: UpdateProfileInputFieldUnSubmitProps) {
    return (
        <Box>
            {inputLabel && (
                <UpdateProfileUnSubmitInputLabel>{inputLabel}</UpdateProfileUnSubmitInputLabel>
            )}
            <CustomInputUnSubmit
                id={id}
                fullWidth
                size="small"
                margin="normal"
                value={value}
                onKeyUp={onKeyUp}
                variant="outlined"
                label={label}
                InputProps={InputProps}
                inputProps={inputProps}
                sx={sx}
            />
        </Box>
    )
}
