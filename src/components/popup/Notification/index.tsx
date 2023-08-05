import { NextImage } from '@/components/base/next-image'
import { SubmitButton } from '@/components/base/submit-button'
// import CloseIcon from '@mui/icons-material/Close'
import { CloseIcon, SuccessIcon } from '@/assets/icons'
import { Box, IconButton, Modal, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const ConnectWalletTitle = styled(Typography)(({ theme }) => ({
    fontFamily: 'Linik Sans Bold',
    fontSize: 24,
    lineHeight: '32px',
    color: theme.palette.text.primary,
    textAlign: 'center',
    marginBottom: 16,
    // marginTop: 22,
}))

const ConnectWalletSubTitle = styled(Typography)(({ theme }) => ({
    fontFamily: 'Linik Sans',
    fontSize: 16,
    lineHeight: '24px',
    color: theme.palette.text.primary,
    textAlign: 'center',
    marginBottom: 32,
}))

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    alignItems: 'center',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: '62px 24px 24px',
    width: { xs: '90%', sm: '360px' },
    maxWidth: '360px',
}

interface ConnectWalletProps {
    open: boolean
    onClose: () => void
    onOk?: () => void
    title?: string
    desc?: string
    hasIcon?: boolean
}

export const Notification = ({ open, title, desc, hasIcon, onClose, onOk }: ConnectWalletProps) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 24,
                        top: 16,
                        color: '#A8ABB6',
                        width: '24px',
                        height: '24px',
                        backgroundColor: 'transparent !important',
                    }}
                >
                    <NextImage src={CloseIcon} width={16} height={16} alt="close-icon" />
                </IconButton>

                {hasIcon && (
                    <Box sx={{ textAlign: 'center', lineHeight: 0, mb: '22px' }}>
                        <NextImage src={SuccessIcon} width={52} height={52} alt={''} />
                    </Box>
                )}
                {title && <ConnectWalletTitle>{title}</ConnectWalletTitle>}
                {desc && <ConnectWalletSubTitle>{desc}</ConnectWalletSubTitle>}
                <SubmitButton
                    sx={{
                        fontFamily: 'Linik Sans Bold',
                        fontSize: '14px',
                        textAlight: 'center',
                        padding: '12px 16px',
                        lineHeight: '24px',
                        width: '100%',
                    }}
                    onClick={() => {
                        onClose()
                        if (onOk) onOk()
                    }}
                >
                    OK
                </SubmitButton>
            </Box>
        </Modal>
    )
}
