import { CopyIcon } from '@/assets/icons'
import { NextImage, CopyAddress } from '@/components'
import { REQUEST_APPROVE_STATUS } from '@/types'
import { formatAddress } from '@/utils'
import { Box, Typography, styled } from '@mui/material'

interface WalletBoxProps {
    children: React.ReactNode | JSX.Element | string | any
    status?: string
}

const WalletAddress = styled(Typography)(({ theme }) => ({
    color: 'rgba(35, 34, 51, 1)',
    lineHeight: '24px',
}))

export const WalletBox = ({ children, status, ...props }: WalletBoxProps) => {
    const renderStatusWallet = (status: string) => {
        switch (status) {
            // case REQUEST_APPROVE_STATUS.IS_NEW:
            //     return (
            //         <Typography
            //             sx={{
            //                 backgroundColor: 'rgba(236, 237, 239, 1)',
            //                 color: 'rgba(36, 32, 89, 1)',
            //                 padding: '2px 12px',
            //                 borderRadius: '50px',
            //                 marginRight: 4,
            //                 fontSize: 14,
            //                 lineHeight: '20px',
            //             }}
            //         >
            //             New
            //         </Typography>
            //     )

            case REQUEST_APPROVE_STATUS.IMPORTED:
                return (
                    <Typography
                        sx={{
                            backgroundColor: 'rgba(219, 245, 245, 1)',
                            color: 'rgba(1, 165, 165, 1)',
                            padding: '2px 12px',
                            borderRadius: '50px',
                            marginRight: 4,
                            fontSize: 14,
                            lineHeight: '20px',
                        }}
                    >
                        Imported
                    </Typography>
                )

            default:
                return null
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid rgba(233, 233, 240, 1)',
                padding: '12px 16px',
                borderRadius: '4px',
                ...props,
            }}
        >
            <WalletAddress>{formatAddress(children)}</WalletAddress>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {status && renderStatusWallet(status)}
                <CopyAddress text={children}>
                    <span
                        title={children}
                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    >
                        <NextImage
                            src={CopyIcon}
                            width={18}
                            height={18}
                            alt={'copy-icon'}
                            style={{ marginRight: 14 }}
                        />
                        <Typography
                            color="primary"
                            sx={{ fontWeight: 500, fontSize: 16, lineHeight: '24px' }}
                        >
                            Copy
                        </Typography>
                    </span>
                </CopyAddress>
            </Box>
        </Box>
    )
}
