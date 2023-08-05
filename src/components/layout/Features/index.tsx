import Image from 'next/image'
import { Box, Grid, Typography, SxProps } from '@mui/material'
import { AppContainer } from '../AppContainer'

export const Features = ({
    sx,
    padding,
    features = [],
}: {
    sx?: SxProps
    padding?: any
    features: any[]
}) => {
    return (
        <AppContainer
            sx={{
                padding: padding || {
                    xs: '40px 0',
                    md: '64px 0 87px',
                },
            }}
            rowSpacing={{ xs: '24px', lg: '0' }}
        >
            {features.map(({ title, desc, icon }) => (
                <Grid item xs={12} sm={6} lg={4} key={icon}>
                    <Box
                        sx={{
                            maxWidth: '360px',
                            margin: { xs: 'auto', sm: '0 12px' },
                            textAlign: 'center',
                            padding: { xs: '40px 10px', md: '40px 27px' },
                            border: '1px solid #E9E9F0',
                            borderRadius: '32px',
                            ...sx,
                        }}
                    >
                        <Image
                            src={icon}
                            alt="promt"
                            priority
                            width={94}
                            height={94}
                            style={{ display: 'block', margin: 'auto' }}
                        />
                        <Typography
                            variant="subtitle2"
                            fontFamily="Linik Sans Bold"
                            lineHeight="32px"
                            fontWeight={700}
                            mt="32px"
                            mb="16px"
                        >
                            {title}
                        </Typography>
                        <Typography variant="body1" lineHeight="24px">
                            {desc}
                        </Typography>
                    </Box>
                </Grid>
            ))}
        </AppContainer>
    )
}
