import { NextImage } from '@/components'

// import { NextImage } from '@/components'
export const Loader = () => (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <NextImage
            src="/logo/logo-n2-black.png"
            alt="N2Arena"
            priority
            width={112 * 0.5}
            height={89 * 0.5}
            style={{ animation: 'rotationZ 1s infinite linear' }}
        />
    </main>
)
