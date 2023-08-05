import { WalletConnectContext } from '@/onchains/contexts'
import { useWalletConnect } from '@/onchains/hooks/use-connect-wallet'

type Props = {
    children: React.ReactNode
}

const WalletConnectProvider = ({ children }: Props) => {
    const contexts = useWalletConnect()
    return (
        /**@ts-ignore */
        <WalletConnectContext.Provider value={contexts}>{children}</WalletConnectContext.Provider>
    )
}

export default WalletConnectProvider
