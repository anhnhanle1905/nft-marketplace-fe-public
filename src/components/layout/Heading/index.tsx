import { Box, Typography } from '@mui/material'
import { AppContainer } from '@/components/layout/AppContainer'

export const Heading = () => {
    const headings = [
        { title: 'NFT', width: '566px' },
        { title: 'Token ID', width: '180px' },
        { title: 'Catalyst', width: '200px' },
        { title: 'Chain', width: '180px' },
    ]

    return (
        <Box
            display="flex"
            justifyContent="space-around"
            padding={{ xs: '20px 0 10px', lg: '27px 0 8px' }}
            borderBottom="solid 1px #E9E9F0"
            position={{ xs: 'static', md: 'sticky' }}
            top="80px"
            bgcolor="common.white"
        >
            <AppContainer>
                <Box sx={{ minWidth: '1128px', display: 'flex' }}>
                    {headings.map(({ title, width }) => (
                        <div key={title} style={{ width }}>
                            <Typography
                                variant="h6"
                                textAlign="left"
                                textTransform="uppercase"
                                color="#5A5A6F"
                                fontFamily="Linik Sans Bold"
                                fontWeight={700}
                                lineHeight="16px"
                            >
                                {title}
                            </Typography>
                        </div>
                    ))}
                </Box>
            </AppContainer>
        </Box>
    )
}
