import React, { useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import NFTItemCard from '@/components/layout/NFTItemCard'
import { AppContainer, SectionTitle } from '@/components'
import { Loader } from '@/layouts/main/Loader'
import CheckboxFilter from '@/components/layout/CheckboxFilter'
import SearchPanel from '@/components/layout/SearchPanel'
import { FullLayoutWithoutLogin } from '@/layouts/main/FullLayoutWithoutLogin'
import { useGetNFTs } from '@/services/nft'

const Marketplace = () => {
    const { allNfts, loading } = useGetNFTs()

    const [selectedFilters, setSelectedFilters] = React.useState<string[]>([])

    const sellingNfts = allNfts
        ? allNfts.filter((item: any) => item.status === 'selling' || item.status === 'auction')
        : []

    const [resultFilter, setResultFilter] = React.useState<any>([])

    const resultFilterInMarketplace = resultFilter.filter((item1: any) =>
        sellingNfts.some((item2: any) => item2._id === item1._id)
    )

    const showingNfts = selectedFilters.length > 0 ? resultFilterInMarketplace : sellingNfts

    useEffect(() => {
        console.log('allNfts: ', allNfts)
    }, [allNfts])

    return (
        <FullLayoutWithoutLogin transparentHeader>
            {loading ? (
                <Loader />
            ) : (
                <Box marginTop="1rem" width="100%">
                    <Box
                        sx={{
                            paddingLeft: { xs: '30px', sm: '80px', lg: '100px' },
                            paddingRight: { xs: '30px', sm: '80px', lg: '100px' },
                            marginTop: { xs: '50px', sm: '80px', lg: '150px' },
                            marginBottom: { xs: '30px', sm: '50px', lg: '70px' },
                        }}
                    >
                        <SectionTitle
                            sx={{
                                color: '#242059',
                                fontWeight: '700',
                                fontFamily: 'Nexa Heavy',
                                fontSize: '44px',
                                width: 486,
                                lineHeight: '60px',
                                marginBottom: '30px',
                            }}
                        >
                            Browse Marketplace
                        </SectionTitle>

                        <SearchPanel sellingNfts={sellingNfts} />
                    </Box>

                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between !important',
                            paddingLeft: { xs: '30px', sm: '60px', lg: '100px' },
                            paddingRight: { xs: '30px', sm: '60px', lg: '100px' },
                        }}
                    >
                        <CheckboxFilter
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                            setResultFilter={setResultFilter}
                        />

                        <AppContainer container rowSpacing={{ xs: '24px', lg: 0 }}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    // marginTop: '-35px',
                                    marginLeft: '10px',
                                }}
                            >
                                {showingNfts.length} Results
                            </Box>
                            {showingNfts.map((nft: any, index: number) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    <NFTItemCard orders={nft || []} />
                                </Grid>
                            ))}
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '24px',
                                    marginBottom: '34px',
                                }}
                            />
                        </AppContainer>
                    </Box>
                </Box>
            )}
        </FullLayoutWithoutLogin>
    )
}

export default Marketplace
