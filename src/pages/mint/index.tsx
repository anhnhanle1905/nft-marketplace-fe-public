import { AppContainer } from '@/components/layout/AppContainer'
import { Box, Typography } from '@mui/material'
import { roundNumber } from '@/onchains/helpers'
import { useN2ArenaStore } from '@/store/n2Arena_store'
import { useGetNFTs } from '@/services/nft'

import { FullLayout } from '@/layouts'
import { useForm } from 'react-hook-form'
import { ConfirmButton, Form, Info } from '@/components/layout/NFTDetails/ExecuteForm'
import { ERC20Interface, useTokenAllowance, useTokenBalance } from '@usedapp/core'
import { STABLE_COINS, marketplace_contract } from '@/onchains/constants'
import { Contract } from 'ethers'
import React, { useEffect } from 'react'
import { Notification } from '@/components/popup/Notification'
import { useContractFunction } from '@/onchains/hooks/useContractFunction'
import { toast } from 'react-toastify'
import { ImageNFTDetails } from '@/components/layout/NFTDetails/ImageNFTDetails'
import Countdown from '@/components/layout/CountDown'
import { useMintFromUser } from '@/onchains/hooks/useNFT'
import { nftApi } from '@/apis'
import Link from 'next/link'
import { useWalletConnect } from '@/onchains/hooks/use-connect-wallet'
import { userApi } from '@/apis/user'
import { User } from '@/types'
import { useRouter } from 'next/router'

export const initialCurrentUser = {
    _id: '',
    listNFT: [],
    name: '',
    firstName: '',
    lastName: '',
    wishList: [],
    walletList: [],
    uniqueEmailId: 0,
    email: '',
    isVerified: false,
    nextFreeMint: '',
    isFinishedKYC: false,
}

export const convertToVietNamTime = (time: string) => {
    const dateFormat = new Date(time)
    const vietnamTimeOffset = 7 * 60 * 60 * 1000
    const toVietNamTime = new Date(dateFormat.getTime() - vietnamTimeOffset)
    return toVietNamTime
}

const MintContainer = () => {
    const { me } = useN2ArenaStore()
    const { account, activateBrowserWallet } = useWalletConnect()

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        reset,
        getValues,
    } = useForm()
    const { allNfts, loading: loadingGetNFTs } = useGetNFTs()

    const [selectedCoin, setSelectedCoin] = React.useState<string>(STABLE_COINS.NAT.symbol)
    const [submitted, setSubmitted] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [isApproved, setIsApproved] = React.useState<boolean>(false)
    const [isAllowedMint, setIsAllowedMint] = React.useState<boolean>(false)
    const [refresh, setRefresh] = React.useState<boolean>(false)
    const [currentUser, setCurrentUser] = React.useState<User>(initialCurrentUser)

    const nftInfo = {
        catalyst: '-',
        chain: '-',
        created_at: '',
        favorite: 0,
        image: '',
        name: '-',
        orderId: 0,
        owner: '',
        paymentToken: '',
        price: 0,
        seller: { _id: '', walletAddress: '0x00' },
        status: 'onStock',
        subTagNFT: 'dragon',
        tagNFT: 'animal',
        tokenId: '-',
        updatedAt: '2023-06-19T04:04:57.485Z',
        uri: '/images/no_data.jpg',
        walletOwner: '0x94516f310cb119bd79e24ea969b8374025ca9d48',
    }
    const [newNFT, setNewNFT] = React.useState<any>(nftInfo)

    const [openRedemptionPopup, setOpenRedemptionPopup] = React.useState<boolean>(false)
    // @ts-ignore
    const coinInfo = STABLE_COINS[selectedCoin]
    const balance = useTokenBalance(coinInfo.address, account)
    const formattedBalance = roundNumber(balance, coinInfo.decimals)
    const allowance = useTokenAllowance(coinInfo.address, account, marketplace_contract) || 0
    const router = useRouter()

    // const isEnoughAllowance = () => {
    //     //hardcode 20 NAT
    //     const price = 20

    //     return Number(utils.formatUnits(allowance, coinInfo.decimals)) >= price || isApproved
    // }

    const { mining: miningMintFromUser, mintFromUser } = useMintFromUser()

    const handleButtonLabel = () => {
        switch (true) {
            case !account:
                return 'Connect wallet'

            case !me.isFinishedKYC:
                return 'You have not completed KYC'

            // case !isEnoughAllowance():
            //     return 'Approve Transaction'
            default:
                return 'Mint NFT'
        }
    }

    const connectWallet = () => {
        activateBrowserWallet()
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

        // mintFromUser func
        const tx = await mintFromUser(account as string)

        if (tx) {
            //@ts-ignore'
            const newTokenId = roundNumber(tx.events[0].args.tokenId) * 10 ** 18

            let newNft = await nftApi.mintNFTFromUserBE(`${newTokenId}`, account as string)
            // let newNft = await nftApi.getNFTByTokenId(`${newTokenId}`)
            setNewNFT(newNft.data)
            console.log('newNft: ', newNft)
            setIsAllowedMint(false)
        }

        reset({ amount: null, initials: null, confirm: false, confirmQualify: false })
        setIsApproved(false)
        setLoading(false)
        setSubmitted(false)
        setRefresh(!refresh)
    }

    const labels = ['Name', 'Token ID', 'Catalyst', 'Chain']
    const data = [
        { key: 'name', value: `${newNFT.name}` },
        { key: 'tokenId', value: `${newNFT.tokenId}` },
        { key: 'catalyst', value: `${newNFT.catalyst}` },
        { key: 'chain', value: `${newNFT.chain}` },
    ]

    const currentDay = new Date()

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await userApi.getUser()
                if (data) {
                    setCurrentUser(data)
                }
                console.log('current user: ', data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [refresh, me, me.nextFreeMint])
    return (
        <FullLayout transparentHeader>
            <Box
                sx={{
                    height: { xs: '350px', md: '450px' },
                    background:
                        '#f4f5ff center / cover no-repeat url("/background/portfolio-background.png")',
                }}
            >
                <AppContainer container={false} sx={{ paddingTop: { xs: '60px', md: '130px' } }}>
                    <Typography
                        fontSize={{ xs: '40px', md: '84px' }}
                        fontWeight={900}
                        fontFamily="Nexa"
                        lineHeight="100px"
                        color="#242059"
                    >
                        Mint NFT
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="common.black"
                        maxWidth="550px"
                        mt="32px"
                        fontFamily="Linik Sans"
                        lineHeight="34px"
                    >
                        Welcome to Mint NFT! <br />
                    </Typography>
                </AppContainer>
            </Box>
            <Box sx={{ overflowX: { xs: 'auto', md: 'clip' } }}>
                <AppContainer>
                    <Box
                        padding={{ xs: '16px 20px 60px 0', lg: '16px 0 68px', minWidth: '1128px' }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                            }}
                        >
                            <Box sx={{ width: '40%' }}>
                                <Countdown
                                    targetDate={
                                        me.nextFreeMint
                                            ? currentUser.nextFreeMint
                                                ? convertToVietNamTime(currentUser.nextFreeMint)
                                                : convertToVietNamTime(me.nextFreeMint)
                                            : convertToVietNamTime(currentDay.toLocaleString())
                                    }
                                    isAllowedMint={isAllowedMint}
                                    setIsAllowedMint={setIsAllowedMint}
                                />

                                <Typography marginTop={'20px'}>
                                    Every day you get one free NFT minting.
                                    {/* To mint NFTs more, you
                                    will have to pay 20 NAT for each paid minting */}
                                </Typography>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Box sx={{ mt: '42px' }}>
                                        {!account ? (
                                            <ConfirmButton
                                                variant="contained"
                                                fullWidth
                                                onClick={connectWallet}
                                            >
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
                                                    loading || !isAllowedMint || miningMintFromUser
                                                }
                                                loading={loading || miningMintFromUser}
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
                                    title="Mint NFT Details"
                                    desc="Please note that, after minting NFT, you will have to wait until 7 AM the next day to be able to Mint NFT again."
                                    open={openRedemptionPopup}
                                    onClose={() => {
                                        setOpenRedemptionPopup(false)
                                    }}
                                    onOk={() => {
                                        onAcceptWarning()
                                    }}
                                />
                            </Box>

                            <Box sx={{ width: '40%', marginTop: '10px' }}>
                                <Link
                                    href={
                                        newNFT.tokenId === '-'
                                            ? `/mint`
                                            : `/marketplace/collection/${newNFT.tokenId}`
                                    }
                                >
                                    <Typography marginBottom={'10px'}>
                                        Your NFT recently Mint:
                                    </Typography>
                                    <Box>
                                        <ImageNFTDetails uri={newNFT.uri} />
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
                                                        {value}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        </Info>
                                    </Box>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </AppContainer>
            </Box>
        </FullLayout>
    )
}

export default MintContainer
