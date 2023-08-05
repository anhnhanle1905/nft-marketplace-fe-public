import { Box, Typography, styled } from '@mui/material'

// @ts-ignore
const Input = styled('input')(({ theme, error }) => ({
    boxSizing: 'border-box',
    fontSize: '16px',
    lineHeight: '21px',
    color: '#232233',
    border: `1px solid ${!error ? '#E9E9F0' : theme.palette.error.main}`,
    borderRadius: '4px',
    padding: '10px 16px',
    width: '100%',
    '&::placeholder': {
        color: '#AFAEB8',
    },
    '&:hover': {
        outline: 'none',
        borderColor: '#BEC1FC',
    },
    '&:focus': {
        outline: 'none',
        borderColor: theme.palette.primary.main,
    },
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        minWidth: 'unset',
    },
}))

interface TextFieldWithLabelProps {
    label?: string
    // All other props
    [x: string]: any
}

export const TextFieldWithLabel = ({
    label,
    error,
    register,
    validationSchema,
    name,
    submitted,
    ...others
}: TextFieldWithLabelProps) => {
    return (
        <Box mb="24px">
            <Box>
                <Typography textAlign="left" fontSize="14px" fontWeight={600} mb="6px">
                    {label}
                </Typography>
                <Input
                    {...register(name, validationSchema)}
                    {...others}
                    disabled={submitted}
                    error={error}
                />
            </Box>
            {error && (
                <Typography variant="h6" textAlign="left" marginTop="6px" color="error.main">
                    {error?.message}
                </Typography>
            )}
        </Box>
    )
}
