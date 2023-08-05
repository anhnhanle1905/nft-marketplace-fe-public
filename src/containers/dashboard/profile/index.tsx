import { ConnectWallet, AppContainer as AppContainer } from '@/components'
import { MultiStep } from '@/containers/dashboard/profile/multi-step'
import { useWalletConnect } from '@/onchains/hooks/use-connect-wallet'
import { useN2ArenaStore } from '@/store/n2Arena_store'
import { Box, Grid, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import React from 'react'

const StyledCaptionStep = styled(Typography)(() => ({
    color: 'rgba(114, 114, 130, 1)',
    fontSize: '14px',
    lineHeight: '20px',
}))

const ProfileContainer = () => {
    const [step, setStep] = React.useState<number>(0)
    const [openConnectWallet, setOpenConnectWallet] = React.useState<boolean>(false)

    const { me } = useN2ArenaStore()
    const { account } = useWalletConnect()

    const theme = useTheme()

    const renderCaptionMultiStep = () => {
        switch (step) {
            case 0:
                return <StyledCaptionStep>Set up your profile</StyledCaptionStep>
            case 1:
                return <StyledCaptionStep>Manage KYC</StyledCaptionStep>
            case 2:
                return <StyledCaptionStep>Manage your wallet list</StyledCaptionStep>
            case 3:
                return <StyledCaptionStep>View your activities</StyledCaptionStep>
        }
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if (newValue === 3 && !account) {
            setOpenConnectWallet(true)
        }
        setStep(newValue)
    }

    return (
        <>
            <AppContainer
                sx={{
                    paddingTop: '82px',
                    mt: 0,
                }}
            >
                <Box
                    sx={{
                        [theme.breakpoints.down(1220)]: {
                            width: '100%',
                        },
                        padding: { xs: 0, md: '0 95px 0' },
                    }}
                >
                    <Box sx={{ margin: 'auto 0' }}>
                        <Typography
                            sx={{
                                fontFamily: 'Linik Sans Bold',
                                fontWeight: 700,
                                fontSize: '24px',
                                lineHeight: '24px',
                                marginBottom: '4px',
                            }}
                            variant="h4"
                        >
                            {me?.firstName} {me?.lastName}
                        </Typography>
                        {renderCaptionMultiStep()}
                    </Box>
                    <Grid
                        container
                        justifyContent="space-between"
                        mt="48px"
                        sx={{
                            [theme.breakpoints.down(1220)]: {
                                flexDirection: 'column',
                            },
                        }}
                    >
                        <MultiStep
                            step={step}
                            setStep={setStep}
                            onChange={handleChange}
                            openConnectWallet={openConnectWallet}
                        />
                    </Grid>
                </Box>
            </AppContainer>

            <ConnectWallet
                open={openConnectWallet}
                handleOpen={(value?: boolean) => setOpenConnectWallet(value || false)}
            />
        </>
    )
}
export default ProfileContainer
