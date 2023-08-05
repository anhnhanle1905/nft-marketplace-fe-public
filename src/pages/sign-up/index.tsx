import Loading from '@/components/layout/Loading'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const SignUpContainer = dynamic(() => import('@/containers/sso/sign-up'), {
    ssr: false,
})

export default function SignUp() {
    return (
        <Suspense fallback={<Loading />}>
            <SignUpContainer />
        </Suspense>
    )
}
