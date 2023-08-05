import { useEffect, useState } from 'react'
// next
import Image from 'next/image'
import { useRouter } from 'next/router'
// MUI
import { Typography, Box, Grid, IconButton, Fab, Fade, styled } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { FullLayout } from '@/layouts'

// hooks
import { useOffsetScroll } from '@/hooks/useOffsetScroll'

import { marketplace_contract } from '@/onchains/constants'
import { nftApi } from '@/apis'

import { Loader } from '@/layouts/main/Loader'
import { AppContainer } from '@/components'
import { NFTDetailsContent } from '@/components/layout/NFTDetails'
import { NFT_DETAILS_FORM_ID } from '@/utils'
import { useWalletConnect } from '@/onchains/hooks/use-connect-wallet'
import { auctionApi } from '@/apis/auction'
import BigNumber from 'bignumber.js'
import { useGlobalVariables } from '@/hooks/useGlobalVariables'

const SubmitButton = styled(LoadingButton)(({ theme }) => ({
    maxWidth: '340px',
    borderRadius: '4px',
    width: '100%',
    padding: '11px 0',
    marginTop: '32px',
    marginBottom: '16px',
    boxShadow: 'none',
    '&:disabled': {
        backgroundColor: '#dad9d9',
        opacity: 0.5,
    },
}))

const BorderedBox = ({ title, value }: any) => (
    <Box
        sx={{
            width: { xs: '45%', lg: '206px' },
            pl: '12px',
            borderLeft: { xs: 'none', lg: 'solid 1px #727282' },
            color: 'common.white',
            display: 'inline-block',
            maxWidth: { xs: '166px', lg: '206px' },
        }}
    >
        <Typography variant="body1" mb="17px">
            {title}
        </Typography>
        <Typography variant="subtitle2" fontWeight={700} fontFamily="Linik Sans Bold">
            {value}
        </Typography>
    </Box>
)

const ContainedBox = ({ title, value, sx = {} }: any) => (
    <Box
        sx={{
            maxWidth: { lg: '166px' },
            width: { xs: '45%', lg: '48%' },
            padding: { xs: '20px 0', lg: '20px 36px' },
            color: 'common.white',
            display: 'inline-block',
            backgroundColor: 'rgba(244, 245, 255, 0.03)',
            border: '1px solid rgba(244, 245, 255, 0.03)',
            backgroundFilter: 'blur(8px)',
            borderRadius: '4px 0px 0px 4px',
            textAlign: 'center',
            '&:not(:last-child)': { mr: '8px' },
            ...sx,
        }}
    >
        <Typography
            color="grey.200"
            textTransform="uppercase"
            fontSize="14px"
            mb="14px"
            fontWeight={700}
            fontFamily="Linik Sans Bold"
        >
            {title}
        </Typography>
        <Typography
            variant="subtitle2"
            textTransform={'capitalize'}
            fontWeight={700}
            fontFamily="Linik Sans Bold"
            fontSize="18px"
        >
            {value}
        </Typography>
    </Box>
)
interface sellerProps {
    name: string
    walletAddress: string
    _id: string
}

interface nftInfoProps {
    name: string
    uri: string
    orderId: number
    tokenId: number
    paymentToken: string
    walletOwner: string
    status: string
    seller: sellerProps
    catalyst: string
    chain: string
}

export default function OfferingDetailsPage() {
    const { account } = useWalletConnect()

    const [currentTab, setCurrentTab] = useState(0)
    const isVisible = useOffsetScroll(100)

    const [refresh, setRefresh] = useState(false)
    const [isSellingInMarketplace, setIsSellingInMarketplace] = useState<boolean>(false)
    const [isOwnerNft, setIsOwnerNft] = useState<boolean>(false)
    const [toBeExecute, setToBeExecute] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    // const [isDisableExecuteButton, setIsDisableExecuteButton] = useState<boolean>(true)

    const { history } = useGlobalVariables()

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
    const [auctionInfo, setAuctionInfo] = useState<any>(initialAuction)

    const router = useRouter()

    const [nftInfo, setNftInfo] = useState<nftInfoProps>({
        name: '...',
        uri: '...',
        orderId: 1,
        tokenId: 1,
        paymentToken: '...',
        walletOwner: '...',
        status: 'string',
        seller: { name: 'string', walletAddress: 'string', _id: 'string' },
        catalyst: '',
        chain: '',
    })

    const tokenIdByRoute = router.query?.id as string

    const status = [
        {
            title: 'Catalyst',
            value: `${nftInfo.catalyst}`,
        },

        {
            title: 'Chain',
            value: `${nftInfo.chain}`,
        },
    ]

    const data = [
        { title: 'Token ID', value: `${nftInfo.tokenId}` },
        { title: 'Payment', value: `NAT` },
    ]

    // const { background } = offering
    const background = nftInfo ? nftInfo.uri : ''

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await nftApi.getNFTByTokenId(tokenIdByRoute)
                if (data) {
                    setNftInfo(data)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [refresh, tokenIdByRoute])

    useEffect(() => {
        const statusSelling =
            nftInfo.walletOwner.toLowerCase() === marketplace_contract.toLowerCase()

        setIsSellingInMarketplace(statusSelling)

        const sellerAddress = nftInfo.seller ? nftInfo.seller.walletAddress : ''

        const ownerAddress =
            nftInfo &&
            nftInfo.seller &&
            nftInfo.status === 'onStock' &&
            nftInfo.seller.walletAddress === '0x00'
                ? nftInfo.walletOwner
                : sellerAddress
        const statusOwner = ownerAddress.toLowerCase() === account?.toLowerCase()

        setIsOwnerNft(statusOwner)

        const statusToBeExecute = !statusOwner && nftInfo.status === 'selling'

        setToBeExecute(statusToBeExecute)
    }, [refresh, nftInfo, account])

    return (
        <FullLayout>
            {loading ? (
                <Loader />
            ) : (
                <Box>
                    <Box
                        component="main"
                        sx={{
                            padding: { xs: '40px 0', lg: '68.25px 0 103px' },
                            position: 'relative',
                            background: `#212638 center / cover no-repeat url(${background})`,
                            '&:before': {
                                content: "''",
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                top: 0,
                                left: 0,
                                backgroundColor: '#232233',
                                opacity: 0.9,
                            },
                        }}
                    >
                        <AppContainer fullWidth>
                            <IconButton
                                sx={{ mb: '42.25px', ml: '-8px' }}
                                onClick={() => {
                                    if ((history?.length || 0) < 3) {
                                        router.push('/marketplace')
                                    } else {
                                        router.back()
                                    }
                                }}
                            >
                                <Image
                                    src="/images/icon-arrow-left.svg"
                                    alt="back"
                                    priority
                                    width={24}
                                    height={24}
                                />
                            </IconButton>
                            <Grid
                                container
                                sx={{ position: 'relative', zIndex: 1 }}
                                justifyContent="space-between"
                                alignItems="center"
                                textAlign={{ xs: 'center', lg: 'left' }}
                            >
                                <Grid item xs={12} lg={7} mb={{ xs: '50px', lg: 0 }}>
                                    <Typography
                                        variant="h2"
                                        fontFamily="Nexa"
                                        fontWeight={900}
                                        color="common.white"
                                        textTransform="capitalize"
                                        lineHeight="58px"
                                        mb="32px"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: '2',
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {nftInfo.name}
                                    </Typography>
                                    {data.map(({ title, value }) => (
                                        <BorderedBox key={title} title={title} value={value} />
                                    ))}
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    lg={4}
                                    textAlign="center"
                                    sx={{
                                        maxWidth: '340px !important',
                                        margin: { xs: 'auto', lg: '0' },
                                    }}
                                >
                                    <div>
                                        {status.map(({ title, value }) => (
                                            <ContainedBox key={title} title={title} value={value} />
                                        ))}
                                    </div>

                                    {/* {isOwnerNft ? (
                                        isSellingInMarketplace ? (
                                            <SubmitButton
                                                variant="contained"
                                                onClick={() => {
                                                    const nftDetailsForm =
                                                        document.getElementById(NFT_DETAILS_FORM_ID)
                                                    if (nftDetailsForm) {
                                                        const heightToTop =
                                                            window.pageYOffset +
                                                            nftDetailsForm?.getBoundingClientRect()
                                                                .top

                                                        window.scrollTo({
                                                            top:
                                                                heightToTop -
                                                                window.innerHeight / 5,
                                                            behavior: 'smooth',
                                                        })
                                                    }

                                                    setCurrentTab(1)
                                                }}
                                            >
                                                <Typography
                                                    variant="button"
                                                    fontWeight={700}
                                                    textTransform="none"
                                                    color="#fff"
                                                >
                                                    Cancel Order
                                                </Typography>
                                            </SubmitButton>
                                        ) : (
                                            <SubmitButton
                                                variant="contained"
                                                onClick={() => {
                                                    const nftDetailsForm =
                                                        document.getElementById(NFT_DETAILS_FORM_ID)
                                                    if (nftDetailsForm) {
                                                        const heightToTop =
                                                            window.pageYOffset +
                                                            nftDetailsForm?.getBoundingClientRect()
                                                                .top

                                                        window.scrollTo({
                                                            top:
                                                                heightToTop -
                                                                window.innerHeight / 5,
                                                            behavior: 'smooth',
                                                        })
                                                    }

                                                    setCurrentTab(1)
                                                }}
                                                disabled={nftInfo.status === 'auction'}
                                            >
                                                <Typography
                                                    variant="button"
                                                    fontWeight={700}
                                                    textTransform="none"
                                                    color="#fff"
                                                >
                                                    Add Order
                                                </Typography>
                                            </SubmitButton>
                                        )
                                    ) : // toBeExecute ? ( */}
                                    {/* <SubmitButton */}
                                    {/* //         variant="contained"
                                    //         onClick={() => {
                                    //             const nftDetailsForm =
                                    //                 document.getElementById(NFT_DETAILS_FORM_ID)
                                    //             if (nftDetailsForm) {
                                    //                 const heightToTop =
                                    //                     window.pageYOffset +
                                    //                     nftDetailsForm?.getBoundingClientRect().top

                                    //                 window.scrollTo({
                                    //                     top: heightToTop - window.innerHeight / 5,
                                    //                     behavior: 'smooth',
                                    //                 })
                                    //             }

                                    //             setCurrentTab(1)
                                    //         }}
                                    //     >
                                    //         <Typography
                                    //             variant="button"
                                    //             fontWeight={700}
                                    //             textTransform="none"
                                    //             color="#fff"
                                    //         >
                                    //             Execute Order
                                    //         </Typography>
                                    //     </SubmitButton>
                                    // )
                                    // null} */}
                                </Grid>
                            </Grid>
                        </AppContainer>
                    </Box>

                    <NFTDetailsContent
                        value={currentTab}
                        setValue={setCurrentTab}
                        nftInfo={nftInfo}
                        // offeringFromSC={offeringFromSC}
                        isVisible={isVisible}
                        isOwner={isOwnerNft}
                        toBeExecute={toBeExecute}
                        isSellingInMarketplace={isSellingInMarketplace}
                        refresh={refresh}
                        setRefresh={setRefresh}
                    />

                    <Fade in={isVisible}>
                        <Fab
                            sx={{
                                backgroundColor: '#727282 !important',
                                opacity: 0.9,
                                boxShadow: 'none',
                                position: 'fixed',
                                bottom: '40px',
                                right: { xs: '20px', lg: '80px' },
                            }}
                            onClick={() =>
                                window &&
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                })
                            }
                        >
                            <Image
                                src="/images/icon-arrow-up.svg"
                                alt="back"
                                priority
                                width={18.5}
                                height={15.5}
                            />
                        </Fab>
                    </Fade>
                </Box>
            )}
        </FullLayout>
    )
}
