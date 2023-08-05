import React, { useEffect, useState } from 'react'

import { Box, CardMedia, Typography, styled, useMediaQuery, useTheme } from '@mui/material'

import SearchBar from 'material-ui-search-bar'
import Link from 'next/link'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableContainer from '@mui/material/TableContainer'
import BigNumber from 'bignumber.js'
import { Heading } from '../Heading'

const ContentWrapper = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const Items = styled(Box)(() => ({
    border: '1px solid #E9E9F0',
    borderTop: 'none',
    position: 'absolute',
    top: 0,
    zIndex: 10,
    background: '#fff',
}))

const Item = styled(Box)(() => ({
    display: 'flex',
    borderRadius: '8px',
    // border: '1px solid #E9E9F0',
    '& img': {
        objectFit: 'cover',
        borderRadius: '8px',
        marginRight: '12px',
    },
    marginBottom: '20px',
}))
interface SearchItemProps {
    price: string
    tokenId: number
    nftName: string
    id: string
    category: string
    background: string
    chain: string
}
const SearchItem = ({
    price,
    tokenId,
    nftName,
    id,
    category,
    background,
    chain,
}: SearchItemProps) => {
    return (
        <Link href={'/marketplace/collection/' + tokenId}>
            <Item padding="10px">
                <Box width="545px" display="flex" alignItems="center">
                    <ContentWrapper>
                        <CardMedia
                            sx={{ width: 78, height: 64, borderRadius: '8px', marginRight: '14px' }}
                            image={background}
                        />

                        <Typography
                            variant="body1"
                            fontWeight={700}
                            fontFamily="Linik Sans Bold"
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical',
                            }}
                        >
                            {nftName}
                        </Typography>
                    </ContentWrapper>
                </Box>
                <ContentWrapper width="240px">
                    <Typography variant="h5" textAlign="right" width="100px">
                        {tokenId}
                    </Typography>
                </ContentWrapper>
                <ContentWrapper width="50px" sx={{ justifyContent: 'flex-end' }}>
                    <Typography variant="h5" textAlign="right" textTransform="capitalize">
                        {category}
                    </Typography>
                </ContentWrapper>

                <ContentWrapper width="175px" sx={{ justifyContent: 'flex-end' }}>
                    <Typography variant="h5" textAlign="right">
                        {chain}
                    </Typography>
                </ContentWrapper>
            </Item>
        </Link>
    )
}
interface SearchPanelProps {
    sellingNfts: any
}
const SearchPanel = ({ sellingNfts }: SearchPanelProps) => {
    const [searched, setSearched] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const theme = useTheme()
    const upLg = useMediaQuery(theme.breakpoints.up('lg'))

    const originalRows = [
        {
            catalyst: 'common',
            chain: 'Goerli',
            created_at: '2023-04-20T13:05:25.868Z',
            name: 'Three eye',
            orderId: 93,
            paymentToken: '0xFf24e9Ce8D1c32f01B24bE7b1C9BED386D43c22F',
            price: '1000000000000000000',
            seller: {
                _id: '6430de1519c9d119407d8042',
                walletAddress: '0x25dcf99d7949b60b02d9b436bddbbb2ee0bd2926',
                name: 'a',
            },
            status: 'onStock',
            tokenId: 7,
            updatedAt: '2023-04-23T05:53:18.661Z',
            uri: 'https://nft-marketplace-backend-z4eu.vercel.app/image/644140f752a493dccbf04680',
            walletOwner: '0x25dcf99d7949b60b02d9b436bddbbb2ee0bd2926',
            _id: '6441389567c196103c9203fc',
        },
    ]
    const [rows, setRows] = useState(originalRows)

    const requestSearch = (searchedVal: string) => {
        if (searchedVal === '') {
            setRows([])
            setSearched('')
        } else {
            setIsSearching(true)
            setSearched(searchedVal)
            const filteredRows = sellingNfts
                ? sellingNfts.filter((row: any) => {
                      return row.name.toLowerCase().includes(searchedVal.toLowerCase())
                  })
                : originalRows.filter((row) => {
                      return row.name.toLowerCase().includes(searchedVal.toLowerCase())
                  })
            setRows(filteredRows)
        }
    }

    const cancelSearch = () => {
        setIsSearching(false)
        setSearched('')
        requestSearch(searched)
        setRows([])
    }

    useEffect(() => {
        if (searched === '') {
            setIsSearching(false)
        }
    }, [searched])

    return (
        <Box sx={{ marginLeft: '10px' }}>
            <SearchBar
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
                placeholder="Search Marketplace"
                style={{
                    border: '1px solid #dfe6e9',
                    width: '98%',
                    boxShadow: 'none',
                    height: '60px',
                }}
            />
            {isSearching ? (
                <Box sx={{ position: 'relative' }}>
                    <Items sx={{ width: '98%', marginTop: '-2px' }}>
                        {upLg && <Heading />}

                        <Paper sx={{ width: '100%' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableBody>
                                        {rows.map((row, index) => {
                                            return (
                                                <SearchItem
                                                    key={index}
                                                    price={row.price}
                                                    tokenId={row.tokenId}
                                                    nftName={row.name}
                                                    id={row._id}
                                                    category={row.catalyst}
                                                    background={row.uri}
                                                    chain={row.chain}
                                                />
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Items>
                </Box>
            ) : null}
        </Box>
    )
}

export default SearchPanel
