import { styled } from '@mui/material/styles'

export const SsoForm = styled('form')(({ theme }) => ({
    maxWidth: 384,
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
        width: 320,
    },
    [theme.breakpoints.down(480)]: {
        width: 280,
    },
}))
