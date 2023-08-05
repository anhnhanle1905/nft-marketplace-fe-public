import Loading from '@/components/layout/Loading'
import { FullLayout } from '@/layouts'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ProfileContainer = dynamic(() => import('@/containers/dashboard/profile'), {
    ssr: false,
})

export default function ProfilePage() {
    return (
        <Suspense fallback={<Loading />}>
            <FullLayout>
                <ProfileContainer />
            </FullLayout>
        </Suspense>
    )
}
