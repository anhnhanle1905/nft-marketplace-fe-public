import React from 'react'

import { useEthers, useTokenAllowance, useTokenBalance } from '@usedapp/core'

import { useForm } from 'react-hook-form'
import { Typography, Box, styled } from '@mui/material'

import { CheckFieldWithLabel } from '@/components'
// onchains
import { STABLE_COINS, marketplace_contract } from '@/onchains/constants'
// utils
import { roundNumber } from '@/onchains/helpers'
import { formatDecimals18, formatMoney } from '@/utils/common'
// store

// services
import { useWalletConnect } from '@/onchains/hooks/use-connect-wallet'

import { Notification } from '@/components/popup/Notification'

import { useCheckApprovalNFT } from '@/onchains/hooks/useNFT'

import { useCancelOrder } from '@/onchains/hooks/useMarketplace'
import { marketplaceApi } from '@/apis'
import { ImageNFTDetails } from './ImageNFTDetails'
import { IconToken } from '../Wallet'
import { useRouter } from 'next/router'
import { useN2ArenaStore } from '@/store/n2Arena_store'
import { useGetNFTs } from '@/services/nft'
import { ConfirmButton } from './ExecuteForm'

export const Info = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '24px 16px',
    backgroundColor: '#f7f7f7',
    borderRadius: '4px',
    'p:not(:last-child)': { marginBottom: '12px' },
}))

export const Form = styled('form')(() => ({
    textAlign: 'center',
    marginTop: '32px',
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

interface CancelOfferFormProps {
    nftInfo: any
    offeringFromSC?: any
    isOwner: boolean
    refresh: boolean
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const labels = ['Name', 'Token ID', 'Catalyst', 'Chain', 'Price']

export const CancelOfferForm = ({
    nftInfo,
    isOwner,
    refresh,
    setRefresh,
}: CancelOfferFormProps) => {
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
    const [isApprovedForNFT, setIsApprovedForNFT] = React.useState<boolean>(false)
    const [openRedemptionPopup, setOpenRedemptionPopup] = React.useState<boolean>(false)

    const { account } = useEthers()

    const resultCheckApprovalNFT = useCheckApprovalNFT(nftInfo.tokenId)

    // @ts-ignore
    const coinInfo = STABLE_COINS[selectedCoin]
    const balance = useTokenBalance(coinInfo.address, account)
    const formattedBalance = roundNumber(balance, coinInfo.decimals)
    const allowance = useTokenAllowance(coinInfo.address, account, marketplace_contract) || 0

    // const whiteListStatus = useCheckWhitelist(account)

    const { mining: miningCancelOrder, cancelOrder } = useCancelOrder()

    const { activateBrowserWallet } = useWalletConnect()
    const connectWallet = () => {
        activateBrowserWallet()
    }

    const handleButtonLabel = () => {
        switch (true) {
            case !account:
                return 'Connect wallet'

            default:
                return 'Confirm Cancel Offer Transaction'
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

        // handle cancelOrder func

        const tx = await cancelOrder(nftInfo.orderId)

        if (tx) {
            await marketplaceApi.cancelOrderBE(nftInfo.orderId)
            setRefresh(!refresh)
            refetch()
        }

        reset({ amount: null, initials: null, confirm: false, confirmQualify: false })
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
                Cancel NFT Offering
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
                    ) : (
                        <ConfirmButton
                            disabled={miningCancelOrder || loading}
                            loading={miningCancelOrder || loading}
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
                title="Cancel Offer Details"
                desc="Please note that after you cancel, NFT will be removed from Marketplace."
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
