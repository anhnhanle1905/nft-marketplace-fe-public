import React from 'react'
import { Contract, utils } from 'ethers'

import { ERC20Interface, useEthers, useTokenAllowance, useTokenBalance } from '@usedapp/core'

import { useForm } from 'react-hook-form'
import { Typography, Box, styled, Select, MenuItem } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { toast } from 'react-toastify'

import { CheckFieldWithLabel } from '@/components'
// onchains
import { STABLE_COINS, marketplace_contract } from '@/onchains/constants'
import { useContractFunction } from '@/onchains/hooks/useContractFunction'
// utils
import { roundNumber } from '@/onchains/helpers'
import { formatDecimals18, formatMoney } from '@/utils/common'

// services
import { useWalletConnect } from '@/onchains/hooks/use-connect-wallet'

import { Notification } from '@/components/popup/Notification'

import { useExecuteOrder } from '@/onchains/hooks/useMarketplace'
import { marketplaceApi } from '@/apis'
import { ImageNFTDetails } from './ImageNFTDetails'
import { IconToken } from '../Wallet'
import { useN2ArenaStore } from '@/store/n2Arena_store'
import { useRouter } from 'next/router'
import { useGetNFTs } from '@/services/nft'
import BigNumber from 'bignumber.js'

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

export const ConfirmButton = styled(LoadingButton)(() => ({
    borderRadius: '4px',
    padding: '11px 0',
    boxShadow: 'none',
    textTransform: 'capitalize',
    color: '#fff',
    backgroundColor: 'rgba(91, 78, 250, 1)',
}))
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

interface ExecuteFormProps {
    nftInfo: any
    offeringFromSC?: any
    isOwner: boolean
    refresh: boolean
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const labels = ['Name', 'Token ID', 'Catalyst', 'Chain', 'Price']

export const ExecuteForm = ({ nftInfo, isOwner, refresh, setRefresh }: ExecuteFormProps) => {
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

    const [selectedCoin, setSelectedCoin] = React.useState<string>(STABLE_COINS.NAT.symbol)
    const [submitted, setSubmitted] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [isApproved, setIsApproved] = React.useState<boolean>(false)

    const [openRedemptionPopup, setOpenRedemptionPopup] = React.useState<boolean>(false)

    const { account } = useEthers()

    // @ts-ignore
    const coinInfo = STABLE_COINS[selectedCoin]
    const balance = useTokenBalance(coinInfo.address, account)
    const formattedBalance = roundNumber(balance, coinInfo.decimals)
    const allowance = useTokenAllowance(coinInfo.address, account, marketplace_contract) || 0

    const isEnoughAllowance = () => {
        const price = nftInfo.price
        if (price === 0) return false
        return (
            Number(utils.formatUnits(allowance, coinInfo.decimals)) >=
                Number(formatDecimals18(price)) || isApproved
        )
    }

    // const whiteListStatus = useCheckWhitelist(account)

    const { mining: miningExecuteOrder, executeOrder } = useExecuteOrder()
    // contract interaction
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

    const { activateBrowserWallet } = useWalletConnect()
    const connectWallet = () => {
        activateBrowserWallet()
    }

    const handleButtonLabel = () => {
        switch (true) {
            case !account:
                return 'Connect wallet'

            case !isEnoughAllowance():
                return 'Approve Transaction'
            default:
                return 'Confirm Execute Offer Transaction'
        }
    }

    const onSubmit = async () => {
        if (isApproved) {
            onAcceptWarning()
        } else {
            setOpenRedemptionPopup(true)
        }
    }

    const onAcceptWarning = async () => {
        setSubmitted(true)
        setLoading(true)

        const amount = nftInfo.price

        // approve stable coin
        if (!isEnoughAllowance()) {
            await sendApprove(
                marketplace_contract,
                utils.parseUnits(formatDecimals18(amount), coinInfo.decimals)
            )
            setLoading(false)
            return
        }

        // handleAddOrder func

        const tx = await executeOrder(nftInfo.orderId)
        if (tx) {
            console.log('test: ', nftInfo.seller.walletAddress, account as string, nftInfo.orderId)
            await marketplaceApi.executeOrderBE(
                nftInfo.seller.walletAddress,
                account as string,
                nftInfo.orderId
            )
            setRefresh(!refresh)
            refetch()
        }

        reset({ amount: null, initials: null, confirm: false, confirmQualify: false })
        setIsApproved(false)
        setLoading(false)
        setSubmitted(false)
    }

    const data = [
        { key: 'name', value: `${nftInfo.name}` },
        { key: 'tokenId', value: `${nftInfo.tokenId}` },
        { key: 'catalyst', value: `${nftInfo.catalyst}` },
        { key: 'chain', value: `${nftInfo.chain}` },
        {
            key: 'price',
            value: `${formatMoney(formatDecimals18(nftInfo.price))} NAT`,
        },
    ]

    return (
        <Box sx={{ maxWidth: '488px', margin: '0 auto' }}>
            <Typography
                variant="subtitle2"
                fontWeight={700}
                mb="24px"
                fontFamily="Linik Sans Bold"
                lineHeight="34px"
            >
                Execute NFT Offering
            </Typography>

            <ImageNFTDetails uri={nftInfo.uri} />

            <Info>
                <Box>
                    {labels.map((label) => (
                        <Typography key={label} variant="body1" color="#5A5A6F" lineHeight="24px">
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
                            {key === 'chain' && (
                                <IconToken
                                    src={'/icons/ethereum-icon.svg'}
                                    alt="token"
                                    priority
                                    width={24}
                                    height={20}
                                    sx={{ marginBottom: '-5px', marginLeft: '-5px' }}
                                />
                            )}
                            {key === 'price' && (
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
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" justifyContent="flex-end" alignItems="center" mb="10px">
                    {account && (
                        <>
                            <Typography variant="body1">
                                Your balance:{' '}
                                <strong>{new BigNumber(formattedBalance).dp(2).toFormat()}</strong>
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

                <Box sx={{ marginTop: '20px', marginBottom: '-10px' }}>
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
                    ) : (
                        <ConfirmButton
                            disabled={miningExecuteOrder || loading}
                            loading={miningExecuteOrder || loading}
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            {handleButtonLabel()}
                        </ConfirmButton>
                    )}
                </Box>
            </Form>

            <Notification
                title="Execute Offer Details"
                desc="Please note that after you execute an offer, the wallet making the payment will become the owner of NFT."
                open={openRedemptionPopup}
                onClose={() => {
                    setOpenRedemptionPopup(false)
                }}
                onOk={() => {
                    onAcceptWarning()
                }}
            />
        </Box>
    )
}
