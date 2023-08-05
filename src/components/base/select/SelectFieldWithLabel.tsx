import { Box, Typography, Select, MenuItem } from '@mui/material'

interface SelectFieldWithLabelProps {
    label?: string
    // All other props
    [x: string]: any
}

export const SelectFieldWithLabel = ({
    children,
    error,
    register,
    name,
    label,
    submitted,
    validationSchema,
    options = [],
    ...others
}: SelectFieldWithLabelProps) => {
    return (
        <Box mb="24px">
            <Box>
                <Typography textAlign="left" fontSize="14px" fontWeight={600} mb="6px">
                    {label}
                </Typography>
                <Select
                    {...register(name, validationSchema)}
                    {...others}
                    disabled={submitted}
                    error={Boolean(error)}
                    sx={{
                        width: '100%',
                        fontSize: '16px',
                        lineHeight: '21px',
                        color: '#232233',
                        borderRadius: '4px',
                        height: '43px',
                        textAlign: 'left',
                        '.MuiSelect-select': {
                            padding: '0 0 0 16px',
                        },
                        fieldset: {
                            border: `1px solid ${!error ? '#E9E9F0' : 'error.main'}`,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#BEC1FC',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main',
                            borderWidth: '1px',
                        },
                    }}
                >
                    {options.map((option: string) => (
                        <MenuItem value={option} key={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            {error && (
                <Typography variant="h6" textAlign="left" marginTop="6px" color="error.main">
                    {error?.message}
                </Typography>
            )}
        </Box>
    )
}
