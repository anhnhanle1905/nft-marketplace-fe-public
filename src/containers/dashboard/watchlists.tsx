import { AppContainer } from '@/components/layout/AppContainer'
import { Box, Typography } from '@mui/material'
import { useN2ArenaStore } from '@/store/n2Arena_store'
import { Heading } from '@/components/layout/Heading'
import { PortfolioItem } from '@/components/layout/PortfolioItem'
import { useWalletConnect } from '@/onchains/hooks/use-connect-wallet'
import React from 'react'
import { userApi } from '@/apis/user'
import { ConfirmButton } from '@/components/layout/NFTDetails/ExecuteForm'

const WatchlistsContainer = () => {
    const { me } = useN2ArenaStore()
    const { account, activateBrowserWallet } = useWalletConnect()

    const initialWatchLists = [
        {
            _id: '',
            tokenId: 0,
            orderId: 0,
            walletOwner: '',
            owner: '',
            seller: {
                _id: '',
                walletAddress: '',
            },
            image: '',
            uri: '',
            name: '',
            status: '',
            chain: '',
            price: 0,
            paymentToken: '',
            favorite: 0,
            tagNFT: '',
            subTagNFT: '',
            catalyst: '',
        },
    ]

    const [watchLists, setWatchLists] = React.useState<any>(initialWatchLists)

    const connectWallet = () => {
        activateBrowserWallet()
    }

    React.useEffect(() => {
        ;(async () => {
            try {
                const data = await userApi.getFavoriteNFT()
                if (data) {
                    setWatchLists(data.data)
                } else {
                    setWatchLists([])
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    return (
        <>
            <Box
                sx={{
                    height: { xs: '450px', md: '561px' },
                    background:
                        '#f4f5ff center / cover no-repeat url("/background/portfolio-background.png")',
                }}
            >
                <AppContainer container={false} sx={{ paddingTop: { xs: '60px', md: '160px' } }}>
                    <Typography
                        fontSize={{ xs: '40px', md: '84px' }}
                        fontWeight={900}
                        fontFamily="Nexa"
                        lineHeight="100px"
                        color="#242059"
                    >
                        Hi {me?.firstName} {me?.lastName}!
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="common.black"
                        maxWidth="530px"
                        mt="32px"
                        fontFamily="Linik Sans"
                        lineHeight="34px"
                    >
                        Welcome to your Watchlists! View your current portfolio of N2 Arena below
                    </Typography>

                    {!account && (
                        <ConfirmButton
                            variant="contained"
                            onClick={connectWallet}
                            sx={{ padding: '10px 20px', marginTop: '40px' }}
                        >
                            Connect Wallet
                        </ConfirmButton>
                    )}
                </AppContainer>
            </Box>

            <Box sx={{ overflowX: { xs: 'auto', md: 'clip' } }}>
                <Heading />

                <AppContainer>
                    <Box
                        padding={{ xs: '16px 20px 60px 0', lg: '16px 0 68px', minWidth: '1128px' }}
                    >
                        {watchLists._id !== '' &&
                            watchLists.map(
                                (
                                    { name, tokenId, catalyst, chain, paymentToken, uri }: any,
                                    index: number
                                ) => (
                                    <PortfolioItem
                                        key={index}
                                        name={name}
                                        tokenId={tokenId}
                                        catalyst={catalyst}
                                        // id={_id}
                                        uri={uri}
                                        paymentToken={paymentToken}
                                        chain={chain}
                                    />
                                )
                            )}
                    </Box>
                </AppContainer>
            </Box>
        </>
    )
}

export default WatchlistsContainer
