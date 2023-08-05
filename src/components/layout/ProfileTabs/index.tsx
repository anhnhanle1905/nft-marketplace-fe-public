import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { userApi } from '@/apis/user'
import { Grid } from '@mui/material'
import NFTItemCard from '../NFTItemCard'
import { useEffect, useState } from 'react'
import { EmptyActivity } from '../EmptyActivity'

import { ActivityTab } from '../ActivityTab'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useWalletConnect } from '@/onchains/hooks/use-connect-wallet'

interface GridNFTProps {
    value: number
    index: number
    nfts: nftInfoProps[]
    isLoading: Boolean
}

function GridNFT({ value, index, nfts, isLoading }: GridNFTProps) {
    return (
        <Box sx={{ paddingTop: '20px' }}>
            {isLoading ? (
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    // alignItems="flex-start"
                >
                    <Skeleton
                        count={4}
                        height={432}
                        width={300}
                        style={{ marginLeft: '15px' }}
                        inline
                    />
                </Grid>
            ) : (
                value === index &&
                (nfts.length > 0 ? (
                    <Grid container>
                        {nfts.map((nft: any, index: number) => (
                            <Grid item xs={12} sm={6} lg={3} key={index}>
                                <NFTItemCard orders={nft || []} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box
                        paddingBottom="50px"
                        display="flex"
                        justifyContent="center"
                        width="100%"
                        height="100%"
                    >
                        <EmptyActivity></EmptyActivity>
                    </Box>
                ))
            )}
        </Box>
    )
}

function a11yProps(index: number) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    }
}

export interface userInfoProps {
    _id: string
    name: string
    walletAddress: string
}

export interface nftInfoProps {
    name: string
    uri: string
    orderId: number
    tokenId: number
    paymentToken: string
    walletOwner: string
    status: string
    seller: userInfoProps
}

export default function ProfileTabs() {
    const [index, setIndex] = useState(0)
    const { account } = useWalletConnect()

    const handleChange = (event: React.SyntheticEvent, newIndex: number) => {
        setIndex(newIndex)
    }

    const [isLoadingCollect, setIsLoadingCollect] = useState(false)
    const [isLoadingFavorite, setIsLoadingFavorite] = useState(false)

    const [wishList, setWishList] = useState<Array<nftInfoProps>>([])
    const [collected, setCollected] = useState<Array<nftInfoProps>>([
        {
            name: '...',
            uri: '...',
            orderId: 0,
            tokenId: 0,
            paymentToken: '...',
            walletOwner: '...',
            status: '...',
            seller: {
                _id: '...',
                name: '...',
                walletAddress: '0x94516f310cb119bd79e24ea969b8374025ca9d48',
            },
        },
    ])

    const itemNav = ['Collected', 'Created', 'Favorited', 'Activity']

    useEffect(() => {
        console.log(index)
        ;(async () => {
            try {
                if (account == null) {
                    return
                }
                if (index == 0) {
                    setIsLoadingCollect(true)
                    const { data } = await userApi.getCollectedNFT(account!)
                    if (data) {
                        setCollected(data)
                    }
                    setIsLoadingCollect(false)
                } else if (index == 2) {
                    setIsLoadingFavorite(true)
                    const { data } = await userApi.getWishList(account!)
                    if (data) {
                        setWishList(data)
                    }
                    setIsLoadingFavorite(false)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [index, account])

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Tabs value={index} onChange={handleChange}>
                    {itemNav.map((item, index) => (
                        <Tab label={item} {...a11yProps(index)} key={index} />
                    ))}
                </Tabs>
            </Box>
            {/*tab Collected*/}
            <GridNFT value={0} index={index} nfts={collected} isLoading={isLoadingCollect} />
            {/*tab Created*/}

            {index === 1 && <Typography>Item Two</Typography>}

            {/*tab favorite*/}
            <GridNFT value={2} index={index} nfts={wishList} isLoading={isLoadingFavorite} />

            {index === 3 && <ActivityTab index={index} account={account as string} />}
        </Box>
    )
}
