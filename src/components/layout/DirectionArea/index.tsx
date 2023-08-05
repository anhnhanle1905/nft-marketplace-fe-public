import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'

interface DirectionAreaProps {
    directionCaption: string
    directionRedirectText: string
    route: string
}
const DirectionCaption = styled(Typography)(({ theme }) => ({
    fontWeight: 'normal',
    fontFamily: 'Linik Sans',
    fontSize: 16,
    marginRight: 6,
    lineHeight: '24px',
    [theme.breakpoints.down('sm')]: {
        fontSize: 14,
    },
    [theme.breakpoints.down(480)]: {
        fontSize: 12,
    },
}))

const DirectionRedirect = styled(Link)(({ theme }) => ({
    fontSize: 16,
    fontFamily: 'Linik Sans Bold',
    color: theme.palette.primary['main'],
    '&:hover': {
        textDecoration: 'underline',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: 14,
    },
    [theme.breakpoints.down(480)]: {
        fontSize: 12,
    },
}))

export const DirectionArea = ({
    directionCaption,
    directionRedirectText,
    route,
}: DirectionAreaProps) => {
    return (
        <Box sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
            <DirectionCaption>{directionCaption}</DirectionCaption>
            <DirectionRedirect href={`/${route}`}>{directionRedirectText}</DirectionRedirect>
        </Box>
    )
}
