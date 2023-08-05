import { NextImage } from '@/components/base/next-image'
import { SubmitButton } from '@/components/base/submit-button'
import { useWalletConnect } from '@/onchains/hooks/use-connect-wallet'
import { CloseIcon } from '@/assets/icons'
import { Box, IconButton, Modal, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
interface ConnectWalletProps {
    open: boolean
    handleOpen: (open?: boolean) => void
}
const ConnectWalletTitle = styled(Typography)(({ theme }) => ({
    fontFamily: 'Linik Sans Bold',
    fontSize: 24,
    lineHeight: '32px',
    color: 'rgba(35, 34, 51, 1)',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 58,
}))

const ConnectWalletSubTitle = styled(Typography)(({ theme }) => ({
    fontFamily: 'Linik Sans',
    fontSize: 16,
    lineHeight: '24px',
    color: 'rgba(114, 114, 130, 1)',
    textAlign: 'center',
    marginBottom: 40,
}))

const NameWallet = styled(Typography)(({ theme }) => ({
    fontSize: 16,
    lineHeight: '24px',
}))

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90vw', md: 496 },
    height: 266,
    alignItems: 'center',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
}

export const ConnectWallet = ({ open, handleOpen }: ConnectWalletProps) => {
    const { activateBrowserWallet } = useWalletConnect()

    const handleClose = () => handleOpen(!open)

    const handleConnectWallet = () => {
        activateBrowserWallet()
        handleClose()
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        color: '#A8ABB6',
                        '&:hover': {},
                    }}
                >
                    <NextImage src={CloseIcon} width={16} height={16} alt="close-icon" />
                </IconButton>
                <ConnectWalletTitle>Connect your wallet</ConnectWalletTitle>
                <ConnectWalletSubTitle>
                    {`If you don't have a wallet yet, you can create one now.`}
                </ConnectWalletSubTitle>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: '1px solid #E9E9F0',
                        padding: '6px',
                        borderRadius: '4px',
                        width: { xs: '85vw', md: 364 },
                        height: 56,
                        margin: '0 auto',
                    }}
                >
                    <Box sx={{ display: 'flex', paddingLeft: '10px' }}>
                        <NextImage
                            src="/images/icon-metamask.svg"
                            alt="wallet"
                            priority
                            width={24}
                            height={24}
                        />
                        <NameWallet
                            sx={{ fontFamily: 'Nexa Heavy', paddingLeft: '6px', mr: '20px' }}
                        >
                            Metamask
                        </NameWallet>
                    </Box>

                    <SubmitButton
                        sx={{
                            fontFamily: 'Linik Sans Semi Bold',
                            fontSize: '14px',
                            textAlight: 'center',
                            padding: '12px 16px',
                            lineHeight: '20px',
                        }}
                        onClick={handleConnectWallet}
                    >
                        Connect wallet
                    </SubmitButton>
                </Box>
            </Box>
        </Modal>
    )
}
