import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'

interface CountdownProps {
    targetDate: Date
    isAllowAuction: boolean
    setIsAllowAuction: React.Dispatch<React.SetStateAction<boolean>>
}

const CountdownAuction: React.FC<CountdownProps> = ({
    targetDate,
    isAllowAuction,
    setIsAllowAuction,
}) => {
    const [countdown, setCountdown] = useState<number>(0)

    function formatNumber(num: number) {
        if (num < 10) {
            return '0' + num
        } else {
            return num.toString()
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date().getTime()
            const distance = targetDate.getTime() - now

            if (distance <= 0) {
                clearInterval(intervalId)
                setCountdown(0)
                setIsAllowAuction(false)
            } else {
                setCountdown(distance)
                setIsAllowAuction(true)
            }
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [targetDate])

    const formatHours = (time: number): string => {
        const hours: number = Math.floor((time / (1000 * 60 * 60)) % 24)

        return hours !== 0 ? `${formatNumber(hours)}` : `00`
    }
    const formatMinutes = (time: number): string => {
        const minutes: number = Math.floor((time / 1000 / 60) % 60)

        return minutes !== 0 ? `${formatNumber(minutes)}` : `00`
    }
    const formatSeconds = (time: number): string => {
        const seconds: number = Math.floor((time / 1000) % 60)

        return seconds !== 0 ? `${formatNumber(seconds)}` : `00`
    }

    return (
        <Box sx={{}}>
            {/* <Typography variant="h4" marginBottom={'10px'}>
                Time to end:
            </Typography> */}

            <Box
                sx={{
                    border: '1px solid #a5a1a1',
                    width: '200px',
                    borderRadius: '4px',
                    height: '50px',
                    padding: '20px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography fontSize={'12px'}>Hours</Typography>
                        <Typography variant="h4">{`${formatHours(countdown)}`} </Typography>
                    </Box>
                    <Box sx={{ marginTop: '15px' }}>
                        <Typography variant="h4">{`:`} </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography fontSize={'12px'}>Minutes</Typography>
                        <Typography variant="h4">{`${formatMinutes(countdown)}`}</Typography>
                    </Box>
                    <Box sx={{ marginTop: '15px' }}>
                        <Typography variant="h4">{`:`} </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography fontSize={'12px'}>Seconds</Typography>
                        <Typography variant="h4">{`${formatSeconds(countdown)}`}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CountdownAuction
