import { Box, Tab, Tabs, styled, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import { BaseInfo } from './base-info'
import { SetupKYCTabs } from './setup-kyc'
import { WalletTab } from './wallet'
import { useWalletConnect } from '@/onchains/hooks/use-connect-wallet'
import { ActivityTab } from '@/components/layout/ActivityTab'

interface MultiStepProps {
    step: number
    openConnectWallet: boolean
    setStep: (step: number) => void
    onChange: (event: React.SyntheticEvent, newValue: number) => void
}
interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props
    const theme = useTheme()

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={{
                flex: 1,
            }}
        >
            {value === index && (
                <Box
                    sx={{
                        width: 744,
                        paddingTop: '12px',
                        [theme.breakpoints.down(1220)]: {
                            width: '100%',
                            pr: '0 !important',
                        },
                        [theme.breakpoints.down(480)]: {
                            paddingRight: 2,
                        },
                    }}
                >
                    {children}
                </Box>
            )}
        </div>
    )
}

const SetupProfileTabs = styled(Tabs)(({ theme }) => ({
    [theme.breakpoints.up(1220)]: {
        marginBottom: 225,
    },
    [theme.breakpoints.down(1220)]: {
        marginBottom: '20px',
    },
    '& .MuiTab-root': {
        alignItems: 'start',
        [theme.breakpoints.down(600)]: {
            fontSize: 14,
            textAlign: 'center',
        },
    },
    '& .MuiTab-root.Mui-selected': {
        fontFamily: 'Linik Sans Bold',
        color: 'rgba(35, 34, 51, 1)',
        lineHeight: '24px',
        fontWeight: 700,
        fontSize: 16,
        [theme.breakpoints.down(600)]: {
            fontSize: 14,
            textAlign: 'center',
        },
    },
    '& .MuiTabs-indicator': {
        display: 'none',
    },
    '& .MuiTouchRipple-root': {
        display: 'none',
    },
}))

const SetupProfileTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    fontSize: 16,
    lineHeight: '24px',
    fontFamily: 'Linik Sans Medium',
    fontWeight: 500,
    color: 'rgba(114, 114, 130, 1)',
    paddingLeft: '0px',
    paddingRight: '0px',
    [theme.breakpoints.down(1205)]: {
        minWidth: 0,
        width: 'fit-content',
        flexBasis: 'auto',
    },
}))

export const MultiStep = ({ step, setStep, onChange, openConnectWallet }: MultiStepProps) => {
    const theme = useTheme()
    const tablet = useMediaQuery(theme.breakpoints.down(1220))
    const { account } = useWalletConnect()

    return (
        <>
            <SetupProfileTabs
                TabIndicatorProps={{
                    sx: {
                        width: 0,
                    },
                }}
                orientation={tablet ? 'horizontal' : 'vertical'}
                variant="fullWidth"
                visibleScrollbar
                value={step}
                onChange={onChange}
                sx={{
                    marginRight: '96px',
                    [theme.breakpoints.down(1220)]: {
                        marginRight: 0,
                    },
                }}
            >
                <SetupProfileTab label="User profile" {...a11yProps(0)} />
                <SetupProfileTab label="KYC" {...a11yProps(1)} />
                <SetupProfileTab label="Wallet" {...a11yProps(2)} />
                <SetupProfileTab label="Activities" {...a11yProps(3)} />
            </SetupProfileTabs>
            <TabPanel value={step} index={0}>
                <BaseInfo />
            </TabPanel>
            <TabPanel value={step} index={1}>
                <SetupKYCTabs setStep={setStep} />
            </TabPanel>
            <TabPanel value={step} index={2}>
                <WalletTab openConnectWallet={openConnectWallet} />
            </TabPanel>
            <TabPanel value={step} index={3}>
                <ActivityTab index={3} account={account as string} />
            </TabPanel>
        </>
    )
}
