import Head from 'next/head'
import { Box, Button, Grid, SxProps, Typography, useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image'
import { SubmitButton } from '@/components/base/submit-button'
import { headerLogo } from '@/assets/logo'
import { Features } from '@/components/layout/Features'
import { landingPageFeatures } from '@/data/statics/home'
import * as yup from 'yup'
import { Footer } from '@/components/layout/Footer'
import { AppContainer } from '@/components'
import { useRouter } from 'next/router'

export const HomeSchema = yup.object().shape({
    email: yup.string().required('Please enter your email').email('Must be an email'),
})

export default function Home() {
    const router = useRouter()
    const theme = useTheme()
    const upLg = useMediaQuery(theme.breakpoints.up('lg'))
    const downSm = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <>
            <Head>
                <title>N2 Arena</title>
            </Head>

            <>
                <Box
                    sx={{
                        height: { xs: 'auto', lg: '1242px' },
                        // background:
                        //     '#181E41 top 126.29px right 44px / 820px 450.91px no-repeat url("/background/landing-page-top.png")',
                        // background:
                        //     '#181E41 top 126.29px right 44px / 820px 450.91px no-repeat url("/background/heroimage.png")',
                        // #EFF1FF
                        background:
                            'linear-gradient(113.49deg, #984D38 -30.3%, #181E41 58.12%) no-repeat',

                        // backgroundPosition: { xs: 'right, center', md: 'center, center' },
                        backgroundSize: 'contain, cover',
                        backgroundRepeat: 'no-repeat, no-repeat',
                    }}
                >
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            height: '80px',
                            padding: { xs: '0 20px', md: '0 40px' },
                            mb: '78px',
                        }}
                    >
                        <Image
                            priority
                            src={headerLogo}
                            width={419 * 0.6}
                            height={89 * 0.6}
                            alt="N2ArenaLogo"
                        />
                        <Button
                            variant="outlined"
                            sx={{
                                width: { xs: '110px', md: '139px' },
                                height: { xs: '40px', md: '46px' },
                                fontWeight: 700,
                                textAlign: 'center',
                                padding: 0,
                                border: '1px solid #5B4EFA !important',
                                borderRadius: '4px',
                                '&:after': {
                                    content: "'Launch app'",
                                    textTransform: 'none',
                                    fontFamily: 'Linik Sans Bold',
                                    fontSize: { xs: 13, md: 16 },
                                    lineHeight: { xs: '40px', md: '46px' },
                                },
                                '&:hover': { backgroundColor: '#E0DDFF !important' },
                            }}
                            onClick={() => {
                                router.push('/marketplace')
                            }}
                        />
                    </Grid>
                    <AppContainer fullWidth container={false}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography
                                    fontSize={{ xs: '35px', md: '58px' }}
                                    fontWeight={700}
                                    fontFamily="Clash Display Bold"
                                    color="#fff"
                                    lineHeight={{ xs: '50px', md: '70px' }}
                                >
                                    Specific
                                    <br />
                                    NFT Marketplace
                                    <br />
                                    built for
                                    <br />
                                    everyone
                                </Typography>

                                <Typography
                                    variant="body1"
                                    lineHeight="34px"
                                    mt="26px"
                                    mb="0px"
                                    fontSize={{ xs: 18, md: 20 }}
                                    color={'#fff'}
                                >
                                    Aggregating the world&apos;s NFT Marketplace onchain
                                </Typography>
                            </Box>

                            <Image
                                priority
                                src={'/background/heroimage.png'}
                                width={upLg ? 1182 * 0.4 : !downSm ? 1182 * 0.27 : 0}
                                height={upLg ? 1182 * 0.4 : !downSm ? 1182 * 0.27 : 0}
                                alt="background"
                            />
                        </Box>

                        <SubscribeForm />
                    </AppContainer>

                    <Features
                        features={landingPageFeatures}
                        sx={{
                            backgroundColor: '#fff',
                            border: 'none',
                            boxShadow: '0px 4px 16px rgba(16, 17, 47, 0.06)',
                            borderRadius: '24px',
                            pb: '48px !important',
                            '& h6': { mt: '16px' },
                        }}
                        padding={{ xs: '50px 20px', md: '100px 0', lg: '200px 0 0' }}
                    />
                </Box>

                <Intro
                    backgroundImage={{
                        xs: 'none, linear-gradient(180deg, #252246 7.41%, #1A1470 94.79%)',
                        lg: 'url("/background/landing-bg2.png"), linear-gradient(180deg, #252246 7.41%, #1A1470 94.79%)',
                    }}
                    title={
                        <>
                            Invest in more
                            <br />
                            NFT than any
                            <br />
                            other platform
                        </>
                    }
                    desc="Provides access to a growing list of NFT across a number of strategies"
                />
                <Intro
                    backgroundImage={{
                        xs: 'none, linear-gradient(180deg, #756BF4 0%, #5B4EFA 100%)',
                        lg: 'url("/background/landing-bg3.png"), linear-gradient(180deg, #756BF4 0%, #5B4EFA 100%)',
                    }}
                    title={
                        <>
                            Diversify your
                            <br />
                            onchain NFT
                            <br />
                            across traditional
                            <br />
                            alternatives
                        </>
                    }
                    desc="Utilizing legal, compliant, and bankruptcy remote investment structures"
                />

                <Box
                    textAlign="center"
                    padding={{ xs: '100px 20px 100px', md: '144px 0 126px' }}
                    sx={{
                        background:
                            'transparent center / cover no-repeat url("/background/landing-bubble-bottom.png")',
                    }}
                >
                    <Typography
                        fontSize={{ xs: '40px', md: '49px' }}
                        fontWeight={900}
                        fontFamily="Nexa Heavy"
                        lineHeight="60px"
                        mb="24px"
                    >
                        Start mint NFT
                        <br />
                        in minutes
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        lineHeight="34px"
                        mb="151px"
                        fontFamily="Linik Sans"
                        fontSize={{ xs: 18, md: 20 }}
                    >
                        Connect wallet, make an investment NFT,
                        <br />
                        and put your money to work.
                    </Typography>

                    <SubscribeForm />
                </Box>

                <Footer sx={{ bgcolor: '#242059' }} />
            </>
        </>
    )
}

const Intro = ({ backgroundImage, sx, title, desc }: any) => {
    return (
        <Box
            sx={{
                backgroundImage,
                backgroundPosition: { xs: 'right, center', md: 'center, center' },
                backgroundSize: 'contain, cover',
                backgroundRepeat: 'no-repeat, no-repeat',
            }}
        >
            <AppContainer
                container
                sx={{ height: { xs: '450px', md: '640px' }, ...sx }}
                justifyContent={{ xs: 'center', md: 'space-between' }}
            >
                <Grid item xs={0} lg={6}></Grid>
                <Grid
                    item
                    xs={12}
                    lg={6}
                    container
                    flexDirection="column"
                    justifyContent="center"
                    alignItems={{ xs: 'center', lg: 'flex-end' }}
                    textAlign={{ xs: 'center', lg: 'left' }}
                    maxWidth="456px !important"
                    ml="auto"
                    mr={{ xs: 'auto', lg: 0 }}
                >
                    <Typography
                        sx={{
                            fontFamily: 'Nexa Heavy',
                            fontSize: { xs: 30, md: '48px' },
                            lineHeight: { xs: '40px', md: '60px' },
                            mb: '36px',
                            width: '100%',
                            color: '#fff',
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography variant="body1" lineHeight="24px" color="#fff">
                        {desc}
                    </Typography>
                </Grid>
            </AppContainer>
        </Box>
    )
}

const SubscribeForm = ({ sx }: { sx?: SxProps }) => {
    const router = useRouter()

    return (
        <Box>
            <SubmitButton
                sx={{
                    width: { xs: '20vw', sm: '150px' },
                    height: '44px',
                    marginTop: '-100px',
                }}
                onClick={() => {
                    router.push('/marketplace')
                }}
            >
                Get Started
            </SubmitButton>
        </Box>
    )
}
