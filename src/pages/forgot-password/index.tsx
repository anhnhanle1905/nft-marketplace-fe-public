import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ForgotPasswordContainer = dynamic(() => import('@/containers/sso/forgot-password'), {
    ssr: false,
})

export default function ForgotPassword() {
    return (
        <Suspense>
            <ForgotPasswordContainer />
        </Suspense>
    )
}
