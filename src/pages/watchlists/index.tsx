import { FullLayout } from '@/layouts'
import dynamic from 'next/dynamic'

const WatchlistsContainer = dynamic(() => import('@/containers/dashboard/watchlists'), {
    ssr: false,
})

export default function WatchlistsPage() {
    return (
        <FullLayout transparentHeader>
            <WatchlistsContainer />
        </FullLayout>
    )
}
