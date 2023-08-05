import { Box, Typography, styled } from '@mui/material'

import emptyCheckBox from '../../../../public/images/icon-checkbox-empty.svg'
import checkedCheckBox from '../../../../public/images/icon-checkbox-checked.svg'

const StyledCheckbox = styled('input')(({ theme }) => ({
    position: 'relative',
    cursor: 'pointer',
    width: '0',
    height: '16.67px',
    marginRight: '15px',
    '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        width: '16.67px',
        height: '16.67px',
        background: `transparent center / contain no-repeat url("${emptyCheckBox.src}")`,
    },
    '&:checked:before': {
        backgroundImage: `url("${checkedCheckBox.src}")`,
    },
}))

interface CheckFieldWithLabelProps {
    label?: string
    // All other props
    [x: string]: any
}

export const CheckFieldWithLabel = ({
    children,
    error,
    register,
    name,
    validationSchema,
    ...others
}: CheckFieldWithLabelProps) => {
    return (
        <Box>
            <Box display="flex" alignItems="center">
                <StyledCheckbox type="checkbox" {...register(name, validationSchema)} {...others} />

                <Typography
                    fontSize="12px"
                    lineHeight="16px"
                    textAlign="left"
                    color="#727282"
                    fontFamily="Linik Sans Medium"
                    ml="9.67px"
                >
                    {children}
                </Typography>
            </Box>
            {error && (
                <Typography variant="h6" textAlign="left" marginTop="6px" color="error.main">
                    {error?.message}
                </Typography>
            )}
        </Box>
    )
}
