import * as React from 'react'
import Link from 'next/link'

import {
    Box,
    Chip,
    styled,
    CardContent,
    CardMedia,
    Card,
    Typography,
    SvgIcon,
    SvgIconProps,
    useMediaQuery,
    useTheme,
    IconButton,
} from '@mui/material'
import { SectionTitle } from '../Section/SectionTitle'
import { shortenAddress } from '@usedapp/core'
import { IconToken } from '../Wallet'
import { useGetUserByAddressOwner } from '@/services/users'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { userApi } from '@/apis/user'
import { useN2ArenaStore } from '@/store/n2Arena_store'
import { useRouter } from 'next/router'

interface Mark {
    mark: 'remaining' | 'updated' | 'new' | 'alwaysOpen'
    label: string
    textColor?: string
    bgColor: string
    src: string
}

const StyleWrapperChip = styled(Box)(({ theme }) => ({
    margin: '10px 0',
}))

const BasicChip = styled(Chip)(({ theme }) => ({
    fontFamily: 'Linik Sans',
    fontSize: '12px',
    borderRadius: '4px',
    height: '20px',
    marginRight: '4px',
}))

const NewChip = styled(BasicChip)(({ theme }) => ({
    '.MuiChip-label': {
        fontFamily: 'Linik Sans Medium',
        fontSize: '12px',
        fontWeight: 500,
    },
}))

const RemainingChip = styled(BasicChip)(({ theme }) => ({
    backgroundColor: '#EBEBEB',
    '& .MuiChip-label': {
        paddingLeft: 3,
    },
    '& .MuiChip-icon': {
        marginLeft: '7px',
        marginRight: 0,
    },
}))

const UpdateChip = styled(RemainingChip)(({ theme }) => ({
    '& .MuiChip-icon': {
        color: theme.palette.common.black,
    },
}))

const AlwayOpenChip = styled(RemainingChip)(({ theme }) => ({
    '& .MuiChip-icon': {
        marginLeft: '6px',
    },
}))

const StyleOfferInfo = styled(Box)(({ theme }) => ({
    width: '100%',
    position: 'absolute',
    height: '60px',
    left: 0,
    bottom: 0,
    background: '#F5F4F9',
    padding: '12px',
}))

const StyleLineOfferInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: '6px',
}))

const TextOfferInfo = styled(Typography)(({ theme }) => ({
    fontFamily: 'Linik Sans',
    lineHeight: '20px',
    fontSize: '14px',
    fontWeight: 400,
    color: '#5A5A6F',
}))

function RemainingIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <svg
                width="20"
                height="24"
                viewBox="0 0 14 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.75676 0.0335052C9.03398 0.107125 9.26624 0.296241 9.39452 0.55279C9.87808 1.51991 10.239 2.10688 10.6021 2.5828C10.9696 3.06452 11.3584 3.45889 11.9497 4.05027C13.3164 5.41691 14 7.21011 14 9.00002C14 10.7899 13.3164 12.5831 11.9497 13.9498C9.21608 16.6834 4.78392 16.6834 2.05025 13.9498C0.683615 12.5831 2.35307e-06 10.7899 0 9.00002C-2.95743e-06 7.21011 0.683611 5.41691 2.05025 4.05027C2.33625 3.76427 2.76637 3.67872 3.14004 3.8335C3.51372 3.98828 3.75736 4.35292 3.75736 4.75738C3.75736 5.87719 3.82729 6.73045 4.15481 7.41102C4.33491 7.78526 4.61585 8.15114 5.10004 8.47763C5.21568 7.41686 5.42752 6.12447 5.71375 4.89777C5.93911 3.93195 6.21939 2.96773 6.553 2.16366C6.71986 1.76148 6.90855 1.37854 7.12285 1.0479C7.33145 0.726075 7.59945 0.398579 7.94539 0.167954C8.18405 0.00884949 8.47954 -0.0401149 8.75676 0.0335052ZM9.12132 13.1213C7.94975 14.2929 6.05025 14.2929 4.87868 13.1213C4.29289 12.5355 4 11.7678 4 11C4 11 4.87868 11.5 6.50005 11.5C6.50005 10.5 7.00005 7.49999 7.75005 6.99999C8.25005 7.99999 8.53553 8.29289 9.12132 8.87867C9.70711 9.46446 10 10.2322 10 11C10 11.7678 9.70711 12.5355 9.12132 13.1213Z"
                    fill="#E72A14"
                />
            </svg>
        </SvgIcon>
    )
}

const StyleCardItem = styled(Card)(({ theme }) => ({
    background: '#FFFFFF',
    border: '1px solid #E9E9F0',
    boxShadow: '0px 4px 8px rgba(231, 229, 229, 0.5)',
    borderRadius: '8px',
    margin: '0 12px',
    cursor: 'pointer',
}))

const StyleCardOffering = styled(Card)(({ theme }) => ({
    background: theme.palette.common.white,
    border: '1px solid #E9E9F0',
    boxShadow: '0px 4px 8px rgba(231, 229, 229, 0.5)',
    borderRradius: '8px',
    margin: '0 12px',
    cursor: 'pointer',
    '&:hover': {
        border: '1px solid #BEC1FC',
        boxShadow: '0px 4px 12px rgba(231, 229, 229, 0.8)',
    },
}))

interface NFTItemCardProps {
    marks?: Array<Mark>
    orders: any
}

export default function NFTItemCard({ marks = [], orders }: NFTItemCardProps) {
    const theme = useTheme()
    const upMd = useMediaQuery(theme.breakpoints.up('md'))
    const downSm = useMediaQuery(theme.breakpoints.down('sm'))
    const { me } = useN2ArenaStore()

    const router = useRouter()

    const { name, seller, tokenId, uri, tagNFT } = orders

    const { userInfo } = useGetUserByAddressOwner(seller ? seller.walletAddress : '0x00')

    const [isSelectedFavorite, setIsSelectedFavorite] = React.useState(false)
    // console.log('test: ', seller.walletAddress, seller)

    const nftItems = [
        {
            name: 'Author:',
            info: `${userInfo.firstName} ${userInfo.lastName}`,
        },
        {
            name: 'Seller:',
            info: seller
                ? seller.walletAddress !== '0x00'
                    ? `${shortenAddress(seller.walletAddress)}`
                    : '0x00'
                : '0x00',
        },
    ]

    const handleFavorite = async () => {
        try {
            if (me._id === '') {
                router.push('/login')
                return
            }
            setIsSelectedFavorite(!isSelectedFavorite)
            if (!isSelectedFavorite) {
                await userApi.likeNFT(tokenId)
            } else {
                await userApi.dislikeNFT(tokenId)
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        ;(async () => {
            try {
                const data = await userApi.getFavoriteNFT()
                if (data) {
                    //@ts-ignore
                    const existsLike = data.data.some((item: any) => item.tokenId === tokenId)
                    if (existsLike) {
                        setIsSelectedFavorite(true)
                    }
                } else {
                    setIsSelectedFavorite(false)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [tokenId])

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    left: '5%',
                    top: '11%',
                }}
            >
                <IconButton
                    onClick={handleFavorite}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        color: '#fff !important',
                        '&:hover': {},
                        zIndex: 100,
                    }}
                    aria-label="favorite name"
                    component="label"
                >
                    {isSelectedFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
            </Box>

            <Link href={`/marketplace/collection/${tokenId}`}>
                {/* <StyleCardItem
                    sx={{ width: 230, height: 400, position: 'relative', marginBottom: '24px' }}
                > */}
                <StyleCardOffering
                    sx={{ width: 230, height: 400, position: 'relative', marginBottom: '-24px' }}
                >
                    <CardMedia sx={{ maxWidth: '100%', height: 240 }} image={uri} />

                    <CardContent sx={{ padding: '0 12px' }}>
                        <StyleWrapperChip>
                            <NewChip label="New" color="primary" size="small" />
                        </StyleWrapperChip>

                        <Typography
                            variant="h2"
                            component="div"
                            sx={{
                                color: '#A8ABB6',
                                fontFamily: 'Nexa Heavy',
                                fontSize: !downSm ? '12px' : '10px',
                                fontWeight: '900',
                                width: '100%',
                                marginBottom: '8px',
                                textTransform: 'uppercase',
                            }}
                        >
                            {tagNFT}
                        </Typography>

                        <Box sx={{ display: 'flex' }}>
                            <SectionTitle
                                sx={{
                                    color: '#232233',
                                    fontFamily: 'Linik Sans Bold',
                                    fontWeight: '700',
                                    fontSize: upMd ? '18px' : !downSm ? '16px' : '14px',
                                    width: '100%',

                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '2',
                                    WebkitBoxOrient: 'vertical',
                                    marginBottom: '12px',
                                }}
                            >
                                {name}
                            </SectionTitle>

                            <IconToken
                                src={'/logo/logo-n2-black.png'}
                                alt="token"
                                priority
                                width={24}
                                height={20}
                                sx={{ marginBottom: '-5px', marginLeft: '5px' }}
                            />
                        </Box>
                    </CardContent>

                    <StyleOfferInfo>
                        {nftItems.map((item, index) => (
                            <StyleLineOfferInfo key={index}>
                                <TextOfferInfo variant="body2">{item.name}</TextOfferInfo>
                                <TextOfferInfo
                                    variant="body2"
                                    sx={{
                                        fontFamily: 'Linik Sans Bold',
                                        fontWeight: 'bold',
                                        color: '#262626',
                                    }}
                                >
                                    {item.info}
                                </TextOfferInfo>
                            </StyleLineOfferInfo>
                        ))}
                    </StyleOfferInfo>
                </StyleCardOffering>
                {/* </StyleCardItem> */}
            </Link>
        </>
    )
}
