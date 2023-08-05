import { FullLayout } from '@/layouts'
import dynamic from 'next/dynamic'

const PortfolioContainer = dynamic(() => import('@/containers/dashboard/portfolio'), {
    ssr: false,
})

export default function PortfolioPage() {
    return (
        <FullLayout transparentHeader>
            <PortfolioContainer />
        </FullLayout>
    )
}
