import * as React from 'react'
// next
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
// MUI
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import {
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material'

// components
import { AppContainer } from '@/components'
import { UserAccount } from './UserAccount'
// hooks
import { useOffsetScroll } from '@/hooks/useOffsetScroll'
import { useLogout } from '@/services/auth'
// types
import { HeaderTheme } from '@/types'

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window
    user?: any
    transparentHeader: boolean
    theme?: HeaderTheme
}

const drawerWidth = 240

const navItems = [
    { title: 'Marketplace', path: '/marketplace' },
    { title: 'Portfolio', path: '/portfolio' },
    { title: 'Mint', path: '/mint' },
    // { title: 'Perpetual Pool', path: '/perpetual-pool' },
]

export const HEADER_HEIGHT = '64px'

export function Header(props: Props) {
    const { window, user, transparentHeader, theme = HeaderTheme.Black } = props
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const isScrolled = useOffsetScroll(100)
    const logout = useLogout()
    const router = useRouter()
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState)
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" sx={{ my: 2 }}>
                Hi, {user?.last_name}
            </Typography>
            <Divider />
            <List>
                {[{ title: 'Profile settings', path: '/profile' }, ...navItems].map(
                    ({ title, path }) => (
                        <ListItem key={title} disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <Link href={path} style={{ width: '100%' }}>
                                    <ListItemText primary={title} />
                                </Link>
                            </ListItemButton>
                        </ListItem>
                    )
                )}
            </List>

            <IconButton sx={{ mb: '42.25px' }} onClick={logout}>
                <LogoutIcon />
            </IconButton>
        </Box>
    )

    const container = window !== undefined ? () => window().document.body : undefined

    const themeStyles = isScrolled
        ? {
              bgcolor: 'common.white',
              borderBottom: 'solid 1px #E9E9F0',
              color: 'common.black',
              downArrowIcon: '/images/icon-arrow-down.svg',
              walletIcon: '/images/icon-wallet.svg',
          }
        : {
              bgcolor: transparentHeader ? 'transparent' : 'common.white',
              borderBottom: !transparentHeader ? 'solid 1px #E9E9F0' : 'none',
              color: theme === HeaderTheme.Black ? 'common.black' : 'common.white',
              downArrowIcon:
                  theme === HeaderTheme.Black
                      ? '/images/icon-arrow-down.svg'
                      : '/images/icon-arrow-down-white.svg',
              walletIcon:
                  theme === HeaderTheme.Black
                      ? '/images/icon-wallet.svg'
                      : '/images/icon-wallet-white.svg',
          }

    return (
        <Box mb={transparentHeader ? 0 : HEADER_HEIGHT}>
            <AppBar
                component="header"
                sx={{
                    height: HEADER_HEIGHT,
                    ...themeStyles,
                    transition: 'all 0.3s',
                    boxShadow: 'none',
                    '.MuiToolbar-root': { minHeight: HEADER_HEIGHT },
                    position: isScrolled ? 'fixed' : 'absolute',
                }}
            >
                <AppContainer extendedWidth={'100px'}>
                    <Toolbar sx={{ padding: { xs: '0 !important', width: '100%' } }}>
                        <Box sx={{ mr: 1, display: { lg: 'none' } }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        <Link href="/">
                            <Image
                                src={`/logo/${
                                    isScrolled
                                        ? 'logo-n2-black-full.png'
                                        : theme === HeaderTheme.Black
                                        ? 'logo-n2-black-full.png'
                                        : 'logo-n2-white-full.png'
                                }`}
                                alt="N2 Arena"
                                priority
                                width={419 * 0.37}
                                height={89 * 0.37}
                            />
                        </Link>
                        <Box
                            sx={{
                                display: { xs: 'none', lg: 'flex' },
                                ml: 'auto',
                            }}
                            component="nav"
                        >
                            {navItems.map(({ title, path }) => (
                                <Link
                                    key={title}
                                    href={path}
                                    style={{
                                        marginRight: '30px',
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        fontWeight={700}
                                        lineHeight="24px"
                                        fontFamily="Linik Sans Bold"
                                        className={router.pathname === path ? 'active' : ''}
                                        sx={{
                                            '&.active, &:hover': {
                                                color: 'primary.main',
                                            },
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                </Link>
                            ))}
                        </Box>
                        <UserAccount user={user} themeStyles={themeStyles} />
                    </Toolbar>
                </AppContainer>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    )
}
