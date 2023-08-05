import { AppContainer } from '@/components/layout/AppContainer'
import { Box, Typography } from '@mui/material'
import { useN2ArenaStore } from '@/store/n2Arena_store'
import { Heading } from '@/components/layout/Heading'
import { PortfolioItem } from '@/components/layout/PortfolioItem'
import { useGetNFTs } from '@/services/nft'
import { useWalletConnect } from '@/onchains/hooks/use-connect-wallet'
import { ConfirmButton } from '@/components/layout/NFTDetails/ExecuteForm'

const PortfolioContainer = () => {
    const { me } = useN2ArenaStore()
    const { account, activateBrowserWallet } = useWalletConnect()

    const { allNfts, loading } = useGetNFTs()

    const portfolios = allNfts
        ? allNfts.filter(
              //thêm case cho auction
              (item: any) =>
                  (item.status === 'onStock' &&
                      item.walletOwner.toLowerCase() === account?.toLowerCase()) ||
                  (item.status === 'selling' &&
                      item.seller.walletAddress.toLowerCase() === account?.toLowerCase())
          )
        : []

    const connectWallet = () => {
        activateBrowserWallet()
    }

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
                        Welcome to your Portfolio! View your current portfolio of N2 Arena below
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
                        {portfolios.map(
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

export default PortfolioContainer
