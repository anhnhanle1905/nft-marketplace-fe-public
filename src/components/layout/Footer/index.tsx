import { NavbarLinks, SocialLinks } from '@/data/statics/footer'
import { Grid, Box, Typography, SxProps } from '@mui/material'

import { NextImage } from '@/components/base/next-image'
import { headerLogo } from '@/assets/logo' //add logo white text
import { AppContainer } from '../AppContainer'

export const Footer = ({ sx }: { sx?: SxProps }) => {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: '#232233',
                color: 'common.white',
                ...sx,
            }}
        >
            <AppContainer
                justifyContent="space-between"
                fullWidth
                sx={{ paddingTop: '50px', paddingBottom: { xs: '40px', md: '64px' } }}
            >
                <Grid container item alignItems="center" justifyContent="space-between">
                    <Grid item xs={12} sm={12} md={4}>
                        <NextImage
                            priority
                            src={headerLogo}
                            width={419 * 0.5}
                            height={89 * 0.5}
                            alt="N2Arena"
                            style={{ display: 'block' }}
                        />
                        <Typography
                            variant="body1"
                            mt="16px"
                            mb="36px"
                            lineHeight="24px"
                            maxWidth="313px"
                        >
                            Top trusted NFT Marketplace across platforms
                        </Typography>
                    </Grid>

                    <Grid
                        container
                        item
                        xs={12}
                        md={4}
                        mb={{ xs: '50px', md: 0 }}
                        alignItems="center"
                    >
                        {SocialLinks.map(({ icon }) => (
                            <NextImage
                                key={icon}
                                priority
                                src={icon}
                                width={24}
                                height={24}
                                alt="social"
                                style={{ marginRight: '26px', cursor: 'pointer' }}
                            />
                        ))}
                    </Grid>
                </Grid>

                <Grid
                    container
                    item
                    sx={{ borderTop: 'solid 1px #555151', mt: '40px', pt: '39px' }}
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent={{ xs: 'center', md: 'space-between' }}
                    alignItems={{ xs: 'center' }}
                >
                    <Typography variant="h6" fontFamily="Nexa" fontWeight={100}>
                        <span style={{ fontFamily: 'sans-serif', color: '#ffffffb3' }}>&#169;</span>{' '}
                        2023 N2 Arena all rights reserved.
                    </Typography>
                </Grid>
            </AppContainer>
        </Box>
    )
}
