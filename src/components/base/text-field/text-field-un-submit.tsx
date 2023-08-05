import { Box, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { InputHTMLAttributes } from 'react'
export interface InputFieldUnSubmitProps extends InputHTMLAttributes<HTMLInputElement> {
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
        height: 44,
        borderRadius: 4,
        borderColor: 'rgba(233, 233, 240, 1)',
    },
    '& input:valid + fieldset': {
        borderColor: 'rgba(233, 233, 240, 1)',
    },

    '& .MuiFormLabel-root': {
        fontFamily: 'Linik Sans',
        fontSize: '14px',
        borderColor: 'rgba(233, 233, 240, 1)',
    },
    '&:focus .MuiFormLabel-root': {
        color: theme.palette.primary['main'] + ' !important',
    },
}))

const StyledInputLabel = styled(Typography)(({ theme }) => ({
    color: 'rgba(35, 34, 51, 1)',
    fontFamily: 'Linik Sans Semi Bold',
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 600,
    marginBottom: 6,
}))

export function InputFieldUnSubmit({
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
}: InputFieldUnSubmitProps) {
    return (
        <Box>
            {inputLabel && <StyledInputLabel>{inputLabel}</StyledInputLabel>}
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
