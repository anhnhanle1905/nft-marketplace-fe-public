import { Button } from '@mui/material'

import { styled } from '@mui/material/styles'

interface SubmitButtonProps {
    children: React.ReactNode
    [x: string]: any
}
const StyledWhiteButton = styled(Button)(({ theme }) => ({
    fontWeight: 'bold',
    textTransform: 'initial',
    fontSize: 16,
    borderRadius: 4,
    backgroundColor: 'white',
}))

export const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
    return (
        <StyledWhiteButton variant="contained" {...props}>
            {children}
        </StyledWhiteButton>
    )
}
