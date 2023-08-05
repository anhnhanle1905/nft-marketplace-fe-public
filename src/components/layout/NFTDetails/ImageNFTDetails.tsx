import { Box, CardMedia } from '@mui/material'

interface ImageNFTDetailsProps {
    uri: any
}

export const ImageNFTDetails = ({ uri }: ImageNFTDetailsProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    backgroundImage: `url(${uri})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    borderTopLeftRadius: '4px',
                    position: 'relative',
                    '&:before': {
                        content: "''",
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderTopLeftRadius: '4px',
                        top: 0,
                        left: 0,
                        backgroundColor: '#232233',
                        opacity: 0.75,
                    },
                }}
            />

            <CardMedia
                sx={{
                    flex: 3,
                    maxWidth: '100%',
                    height: 300,
                }}
                image={uri}
            />
            <Box
                sx={{
                    flex: 1,
                    backgroundImage: `url(${uri})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    borderTopRightRadius: '4px',
                    position: 'relative',
                    '&:before': {
                        content: "''",
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderTopRightRadius: '4px',
                        top: 0,
                        left: 0,
                        backgroundColor: '#232233',
                        opacity: 0.75,
                    },
                }}
            />
        </Box>
    )
}
