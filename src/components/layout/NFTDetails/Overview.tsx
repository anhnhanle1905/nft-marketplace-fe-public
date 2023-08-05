import DOMPurify from 'dompurify'
// next
// MUI
import { Box, Grid, Typography, styled } from '@mui/material'
// components

interface OverviewProps {
    nftInfo: any
}

const TextDescription = styled(Box)(() => ({
    maxWidth: '616px',
    p: { marginBottom: '20px', marginTop: 0, color: '#242059', lineHeight: '24px' },
    ul: { marginTop: '-10px', paddingLeft: '25px', marginBottom: '-10px' },
    li: { color: '#242059', lineHeight: '24px' },

    h5: {
        marginBottom: '16px',
        fontWeight: 700,
        fontFamily: 'Linik Sans Bold',
        fontSize: '18px',
    },
    'h5:first-of-type': {
        marginTop: '0px',
    },
}))

export const Overview = ({ nftInfo }: OverviewProps) => {
    const description = nftInfo.overview ? nftInfo.overview : ''
    return (
        <>
            <Grid
                container
                sx={{
                    '& .MuiGrid-root:nth-of-type(2)': {
                        marginTop: 0,
                        li: {
                            marginTop: '30px',
                        },
                        'li:first-of-type': {
                            marginTop: '-10px',
                        },
                    },
                }}
            >
                <Grid item xs={12}>
                    <Typography variant="h4" fontWeight={900} mb="40px" fontFamily="Nexa">
                        Overview
                    </Typography>
                </Grid>

                <Grid item xs={12} md={7}>
                    <TextDescription
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(description),
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    {/* {previewImage && <CarouselOffering offering={offering} />} */}
                </Grid>
            </Grid>
        </>
    )
}
