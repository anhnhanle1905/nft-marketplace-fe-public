import { Box, CardMedia, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
// import { formatDate } from '@/utils/common'

interface PortfolioItemProps {
    catalyst: string
    tokenId: number
    name: string

    paymentToken: string
    uri: string
    chain: string
}

const ContentWrapper = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const Item = styled(Box)(() => ({
    display: 'flex',
    borderRadius: '8px',
    border: '1px solid #E9E9F0',
    '& img': {
        objectFit: 'cover',
        borderRadius: '8px',
        marginRight: '12px',
    },
    marginBottom: '20px',
}))

export const PortfolioItem = ({
    catalyst,
    tokenId,
    name,
    paymentToken,
    uri,
    chain,
}: PortfolioItemProps) => {
    return (
        <Link href={'/marketplace/collection/' + tokenId}>
            <Item padding="10px">
                <Box width="554px" display="flex" alignItems="center">
                    <ContentWrapper>
                        <CardMedia
                            sx={{ width: '75px', height: '75px', borderRadius: '4px' }}
                            image={uri}
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
                                marginLeft: '12px',
                            }}
                        >
                            {name}
                        </Typography>
                    </ContentWrapper>
                </Box>

                <ContentWrapper width="180px">
                    <Typography variant="h5" textAlign="center" width="100px">
                        {tokenId}
                    </Typography>
                </ContentWrapper>
                <ContentWrapper width="200px">
                    <Typography
                        variant="h5"
                        textAlign="end"
                        sx={{ textTransform: 'capitalize' }}
                        width="75px"
                    >
                        {catalyst ? catalyst : '-'}
                    </Typography>
                </ContentWrapper>
                <ContentWrapper width="180px">
                    <Typography variant="h5" textAlign="end">
                        {chain}
                    </Typography>
                </ContentWrapper>
            </Item>
        </Link>
    )
}
