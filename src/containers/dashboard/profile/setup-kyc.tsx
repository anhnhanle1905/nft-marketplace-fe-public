/* eslint-disable react/no-unescaped-entities */
import { SubmitButton } from '@/components'

import { useQueryUser } from '@/services/auth'

import { Box, Stack, Step, StepIconProps, StepLabel, Stepper, Typography } from '@mui/material'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { styled, useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Notification } from '@/components/popup/Notification'
import { useN2ArenaStore } from '@/store/n2Arena_store'
import { userApi } from '@/apis/user'

interface SetupKYCTabsProps {
    setStep: (step: number) => void
}
const steps = ['Email Verification', 'Imported Wallet', 'Finished']

const ColorLibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 32,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: '#5B4EFA',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: '#5B4EFA',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 1,
        border: 0,
        backgroundColor: '#E9E9F0',
        borderRadius: 1,
    },
}))

const ColorLibStepIconRoot = styled(Box)<{
    ownerState: { completed?: boolean; active?: boolean }
}>(({ theme, ownerState }) => ({
    backgroundColor: '#F4F5FF',
    fontFamily: 'Linik Sans Bold',
    fontWeight: 700,
    zIndex: 1,
    color: '#232233',
    width: 70,
    height: 70,
    display: 'flex',
    borderRadius: '50%',
    fontSize: '24px',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        width: 56,
        height: 56,
        fontSize: '18px',
    },
    ...(ownerState.active && {
        backgroundColor: '#5B4EFA',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundColor: '#5B4EFA',
    }),
    '& .MuiStepConnector-line': {
        color: 'rgba(233, 233, 240, 1)',
        height: 1,
    },
}))

const CompletedColorLibStepIconRoot = styled(Box)<{
    ownerState: { completed?: boolean; active?: boolean }
}>(({ theme, ownerState }) => ({
    backgroundColor: 'rgba(35, 34, 51, 1)',
    fontWeight: 700,
    zIndex: 1,
    color: 'rgba(255, 255, 255, 1)',
    width: 70,
    height: 70,
    display: 'flex',
    borderRadius: '50%',
    fontSize: '24px',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Linik Sans Bold',
    [theme.breakpoints.down('sm')]: {
        width: 56,
        height: 56,
        fontSize: '18px',
    },
    ...(ownerState.active && {
        backgroundColor: '#5B4EFA',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundColor: '#5B4EFA',
    }),
    '& .MuiStepConnector-line': {
        color: 'rgba(233, 233, 240, 1)',
        height: 1,
        width: 191,
    },
}))

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props

    return (
        <ColorLibStepIconRoot ownerState={{ completed, active }} className={className}>
            {String(props.icon)}
        </ColorLibStepIconRoot>
    )
}

function CompletedColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props

    return (
        <CompletedColorLibStepIconRoot ownerState={{ completed, active }} className={className}>
            {String(props.icon)}
        </CompletedColorLibStepIconRoot>
    )
}

const zeroPad = (num: number, size = 2) => {
    let number = num.toString()
    while (number.length < size) number = '0' + number
    return number
}

interface TimerProps {
    delayResend?: number
    children?: any
    resetTrigger?: string | null
}

const Timer = ({ delayResend = 60, children, resetTrigger }: TimerProps) => {
    const defaultDelayResend = delayResend

    const currentTime = new Date()
    const resendEmailFromLS = localStorage.getItem('resendEmail')
    const timeLaterDate = new Date(resendEmailFromLS as string)
    //@ts-ignore
    const diffInSeconds = Math.round((timeLaterDate - currentTime) / 1000)
    const defaultDelayResendNew = diffInSeconds > 0 ? diffInSeconds : 0

    const [delay, setDelay] = useState(defaultDelayResendNew)
    const minutes = Math.floor(delay / 60)
    const seconds = Math.floor(delay % 60)
    const { refetch } = useQueryUser()

    useEffect(() => {
        if (resetTrigger) {
            setDelay(defaultDelayResend)
        }
    }, [resetTrigger, defaultDelayResend])

    useEffect(() => {
        const timer = setInterval(() => {
            setDelay(delay - 1)
        }, 1000)

        if (delay === 0) {
            refetch()
            clearInterval(timer)
        }

        return () => {
            clearInterval(timer)
        }
    })

    return <>{delay === 0 && children ? children : `${zeroPad(minutes)}:${zeroPad(seconds)}`}</>
}

export const SetupKYCTabs = ({ setStep }: SetupKYCTabsProps) => {
    const { me } = useN2ArenaStore()

    const [kycSuccessful, setKYCSuccessful] = React.useState<boolean>(false)
    const theme = useTheme()
    const router = useRouter()

    const isImportedWallet = me.walletList.length > 0

    const [completedSteps, setCompletedSteps] = React.useState<number>(0)

    const [timerResetTrigger, setTimerResetTrigger] = React.useState<null | string>(null)
    const [timeDelayResend, setTimeDelayResend] = React.useState<number>(0)

    React.useEffect(() => {
        let count = 0
        switch (true) {
            // case isWhitelistApproved:
            //     count = 3
            //     break
            case isImportedWallet:
                // count = 2
                count = 3
                break
            case me.isVerified:
                count = 1
                break
            case !me.isVerified:
                count = 0
                break
            default:
                break
        }

        setCompletedSteps(count)
    }, [isImportedWallet, me, me.isVerified])

    const handleResendEmail = async () => {
        const currentTime = new Date()
        const twoMinutesLater = new Date(currentTime.getTime() + 2 * 60 * 1000)

        try {
            await userApi.resendEmail()
            setTimeDelayResend(120)
            setTimerResetTrigger(new Date().toISOString())
            localStorage.setItem('resendEmail', twoMinutesLater.toISOString())
        } catch (error) {
            console.log(error)
        }
    }

    const buttonStyles = { width: 168, height: 48, marginTop: '80px' }
    const renderDirectBtn = () => {
        switch (completedSteps) {
            case 0:
                return (
                    <Box sx={{ marginTop: '20px' }}>
                        <Timer resetTrigger={timerResetTrigger} delayResend={60}>
                            <SubmitButton onClick={() => handleResendEmail()} sx={buttonStyles}>
                                Confirm Email
                            </SubmitButton>
                        </Timer>
                    </Box>
                )

            case 1:
                return (
                    <SubmitButton onClick={() => setStep(2)} sx={buttonStyles}>
                        Request Wallet
                    </SubmitButton>
                )
            case 2:
                return (
                    <SubmitButton onClick={() => router.push('/marketplace')} sx={buttonStyles}>
                        Start Now
                    </SubmitButton>
                )
            case 3:
                return (
                    <SubmitButton onClick={() => router.push('/marketplace')} sx={buttonStyles}>
                        Start Now
                    </SubmitButton>
                )
        }
    }

    const renderStatePage = () => {
        return (
            <Stepper alternativeLabel activeStep={-1} connector={<ColorLibConnector />}>
                {steps.map((label, index) => {
                    const completed = completedSteps > index
                    const StepIconComponent = completed
                        ? CompletedColorlibStepIcon
                        : ColorlibStepIcon

                    return (
                        <Step key={label}>
                            <StepLabel StepIconComponent={StepIconComponent}>
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        color: 'rgba(35, 34, 51, 1)',
                                        fontFamily: 'Linik Sans Bold',
                                        [theme.breakpoints.down('sm')]: {
                                            fontSize: '14px',
                                        },
                                    }}
                                >
                                    {label}
                                </Typography>
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
        )
    }

    useEffect

    return (
        <>
            <Stack sx={{ marginBottom: '155px' }}>
                {renderStatePage()}
                <Box
                    sx={{
                        // display: isLoadingWallets ? 'none' : 'flex',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {renderDirectBtn()}
                </Box>
            </Stack>

            <Notification
                title="Success"
                desc="KYC successfully, your request is under review now."
                hasIcon
                open={kycSuccessful}
                onClose={() => {
                    setKYCSuccessful(false)
                }}
            />
        </>
    )
}
