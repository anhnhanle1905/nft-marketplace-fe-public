import * as React from 'react'

import { useTokenBalance } from '@usedapp/core'

import {
    Box,
    Divider,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    tooltipClasses,
    TooltipProps,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'

import Image from 'next/image'
import { useWalletConnect } from '@/onchains/hooks/use-connect-wallet'
import { SubmitButton } from '@/components/base/submit-button'
import { roundNumber } from '@/onchains/helpers'
import { STABLE_COINS } from '@/onchains/constants'
import BigNumber from 'bignumber.js'

// utils
// import { roundNumber } from '@/onchains/helpers'
// import { STABLE_COINS } from '@/onchains/constants'

interface Row {
    name: string
    balance: string
    value: number
    img: string
}

const StyleTitleWalletTooltip = styled(Typography)(({ theme }) => ({
    fontFamily: 'Linik Sans Bold',
    lineHeight: '24px',
    fontSize: '16px',
    fontWeight: 700,
    color: '#232233',
}))
const StyleSubTitleWalletTooltip = styled(StyleTitleWalletTooltip)(({ theme }) => ({
    fontFamily: 'Linik Sans',
    fontWeight: 400,
    color: '#5A5A6F',
}))

export const IconToken = styled(Image)(({ theme }) => ({
    marginRight: '8px',
    position: 'relative',
    top: '0px',
    left: 0,
}))

const StyleTableCell = styled(TableCell)(({ theme }) => ({
    fontFamily: 'Linik Sans',
    lineHeight: '24px',
    fontSize: '16px',
    fontWeight: 500,
    color: '#232233',
    padding: '11px 0',
    borderBottom: '0.5px solid #E9E9F0',
}))

const TooltipInformationWallet = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: '428px',
        background: '#FFFFFF',
        borderRadius: '8px',
        padding: 0,
        filter: 'drop-shadow(0px 4px 8px rgba(35, 34, 51, 0.12))',
    },
    [`& .${tooltipClasses.arrow}`]: {
        marginRight: '10px',
        '&::before': {
            backgroundColor: '#FFFFFF',
        },
    },
    [`& .${tooltipClasses.tooltipPlacementBottom}`]: {
        marginRight: '16px',
    },
})

function createData(name: string, balance: number | string, value: number | string, img: string) {
    return { name, balance, value, img }
}

function WalletTooltip() {
    const walletInfoItems = ['Asset', 'Balance', 'Value']
    const { account, activateBrowserWallet } = useWalletConnect()

    // const DAIBalance = useTokenBalance(STABLE_COINS.DAI.address, account)
    // const USDCBalance = useTokenBalance(STABLE_COINS.USDC.address, account)
    // const USDTBalance = useTokenBalance(STABLE_COINS.USDT.address, account)
    const NATBalance = useTokenBalance(STABLE_COINS.NAT.address, account)

    // const formatedNATBalance = roundNumber(NATBalance, 18, 2)
    // const formatedUSDCBalance = roundNumber(USDCBalance, 6, 2)
    // const formatedUSDTBalance = roundNumber(USDTBalance, 6, 2)
    const formatedNATBalance = roundNumber(NATBalance, 18, 2)
    const priceNAT = 2.3
    const totalValue = new BigNumber(roundNumber(formatedNATBalance, 2) * priceNAT).dp(2).toFormat()

    const rows = [
        createData(
            'NAT',
            new BigNumber(formatedNATBalance).dp(2).toFormat(),
            new BigNumber(formatedNATBalance * priceNAT).dp(2).toFormat(),
            '/logo/logo-n2-black.png'
        ),
        // createData(
        //     STABLE_COINS.USDC.symbol,
        //     formatedUSDCBalance,
        //     formatedUSDCBalance,
        //     '/images/icon-usdc.svg'
        // ),
        // createData(
        //     STABLE_COINS.USDT.symbol,
        //     formatedUSDTBalance,
        //     formatedUSDTBalance,
        //     '/images/icon-usdt.svg'
        // ),
    ]

    return (
        <Box
            sx={{
                width: '428px',
                padding: '32px',
            }}
        >
            <StyleTitleWalletTooltip variant="body2" sx={{ paddingBottom: '16px' }}>
                My wallet
            </StyleTitleWalletTooltip>
            {account ? (
                <>
                    <Divider
                        sx={{
                            width: '100%',
                            position: 'absolute',
                            left: 0,
                            height: '7px',
                            background: '#F5F4F9',
                            borderColor: '#F5F4F9',
                        }}
                    />

                    <TableContainer sx={{ width: '100%', paddingTop: '16px' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {walletInfoItems.map((item, index) => (
                                        <TableCell
                                            key={index}
                                            align="left"
                                            sx={{
                                                padding: '16px 0',
                                                borderBottom: '0.5px solid #E9E9F0',
                                            }}
                                        >
                                            <StyleTitleWalletTooltip sx={{ paddingTop: '11px' }}>
                                                {item}
                                            </StyleTitleWalletTooltip>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyleTableCell
                                            component="th"
                                            scope="row"
                                            sx={{
                                                padding: '0',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <IconToken
                                                    src={row.img}
                                                    alt="token"
                                                    priority
                                                    width={24}
                                                    height={20}
                                                />

                                                {row.name}
                                            </Box>
                                        </StyleTableCell>
                                        <StyleTableCell component="th" scope="row" align="left">
                                            {row.balance}
                                        </StyleTableCell>
                                        <StyleTableCell align="left">$ {row.value}</StyleTableCell>
                                    </TableRow>
                                ))}

                                <TableRow>
                                    <StyleTableCell
                                        colSpan={2}
                                        sx={{
                                            fontWeight: '500',
                                            padding: 0,
                                            fontFamily: 'Linik Sans Medium',
                                        }}
                                    >
                                        Total
                                    </StyleTableCell>
                                    <StyleTableCell
                                        sx={{ fontFamily: 'Linik Sans Medium' }}
                                        align="left"
                                    >
                                        $ {totalValue}
                                    </StyleTableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            ) : (
                <>
                    <StyleSubTitleWalletTooltip>
                        {`If you don't have a wallet yet, you can create one now.`}
                    </StyleSubTitleWalletTooltip>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            border: '1px solid #E9E9F0',
                            padding: '6px',
                            marginTop: '28px',
                            borderRadius: '4px',
                        }}
                    >
                        <Box sx={{ display: 'flex', paddingLeft: '10px' }}>
                            <Image
                                src="/images/icon-metamask.svg"
                                alt="wallet"
                                priority
                                width={24}
                                height={24}
                            />
                            <StyleTitleWalletTooltip
                                sx={{ fontFamily: 'Nexa Heavy', paddingLeft: '6px' }}
                            >
                                Metamask
                            </StyleTitleWalletTooltip>
                        </Box>

                        <SubmitButton
                            sx={{
                                fontFamily: 'Linik Sans Semi Bold',
                                fontSize: '14px',
                                textAlight: 'center',
                                padding: '12px 16px',
                                lineHeight: '20px',
                            }}
                            onClick={activateBrowserWallet}
                        >
                            Connect wallet
                        </SubmitButton>
                    </Box>
                </>
            )}
        </Box>
    )
}

export default function Wallet() {
    const theme = useTheme()
    const upMd = useMediaQuery(theme.breakpoints.up('md'))
    const downSm = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Box
            sx={{
                margin: '0px 40px 0 99px',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <TooltipInformationWallet title={<WalletTooltip />} arrow placement="bottom">
                <Image
                    src="/images/icon-wallet.svg"
                    alt="wallet"
                    priority
                    width={24}
                    height={24}
                    style={{ cursor: 'pointer' }}
                />
            </TooltipInformationWallet>
        </Box>
    )
}
