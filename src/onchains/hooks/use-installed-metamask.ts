import React from 'react'

export const useInstalledMetamask = () => {
    const [isMetamaskInstalled, setIsMetamaskInstalled] = React.useState<boolean>()

    React.useEffect(() => {
        if (typeof (window as any).ethereum !== 'undefined') {
            //check if Metamask wallet is installed
            setIsMetamaskInstalled(true)
        }
    }, [])

    return {
        isMetamaskInstalled,
        setIsMetamaskInstalled,
    }
}
