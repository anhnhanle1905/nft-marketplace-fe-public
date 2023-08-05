import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Typography, Box } from '@mui/material'
import { AppContainer, HEADER_HEIGHT } from '@/components'
import { Overview } from './Overview'
import { CreateOfferForm } from './CreateOfferForm'
import { ExecuteForm } from './ExecuteForm'
import { CancelOfferForm } from './CancelOfferForm'
import { NFT_DETAILS_FORM_ID } from '@/utils'
import { PaticipateAuctionForm } from './PaticipateAuction'
import { CreateAuctionForm } from './CreateAuctionForm'
import { auctionApi } from '@/apis/auction'
import { ConfirmAuctionForm } from './ConfirmAuctionForm'
import { useRouter } from 'next/router'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ padding: { xs: '60px 0', lg: '58px 0 101px' } }}>{children}</Box>
            )}
        </div>
    )
}

interface NFTDetailsContentProps {
    value: number
    setValue: Function
    nftInfo?: any
    isVisible?: boolean
    isOwner: boolean
    toBeExecute: boolean
    isSellingInMarketplace: boolean
    disableOverview?: boolean
    refresh: boolean
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

export const NFTDetailsContent = ({
    value,
    setValue,
    nftInfo = {},
    isVisible,
    isOwner,
    disableOverview,
    toBeExecute,
    isSellingInMarketplace,
    refresh,
    setRefresh,
}: NFTDetailsContentProps) => {
    let labels: any[] = []

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

    const [auctionInfo, setAuctionInfo] = React.useState<any>(initialAuction)

    console.log('auctionInfo.winner: ', auctionInfo.winner)
    const disableTab2ForAuction = auctionInfo.winner
        ? auctionInfo.winner.walletAddress !== '0x00'
        : false

    console.log('disableTab2ForAuction: ', disableTab2ForAuction, nftInfo.status)

    if (!disableOverview) {
        labels = [
            { title: 'Overview' },
            {
                title: !isOwner
                    ? 'Execute offer'
                    : isSellingInMarketplace
                    ? 'Cancel offer'
                    : 'Create offer',
                disabled:
                    (!isOwner && nftInfo.status === 'onStock') ||
                    nftInfo.status === 'auction' ||
                    disableTab2ForAuction,
            },
            {
                title: !isOwner
                    ? 'Paticipate Auction'
                    : auctionInfo.winner
                    ? auctionInfo.winner.walletAddress === '0x00'
                        ? 'Create Auction'
                        : 'Confirm Add Auction'
                    : 'Create Auction',
                disabled:
                    nftInfo.status === 'selling' &&
                    (auctionInfo.winner.walletAddress === '0x00' || !auctionInfo.winner),
            },
        ].concat(labels)
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }
    const router = useRouter()
    const tokenIdByRoute = router.query?.id as string

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await auctionApi.getAuction(Number(tokenIdByRoute))
                if (data) {
                    setAuctionInfo(data)
                }
            } catch (error) {
                console.log(' setAuctionInfo(initialAuction)')
                setAuctionInfo(initialAuction)
                console.log(error)
            }
        })()
    }, [nftInfo, refresh, tokenIdByRoute])

    const Label = ({ children }: any) => (
        <Typography
            variant="body1"
            fontFamily="Linik Sans Medium"
            fontWeight={500}
            color="#727282"
            textTransform="capitalize"
        >
            {children}
        </Typography>
    )

    return (
        <Box sx={{ width: '100%' }} id={NFT_DETAILS_FORM_ID}>
            <Box
                sx={{
                    borderBottom: 'solid 1px #E9E9F0',
                    position: 'sticky',
                    top: HEADER_HEIGHT,
                    height: '56px',
                    backgroundColor: 'common.white',
                    zIndex: 10,
                    filter: isVisible ? 'drop-shadow(0px 2px 6px rgba(96, 97, 112, 0.1))' : 'none',
                }}
            >
                <AppContainer container={false}>
                    <Tabs
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        value={value}
                        onChange={handleChange}
                        aria-label="tabs"
                        // @ts-ignore
                        indicatorColor="transparent"
                        sx={{
                            minHeight: '40px',
                            padding: '8px 0',
                            '.MuiTabScrollButton-root': { display: { lg: 'none' } },
                        }}
                    >
                        {labels.map(({ title, disabled }) => (
                            <Tab
                                key={title}
                                disabled={disabled}
                                label={<Label>{title}</Label>}
                                sx={{
                                    padding: '8px 16px !important',
                                    '&:disabled': {
                                        opacity: 0.5,
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: '#F5F4F9',
                                        borderRadius: '4px',
                                        '& > p': { fontWeight: 700, color: 'common.black' },
                                    },
                                    '&.MuiButtonBase-root': {
                                        minHeight: '40px',
                                    },
                                }}
                            />
                        ))}
                    </Tabs>
                </AppContainer>
            </Box>

            <AppContainer container={false}>
                <>
                    <TabPanel value={value} index={0}>
                        <Overview nftInfo={nftInfo} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {!toBeExecute ? (
                            !isSellingInMarketplace ? (
                                <CreateOfferForm
                                    nftInfo={nftInfo}
                                    isOwner={isOwner}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                />
                            ) : (
                                <CancelOfferForm
                                    nftInfo={nftInfo}
                                    isOwner={isOwner}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                />
                            )
                        ) : (
                            <ExecuteForm
                                nftInfo={nftInfo}
                                isOwner={isOwner}
                                refresh={refresh}
                                setRefresh={setRefresh}
                            />
                        )}
                    </TabPanel>
                </>

                <TabPanel value={value} index={!disableOverview ? 2 : 0}>
                    {isOwner ? (
                        auctionInfo.winner ? (
                            auctionInfo.winner.walletAddress === '0x00' ? (
                                <CreateAuctionForm
                                    nftInfo={nftInfo}
                                    isOwner={isOwner}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                />
                            ) : (
                                <ConfirmAuctionForm
                                    nftInfo={nftInfo}
                                    isOwner={isOwner}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                    priceConfirm={
                                        auctionInfo.listAuction.length > 0
                                            ? auctionInfo.listAuction[0].price
                                            : 0
                                    }
                                    auctionInfo={auctionInfo}
                                />
                            )
                        ) : (
                            <CreateAuctionForm
                                nftInfo={nftInfo}
                                isOwner={isOwner}
                                refresh={refresh}
                                setRefresh={setRefresh}
                            />
                        )
                    ) : (
                        <PaticipateAuctionForm
                            nftInfo={nftInfo}
                            isOwner={isOwner}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    )}
                </TabPanel>
            </AppContainer>
        </Box>
    )
}
