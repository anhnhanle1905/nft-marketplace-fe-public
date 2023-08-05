import React, { useEffect } from 'react'
import { Contract, utils } from 'ethers'

import {
    ERC20Interface,
    shortenAddress,
    useEthers,
    useTokenAllowance,
    useTokenBalance,
} from '@usedapp/core'

import { useForm } from 'react-hook-form'
import {
    Typography,
    Box,
    styled,
    Select,
    MenuItem,
    Paper,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@mui/material'

import { toast } from 'react-toastify'

import { TextFieldWithLabel, CheckFieldWithLabel } from '@/components'
// onchains
import { STABLE_COINS, marketplace_contract } from '@/onchains/constants'
// import { useCheckWhitelist } from '@/onchains/hooks/useCheckWhiteList'
import { useContractFunction } from '@/onchains/hooks/useContractFunction'
// utils
import { roundNumber } from '@/onchains/helpers'

// services
import { useWalletConnect } from '@/onchains/hooks/use-connect-wallet'

import { Notification } from '@/components/popup/Notification'

import { useCheckApprovalNFT, useCheckOwnerOfNFT } from '@/onchains/hooks/useNFT'
import BigNumber from 'bignumber.js'
import { useExecuteOrder } from '@/onchains/hooks/useMarketplace'

import { ImageNFTDetails } from './ImageNFTDetails'
import { IconToken } from '../Wallet'
import { auctionApi } from '@/apis/auction'
import CountdownAuction from '../CountDownAuction'
import { convertToVietNamTime } from '@/pages/mint'
import { useN2ArenaStore } from '@/store/n2Arena_store'
import { useRouter } from 'next/router'
import { useGetNFTs } from '@/services/nft'
import { formatDecimals18 } from '@/utils'
import { marketplaceApi } from '@/apis'
import { ConfirmButton } from './ExecuteForm'

export const Info = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '24px 16px',
    backgroundColor: '#FAFAFA',
    borderRadius: '4px',
    'p:not(:last-child)': { marginBottom: '12px' },
}))

export const Form = styled('form')(() => ({
    textAlign: 'center',
    marginTop: '32px',
}))

export const priceFormatToNormal = (price: string | number) => {
    const TEN = new BigNumber(10)
    const result = new BigNumber(price).div(TEN.pow(18)).toFixed()
    return result
}

interface TermsAndConditionsCheckFieldProps {
    [x: string]: any
}

const TermsAndConditionsCheckField = ({
    children,
    error,
    register,
    name,
    validationSchema,
    ...others
}: TermsAndConditionsCheckFieldProps) => {
    const { account } = useEthers()
    const { me } = useN2ArenaStore()
    const router = useRouter()
    return (
        <CheckFieldWithLabel
            name={name}
            register={register}
            validationSchema={!account ? {} : { required: 'Required' }}
            error={error}
        >
            I have read and accept N2Arena&apos;s{' '}
            <Typography
                component="a"
                href="/terms-and-conditions"
                target="_blank"
                rel="noreferrer noopener"
                fontSize="12px"
                fontFamily="Linik Sans Medium"
                color="primary.main"
                sx={{
                    padding: '0.5px 0',
                    borderBottom: '1px solid white',
                    borderBottomColor: 'primary.main',
                    cursor: 'pointer',
                }}
            >
                terms and conditions
            </Typography>
        </CheckFieldWithLabel>
    )
}

interface PaticipateAuctionFormProps {
    nftInfo: any
    offeringFromSC?: any
    isOwner: boolean
    refresh: boolean
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const labels = ['Name', 'Token ID', 'Catalyst', 'Chain', 'Payment Token', 'Starting Price']

export const PaticipateAuctionForm = ({
    nftInfo,
    isOwner,
    refresh,
    setRefresh,
}: PaticipateAuctionFormProps) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        reset,
        getValues,
    } = useForm()
    const { me } = useN2ArenaStore()
    const router = useRouter()

    const { refetch } = useGetNFTs()

    const initialAuction = {
        _id: '',
        seller: '',
        sellerAddress: '',
        nft: '',
        listAuction: [],
        minPrice: '',
        endAuction: '',
        winner: { walletAddress: '0x00', _id: '000c15227f9d43f6fa6af9bb' },
    }

    const [selectedCoin, setSelectedCoin] = React.useState<string>(STABLE_COINS.NAT.symbol)
    const [submitted, setSubmitted] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)

    const [isApprovedForNFT, setIsApprovedForNFT] = React.useState<boolean>(false)
    const [openRedemptionPopup, setOpenRedemptionPopup] = React.useState<boolean>(false)
    const [endAuction, setEndAuction] = React.useState<number>(0)
    const [auctionInfo, setAuctionInfo] = React.useState<any>(initialAuction)
    const [isAllowAuction, setIsAllowAuction] = React.useState<boolean>(false)
    const [minAmount, setMinAmount] = React.useState<number>(0.05)

    const { account } = useEthers()

    const resultCheckApprovalNFT = useCheckApprovalNFT(nftInfo.tokenId)
    const resultCheckOwnerOfNFT = useCheckOwnerOfNFT(nftInfo.tokenId)

    // @ts-ignore
    const coinInfo = STABLE_COINS[selectedCoin]
    const balance = useTokenBalance(coinInfo.address, account)
    const formattedBalance = roundNumber(balance, coinInfo.decimals)

    const allowance = useTokenAllowance(coinInfo.address, account, marketplace_contract) || 0

    const [isApproved, setIsApproved] = React.useState<boolean>(false)

    // const whiteListStatus = useCheckWhitelist(account)

    const TEN = new BigNumber(10)

    const availableCapability = 1000000

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await auctionApi.getAuction(nftInfo.tokenId)
                if (data) {
                    setAuctionInfo(data)
                    const minAmountFormat = new BigNumber(data.minPrice).div(TEN.pow(18)).toFixed()
                    setMinAmount(parseFloat(minAmountFormat))
                    console.log('data get auction: ', data)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [nftInfo.tokenId, refresh])

    // contract interaction

    const { activateBrowserWallet } = useWalletConnect()
    const connectWallet = () => {
        activateBrowserWallet()
    }

    const isOwnerOfNFT = () => {
        return resultCheckOwnerOfNFT.toLowerCase() === account?.toLowerCase()
    }

    const isEnoughAllowance = () => {
        const price = nftInfo.price
        if (price === 0) return false
        return (
            Number(utils.formatUnits(allowance, coinInfo.decimals)) >=
                Number(formatDecimals18(price)) || isApproved
        )
    }

    const { send: sendApprove } = useContractFunction({
        args: [
            new Contract(coinInfo.address, ERC20Interface),
            'approve',
            {
                transactionName: 'wrap',
            },
        ],
        onSuccess() {
            setIsApproved(true)
            toast.success('Successfully approved.')
        },
        onError() {
            toast.error('Approve transaction failed')
            setSubmitted(false)
        },
    })

    const onSubmit = async () => {
        onAcceptWarning()
        // if (isApproved) {
        //     onAcceptWarning()
        // } else {
        //     setOpenRedemptionPopup(true)
        // }
    }

    const data = [
        { key: 'name', value: `${nftInfo.name}` },
        { key: 'tokenId', value: `${nftInfo.tokenId}` },
        { key: 'catalyst', value: `${nftInfo.catalyst}` },
        { key: 'chain', value: `${nftInfo.chain}` },
        { key: 'paymentToken', value: `NAT` },
        { key: 'startingPrice', value: `${minAmount}` },
    ]

    const targetAuctionDate = convertToVietNamTime(
        auctionInfo.endAuction
            ? new Date(auctionInfo.endAuction).toISOString()
            : new Date().toISOString()
    )
    const now = new Date().getTime()
    const isFinishAuction = targetAuctionDate.getTime() - now <= 0

    const winner = auctionInfo.winner ? auctionInfo.winner.walletAddress : '0x00'
    const isWinner = winner.toLowerCase() === account?.toLowerCase()

    const { mining: miningExecuteOrder, executeOrder } = useExecuteOrder()

    const handleButtonLabel = () => {
        switch (true) {
            case !account:
                return 'Connect wallet'
            case isOwnerOfNFT():
                return 'You are the owner of NFT'
            case !isAllowAuction:
                return 'Auction has ended'
            default:
                return 'Confirm Auction NFT'
        }
    }

    const onAcceptWarning = async () => {
        setSubmitted(true)
        setLoading(true)

        const { amount } = getValues()

        const amountNft = nftInfo.price

        const priceFormat = new BigNumber(amount).times(TEN.pow(18)).toFixed()

        if (!isFinishAuction) {
            if (resultCheckOwnerOfNFT) {
                //add auction
                try {
                    //  endAuction
                    await auctionApi.auctionNFT(nftInfo.tokenId, account as string, priceFormat)
                    toast.success(`Participate auction successfully with price ${amount} NNG`)
                    setRefresh(!refresh)
                    refetch()
                } catch (error) {
                    //@ts-ignore
                    toast.error(`${error.response.data.message}`)
                    console.log(error)
                }
            }
            reset({ amount: null, initials: null, confirm: false, confirmQualify: false })
            setLoading(false)
            setSubmitted(false)
        } else {
            console.log('Execute Auction NFT')
            if (!isEnoughAllowance()) {
                await sendApprove(
                    marketplace_contract,
                    utils.parseUnits(formatDecimals18(amountNft), coinInfo.decimals)
                )
                setLoading(false)
                return
            }

            const tx = await executeOrder(nftInfo.orderId)
            if (tx) {
                await marketplaceApi.executeOrderBE(
                    nftInfo.seller.walletAddress,
                    account as string,
                    nftInfo.orderId
                )
                toast.success(`Execute Auction NFT successfully!`)
                setRefresh(!refresh)
                refetch()
            }

            reset({ amount: null, initials: null, confirm: false, confirmQualify: false })
            setIsApproved(false)
            setLoading(false)
            setSubmitted(false)
        }
    }

    console.log(
        'test: ',
        winner,
        isWinner,
        nftInfo.status,
        winner.toLowerCase(),
        account?.toLowerCase(),
        auctionInfo
    )

    return (
        <Box
            sx={{
                display: 'flex',
                maxWidth: '90%',
                justifyContent: 'space-between',

                margin: '0 auto',
            }}
        >
            <Box sx={{ width: '400px', margin: '0 auto' }}>
                <Form onSubmit={handleSubmit(onSubmit)} sx={{ marginTop: 0 }}>
                    <Box sx={{ textAlign: 'start', marginBottom: '30px' }}>
                        <CountdownAuction
                            targetDate={targetAuctionDate}
                            isAllowAuction={isAllowAuction}
                            setIsAllowAuction={setIsAllowAuction}
                        />
                    </Box>

                    {!(isWinner && nftInfo.status === 'selling') && (
                        <TextFieldWithLabel
                            label="Participate Auction Now"
                            placeholder="Enter Price Auction "
                            type="number"
                            step="0.01"
                            name="amount"
                            submitted={submitted}
                            register={register}
                            error={errors?.amount}
                            validationSchema={
                                !account
                                    ? {}
                                    : {
                                          required: 'Required',
                                          validate: {
                                              min: (value: number) =>
                                                  value < minAmount
                                                      ? `Should be greater than ${minAmount} NAT`
                                                      : true,
                                              hasEnoughBalance: (value: number) =>
                                                  value > +(formattedBalance || 0)
                                                      ? 'Insufficient balance'
                                                      : true,
                                              max: (value: number) =>
                                                  value > availableCapability
                                                      ? `Should be less than $${availableCapability}`
                                                      : true,
                                          },
                                          pattern: {
                                              value: /^\d+(\.\d{1,2})?$/,
                                              message: 'Please enter up to 2 decimal places.',
                                          },
                                      }
                            }
                        />
                    )}

                    <Box display="flex" justifyContent="flex-end" alignItems="center" mb="10px">
                        {account && (
                            <>
                                <Typography variant="body1">
                                    Your balance:{' '}
                                    <strong>
                                        {new BigNumber(formattedBalance).dp(2).toFormat()}
                                    </strong>
                                </Typography>

                                <Select
                                    disabled={submitted}
                                    sx={{
                                        marginLeft: '10px',
                                        fontSize: '16px',
                                        '.MuiSelect-select': {
                                            padding: 0,
                                            paddingRight: '22px !important',
                                        },
                                    }}
                                    variant="standard"
                                    value={coinInfo.symbol}
                                    onChange={(event) => {
                                        setSelectedCoin(event?.target?.value)
                                    }}
                                >
                                    {Object.keys({ NAT: STABLE_COINS.NAT }).map((coin) => (
                                        <MenuItem key={coin} value={coin}>
                                            {coin}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </>
                        )}
                    </Box>

                    <Box>
                        <TermsAndConditionsCheckField
                            name="confirmTermsAndConditions"
                            register={register}
                            validationSchema={!account ? {} : { required: 'Required' }}
                            error={errors?.confirmTermsAndConditions}
                        />
                    </Box>

                    <Box sx={{ mt: '42px' }}>
                        {!account ? (
                            <ConfirmButton variant="contained" fullWidth onClick={connectWallet}>
                                Connect Wallet
                            </ConfirmButton>
                        ) : !me.isFinishedKYC ? (
                            <ConfirmButton
                                variant="contained"
                                fullWidth
                                onClick={() => {
                                    router.push('/profile')
                                }}
                            >
                                Go to Profile to complete KYC
                            </ConfirmButton>
                        ) : isWinner && nftInfo.status === 'auction' ? (
                            <ConfirmButton
                                disabled={true}
                                variant="contained"
                                fullWidth
                                type="submit"
                            >
                                Waiting Owner Confirm
                            </ConfirmButton>
                        ) : isWinner && nftInfo.status === 'selling' ? (
                            <ConfirmButton
                                disabled={loading || miningExecuteOrder}
                                loading={loading}
                                variant="contained"
                                fullWidth
                                type="submit"
                            >
                                {!isEnoughAllowance()
                                    ? `Approve Transaction`
                                    : `Execute Auction NFT`}
                            </ConfirmButton>
                        ) : (
                            <ConfirmButton
                                disabled={
                                    loading ||
                                    !isAllowAuction ||
                                    isOwnerOfNFT() ||
                                    miningExecuteOrder
                                }
                                loading={loading}
                                variant="contained"
                                fullWidth
                                type="submit"
                            >
                                {handleButtonLabel()}
                            </ConfirmButton>
                        )}
                    </Box>
                </Form>

                <Box sx={{ marginTop: '10px' }}>
                    <Box sx={{ marginBottom: '10px' }}>List Paticipant</Box>

                    <Paper sx={{ width: '100%' }}>
                        <TableContainer sx={{ maxHeight: 200 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Address</TableCell>
                                        <TableCell align="right">Price Auction</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {auctionInfo.listAuction.length > 0 &&
                                        auctionInfo.listAuction.map((item: any, index: number) => {
                                            return (
                                                <TableRow
                                                    key={index}
                                                    sx={{
                                                        '&:last-child td, &:last-child th': {
                                                            border: 0,
                                                        },
                                                    }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {shortenAddress(item.walletAddress)}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {priceFormatToNormal(item.price)}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>

                <Notification
                    title="Auction Details"
                    desc="Please note that"
                    open={openRedemptionPopup}
                    onClose={() => {
                        setOpenRedemptionPopup(false)
                    }}
                    onOk={() => {
                        onAcceptWarning()
                    }}
                />
            </Box>

            <Box sx={{ width: '400px', margin: '0 auto' }}>
                <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    mb="24px"
                    fontFamily="Linik Sans Bold"
                    lineHeight="34px"
                >
                    NFT Details
                </Typography>

                <ImageNFTDetails uri={nftInfo.uri} />

                <Info>
                    <Box>
                        {labels.map((label) => (
                            <Typography
                                key={label}
                                variant="body1"
                                color="#5A5A6F"
                                lineHeight="24px"
                            >
                                {label}:
                            </Typography>
                        ))}
                    </Box>
                    <Box>
                        {data.map(({ key, value }) => (
                            <Typography
                                variant="body1"
                                fontWeight={500}
                                fontFamily="Linik Sans Medium"
                                key={key}
                                sx={{ textTransform: 'capitalize' }}
                            >
                                {value === 'Goerli' && (
                                    <IconToken
                                        src={'/icons/ethereum-icon.svg'}
                                        alt="token"
                                        priority
                                        width={24}
                                        height={20}
                                        sx={{ marginBottom: '-5px', marginLeft: '-5px' }}
                                    />
                                )}
                                {value === 'NAT' && (
                                    <IconToken
                                        src={'/logo/logo-n2-black.png'}
                                        alt="token"
                                        priority
                                        width={24}
                                        height={20}
                                        sx={{
                                            marginBottom: '-5px',
                                            marginLeft: '-5px',
                                            marginRight: '10px',
                                        }}
                                    />
                                )}
                                {value}
                            </Typography>
                        ))}
                    </Box>
                </Info>
            </Box>
        </Box>
    )
}
