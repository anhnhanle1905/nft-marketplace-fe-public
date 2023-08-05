import { ssoBackground } from '@/assets/images'
import { HeaderLogo, PolicyArea } from '@/components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Grid, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import Link from 'next/link'

interface SsoLayoutProps {
    children: React.ReactNode
    title: string
    titleLeft?: boolean
    topRedirect?: boolean
    showPolicy: boolean
    haveCaption?: boolean
    sx?: any
}

const GridItem = styled(Grid)(({ theme }) => ({
    width: 500,
    padding: 58,
    margin: 'auto auto 24px auto',
    borderRadius: 16,
    backgroundColor: 'white',
    [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
        width: 420,
        padding: 24,
    },
}))

const BackToLogin = styled(Link)(({ theme }) => ({
    display: 'flex',
    fontSize: 14,
    fontFamily: 'Linik Sans Semi Bold',
    alignItems: 'center',
    color: theme.palette.primary['main'],
    marginBottom: 40,
    '&:hover': {
        textDecoration: 'underline',
    },
}))

const SsoLayout = ({
    children,
    title,
    titleLeft,
    topRedirect,
    showPolicy,
    haveCaption,
    sx,
}: SsoLayoutProps) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: 'flex',
                flexGrow: 1,
                minHeight: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url(${ssoBackground})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                ...sx,
            }}
        >
            <HeaderLogo />
            <Grid
                container
                sx={{
                    [theme.breakpoints.down('sm')]: {
                        width: '90%',
                    },
                }}
            >
                <GridItem item>
                    {topRedirect && (
                        <BackToLogin href={'/login'}>
                            <ArrowBackIcon
                                color="primary"
                                sx={{ width: 18, marginRight: 1 }}
                                fontSize="medium"
                            />
                            Back to Log in
                        </BackToLogin>
                    )}
                    <Typography
                        sx={{
                            color: '#232233',
                            fontFamily: 'Nexa Heavy',
                            fontWeight: 900,
                            fontSize: 28,
                            lineHeight: '40px',
                            textAlign: titleLeft ? 'left' : 'center',
                            marginBottom: haveCaption ? '12px' : '40px',
                        }}
                    >
                        {title}
                    </Typography>
                    {children}
                </GridItem>

                {showPolicy && <PolicyArea sx={{ width: '100%' }} />}
            </Grid>
        </Box>
    )
}
export default SsoLayout
