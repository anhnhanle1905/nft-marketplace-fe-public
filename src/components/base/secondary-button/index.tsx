import { LoadingButton } from '@mui/lab'
import { styled } from '@mui/material/styles'

interface SubmitButtonProps {
    children: React.ReactNode
    [x: string]: any
}

const StyledSecondaryButton = styled(LoadingButton)(({ theme }) => ({
    fontFamily: 'Linik Sans Bold',
    textTransform: 'initial',
    fontSize: 16,
    borderRadius: 4,
    whiteSpace: 'nowrap',
    boxShadow: 'none',
    backgroundColor: 'rgba(236, 237, 239, 1)',
    color: 'rgba(90, 90, 111, 1)',
    border: '1px solid #C9CCD8',
    '&:hover': {
        backgroundColor: 'rgba(236, 237, 239, 0.3)',
        boxShadow: 'none',
    },
    [theme.breakpoints.down('sm')]: {
        width: 320,
    },
    [theme.breakpoints.down(480)]: {
        width: 180,
    },
}))

export const SecondaryButton = ({ children, ...props }: SubmitButtonProps) => {
    return (
        <StyledSecondaryButton variant="contained" type="submit" {...props}>
            {children}
        </StyledSecondaryButton>
    )
}
