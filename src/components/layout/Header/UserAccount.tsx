import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { styled, Box, Fade, Typography, Grid, Button } from '@mui/material'
import { ClickAwayListener } from '@mui/base'

import { useLogout } from '@/services/auth'
import Wallet from '../Wallet'

import { SubmitButton } from '@/components/base/submit-button'

const StyledLink = styled(Link)(({ theme }) => ({
    lineHeight: '24px',
    '&:not(:last-child)': {
        marginBottom: '20px',
    },
    '&:hover': {
        color: theme.palette.primary.main,
    },
}))

// @ts-ignore
const Label = styled('button')(({ theme, open }) => ({
    backgroundColor: 'transparent',
    border: 0,
    cursor: 'pointer',
    padding: '0 0 0 8px',
    display: 'flex',
    alignItems: 'center',
    '> img.arrow-icon': {
        marginLeft: '8px',
        transform: open ? 'rotate(180deg)' : null,
        transformOrigin: 'center',
        transition: '0.3s',
    },
}))

const Menu = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    width: '220px',
    padding: '18px 24px',
    borderRadius: '8px',
    left: '50%',
    top: '190%',
    transform: 'translate(-50%, 0)',
}))

const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'capitalize',
    padding: '12px 24px',
    borderRadius: '4px',
    fontWeight: 600,
    lineHeight: '22.4px',
}))

interface UserAccountProps {
    user?: any
    themeStyles?: any
}

export const UserAccount = ({ user, themeStyles }: UserAccountProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const router = useRouter()
    const logout = useLogout()

    const { firstName, lastName, _id } = user || {}

    const Item = ({ children, to, onClick }: any) => (
        <StyledLink
            href={to}
            onClick={() => {
                setOpen(false)
                if (onClick) onClick()
            }}
        >
            <Typography variant="body1">{children}</Typography>
        </StyledLink>
    )

    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Grid
                container
                alignItems="center"
                sx={{
                    width: 'auto',
                    ml: { xs: 'auto', lg: '-20px' },
                    display: { xs: 'none', sm: 'flex' },
                }}
            >
                <Wallet />
                <Box position="relative" display="flex" alignItems="center">
                    {/* {user ? ( */}
                    <>
                        {/* <Image
                            src="/images/avatar.png"
                            alt="wallet"
                            priority
                            width={32}
                            height={32}
                            style={{ borderRadius: '50%', objectFit: 'contain' }}
                        /> */}

                        {_id === 'default321@!$' ? (
                            <Box>
                                <SubmitButton
                                    sx={{
                                        width: { xs: '20vw', sm: '120px' },
                                        height: '36px',
                                        backgroundColor: '#fff !important',
                                        color: 'rgba(91, 78, 250, 1) !important',
                                        borderRadius: '30px !important',
                                        fontSize: '14px !important',
                                        marginLeft: '-10px !important',
                                    }}
                                    onClick={() => {
                                        router.push('/login')
                                    }}
                                >
                                    Sign In
                                </SubmitButton>
                                <SubmitButton
                                    sx={{
                                        width: { xs: '20vw', sm: '120px' },
                                        height: '36px',
                                        backgroundColor: 'rgba(91, 78, 250, 1) !important',
                                        color: '#fff !important',
                                        borderRadius: '30px !important',
                                        fontSize: '14px !important',
                                        marginLeft: '10px !important',
                                    }}
                                    onClick={() => {
                                        router.push('/sign-up')
                                    }}
                                >
                                    Get Started
                                </SubmitButton>
                            </Box>
                        ) : (
                            /* @ts-ignore */
                            <Label onClick={() => setOpen(!open)} open={open}>
                                <Typography
                                    variant="body1"
                                    fontWeight={700}
                                    color="#232233"
                                    fontFamily="Linik Sans Bold"
                                >
                                    {firstName} {lastName}
                                </Typography>
                                <Image
                                    src="/images/icon-arrow-down.svg"
                                    alt="arrow icon"
                                    priority
                                    width={16}
                                    height={16}
                                    className="arrow-icon"
                                />
                            </Label>
                        )}

                        <Fade in={open}>
                            <Menu sx={{ position: 'absolute', marginTop: '3px' }}>
                                <Item to="/profile">Profile</Item>
                                <Item to="/watchlists">Watchlists</Item>
                                <Item to="/login" onClick={logout}>
                                    Log out
                                </Item>
                            </Menu>
                        </Fade>
                    </>
                    {/* // ) : (
                    //     <>
                    //         <StyledButton
                    //             variant="outlined"
                    //             sx={{ mr: '17px' }}
                    //             onClick={() => router.push('/login')}
                    //         >
                    //             Login
                    //         </StyledButton>
                    //         <StyledButton
                    //             variant="contained"
                    //             onClick={() => router.push('/sign-up')}
                    //         >
                    //             Sign up
                    //         </StyledButton>
                    //     </>
                    // )} */}
                </Box>
            </Grid>
        </ClickAwayListener>
    )
}
