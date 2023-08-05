import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Loading = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    React.useEffect(() => {
        const handleStart = () => setLoading(true)
        const handleComplete = () => setLoading(false)

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    }, [router])

    return loading ? <div>Loading...</div> : null
}

export default Loading
