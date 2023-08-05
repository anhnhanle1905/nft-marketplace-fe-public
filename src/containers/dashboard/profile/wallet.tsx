import React, { useEffect } from 'react'
import { Box, Stack, Typography, styled } from '@mui/material'

import { signMessage } from '@/onchains/helpers'
import { useWalletConnect } from '@/onchains/hooks/use-connect-wallet'

import { SubmitButton } from '@/components'
import { N2Divider } from '@/components/base/divider'
import { useN2ArenaStore } from '@/store/n2Arena_store'
import { WalletBox } from '@/components/base/wallet-box'
import { SecondaryButton } from '@/components/base/secondary-button'
import { useImportWallet } from '@/services/users'
import { User } from '@/types'
import { initialCurrentUser } from '@/pages/mint'
import { userApi } from '@/apis/user'
import { useQueryUser } from '@/services/auth'

interface WalletTabProps {
    openConnectWallet: boolean
}

const SubTitle = styled(Typography)(({ theme }) => ({
    fontFamily: 'Linik Sans',
    fontSize: 16,
    lineHeight: '24px',
    color: 'rgba(114, 114, 130, 1)',
    textAlign: 'center',
}))

const LabelWalletSection = styled(Typography)(({ theme }) => ({
    fontFamily: 'Linik Sans Bold',
    lineHeight: '24px',
    marginBottom: '6px',
    fontSize: 16,
    color: 'rgba(35, 34, 51, 1)',
}))

export const WalletTab = ({ openConnectWallet }: WalletTabProps) => {
    const { me } = useN2ArenaStore()
    const { refetch } = useQueryUser()
    const [currentUser, setCurrentUser] = React.useState<User>(initialCurrentUser)
    const [refresh, setRefresh] = React.useState<boolean>(false)

    console.log('me:', me.walletList)
    const { account, activateBrowserWallet, deactivate } = useWalletConnect()

    const hasWallets = true

    const [signatures, setSignatures] = React.useState<
        { message: string; signature: string; address: string }[]
    >([])

    const { mutateAsync: importWallet, isLoading } = useImportWallet()
    // @ts-ignore
    const wallets =
        currentUser.walletList.length > 0
            ? currentUser.walletList.map((item: any) => item.walletAddress)
            : []

    const exists = React.useMemo(() => wallets.includes(account?.toLowerCase()), [account, wallets])

    const handleSign = async () => {
        try {
            const sig = await signMessage({
                message: currentUser.email,
            })
            if (sig) {
                setSignatures([...signatures, sig])
                await importWallet({
                    userId: currentUser._id,
                    walletAddress: account!,
                    signature: sig?.signature,
                })
                refetch()
                setRefresh(!refresh)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await userApi.getUser()
                if (data) {
                    setCurrentUser(data)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [refresh, me, currentUser])

    const renderStatePage = () => {
        if (openConnectWallet) {
            return null
        }
        if (!account) {
            return (
                <Box sx={{ textAlign: 'center', mb: '110px', marginTop: hasWallets ? 5 : 0 }}>
                    <SubTitle sx={{ marginBottom: 2 }}>Please connect your wallet</SubTitle>
                    <SubmitButton
                        sx={{
                            fontFamily: 'Linik Sans Bold',
                            fontSize: '16px',
                            textAlight: 'center',
                            padding: '12px 16px',
                            lineHeight: '24px',
                        }}
                        onClick={activateBrowserWallet}
                    >
                        Connect Wallet
                    </SubmitButton>
                </Box>
            )
        } else {
            return (
                <Stack
                    direction="column"
                    gap={1}
                    sx={{
                        marginBottom: '122px',
                        marginTop: hasWallets ? 5 : 0,
                        maxWidth: '90vw',
                        overflowX: 'auto',
                    }}
                >
                    <Box sx={{ minWidth: '450px' }}>
                        <LabelWalletSection>Your connected wallet</LabelWalletSection>

                        <WalletBox>{account}</WalletBox>

                        <Stack direction="row" spacing={2} mt="16px">
                            <SecondaryButton sx={{ fontWeight: 600 }} onClick={deactivate}>
                                Disconnect
                            </SecondaryButton>

                            {!exists && currentUser?.isVerified && (
                                <SubmitButton onClick={handleSign} loading={isLoading}>
                                    Import Wallet
                                </SubmitButton>
                            )}
                        </Stack>
                    </Box>
                </Stack>
            )
        }
    }

    const renderWallets = (title: string, list: any[]) => {
        {
            return (
                list &&
                list?.length > 0 && (
                    <Box sx={{ marginBottom: 5 }}>
                        <LabelWalletSection>{title}</LabelWalletSection>
                        <Stack direction="column" spacing={2}>
                            {list?.map((wallet: any) => (
                                <WalletBox key={wallet?._id} status={'IMPORTED'}>
                                    {wallet?.walletAddress}
                                </WalletBox>
                            ))}
                        </Stack>
                    </Box>
                )
            )
        }
    }

    return (
        <Box>
            <Box sx={{ maxWidth: '90vw', overflowX: 'auto' }}>
                <Box sx={{ minWidth: '450px' }}>
                    {renderWallets('Imported wallets', currentUser.walletList)}
                </Box>
            </Box>
            {hasWallets && <N2Divider />}
            {renderStatePage()}
        </Box>
    )
}
