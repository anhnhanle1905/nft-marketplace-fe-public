import Image from 'next/image'

export const EmptyActivity = () => {
    return (
        <Image
            src="/images/no_data.jpg"
            alt="no_data"
            priority
            width={200}
            height={200}
            // style={{ borderRadius: '50%', objectFit: 'contain' }}
        />
    )
}
