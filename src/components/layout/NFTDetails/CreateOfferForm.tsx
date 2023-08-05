import React from 'react'

import { useEthers, useTokenBalance } from '@usedapp/core'

import { useForm } from 'react-hook-form'
import { Typography, Box, styled, Select, MenuItem } from '@mui/material'

import { TextFieldWithLabel, CheckFieldWithLabel } from '@/components'
// onchains
import { STABLE_COINS, marketplace_contract } from '@/onchains/constants'

// utils
import { roundNumber } from '@/onchains/helpers'

import { useWalletConnect } from '@/onchains/hooks/use-connect-wallet'

import { Notification } from '@/components/popup/Notification'
import { useApproveNFT } from '@/onchains/hooks/useApproveNFT'
import { useCheckApprovalNFT, useCheckOwnerOfNFT } from '@/onchains/hooks/useNFT'
import BigNumber from 'bignumber.js'
import { useAddOrder } from '@/onchains/hooks/useMarketplace'
import { marketplaceApi } from '@/apis'
import { ImageNFTDetails } from './ImageNFTDetails'
import { IconToken } from '../Wallet'
import { useN2ArenaStore } from '@/store/n2Arena_store'
import { useRouter } from 'next/router'
import { useGetNFTs } from '@/services/nft'
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

interface CreateOfferFormProps {
    nftInfo: any
    offeringFromSC?: any
    isOwner: boolean
    refresh: boolean
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const labels = ['Name', 'Token ID', 'Catalyst', 'Chain', 'Payment Token']

export const CreateOfferForm = ({
    nftInfo,
    isOwner,
    refresh,
    setRefresh,
}: CreateOfferFormProps) => {
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

    const [selectedCoin, setSelectedCoin] = React.useState<string>(STABLE_COINS.NAT.symbol)
    const [submitted, setSubmitted] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [isApproved, setIsApproved] = React.useState<boolean>(false)
    const [isApprovedForNFT, setIsApprovedForNFT] = React.useState<boolean>(false)
    const [openRedemptionPopup, setOpenRedemptionPopup] = React.useState<boolean>(false)

    const { account } = useEthers()

    const { refetch } = useGetNFTs()

    const resultCheckApprovalNFT = useCheckApprovalNFT(nftInfo.tokenId)
    const resultCheckOwnerOfNFT = useCheckOwnerOfNFT(nftInfo.tokenId)

    // @ts-ignore
    const coinInfo = STABLE_COINS[selectedCoin]
    const balance = useTokenBalance(coinInfo.address, account)
    const formattedBalance = roundNumber(balance, coinInfo.decimals)

    const isApprovalNFT = () => {
        return (
            resultCheckApprovalNFT.toLowerCase() === marketplace_contract.toLowerCase() ||
            isApprovedForNFT
        )
    }

    const isOwnerOfNFT = () => {
        return resultCheckOwnerOfNFT.toLowerCase() === account?.toLowerCase()
    }

    const min_amount = 0.01
    const availableCapability = 1000000

    const { mining: miningApproveNFT, approveNFT } = useApproveNFT()
    const { mining: miningAddOrder, addOrder } = useAddOrder()
    // contract interaction

    const { activateBrowserWallet } = useWalletConnect()
    const connectWallet = () => {
        activateBrowserWallet()
    }

    const handleButtonLabel = () => {
        switch (true) {
            case !account:
                return 'Connect wallet'
            case !isOwnerOfNFT():
                return 'You are not the owner of NFT'
            case !isApprovalNFT():
                return 'Approve NFT Transaction'
            default:
                return 'Confirm Create Offer Transaction'
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

        const { amount } = getValues()

        if (!isApprovalNFT()) {
            await approveNFT(nftInfo.tokenId)
            setLoading(false)
            return
        }

        // handleAddOrder func
        const TEN = new BigNumber(10)
        const priceFormat = new BigNumber(amount).times(TEN.pow(18)).toFixed()
        if (resultCheckOwnerOfNFT) {
            const tx = await addOrder(nftInfo.tokenId, nftInfo.paymentToken, BigInt(priceFormat))
            if (tx) {
                await marketplaceApi.addOrderBE()
                setRefresh(!refresh)
                refetch()
            }
        }

        reset({ amount: null, initials: null, confirm: false, confirmQualify: false })
        setIsApprovedForNFT(false)
        setLoading(false)
        setSubmitted(false)
    }

    const data = [
        { key: 'name', value: `${nftInfo.name}` },
        { key: 'tokenId', value: `${nftInfo.tokenId}` },
        { key: 'catalyst', value: `${nftInfo.catalyst}` },
        { key: 'chain', value: `${nftInfo.chain}` },
        { key: 'paymentToken', value: `NAT` },
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
                Create NFT Offering
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
                <TextFieldWithLabel
                    label="Create Offer Now"
                    placeholder="Enter Price Offer "
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
                                          value < min_amount
                                              ? `Should be greater than $${min_amount}`
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
                            disabled={
                                miningAddOrder || miningApproveNFT || loading || !isOwnerOfNFT()
                            }
                            loading={miningAddOrder || miningApproveNFT || loading}
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
                title="Create Offer Details"
                desc="Please note that after you create an offer, N2 Arena will own your NFT and will transfer ownership to other users when the order is fulfilled."
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
