import Loading from '@/components/layout/Loading'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
const LoginContainer = dynamic(() => import('@/containers/sso/login'), { ssr: false })

export default function Login() {
    return (
        <Suspense fallback={<Loading />}>
            <LoginContainer />
        </Suspense>
    )
}
