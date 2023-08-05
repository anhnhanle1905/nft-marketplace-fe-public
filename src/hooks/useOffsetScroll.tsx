import { RefObject, useEffect, useState } from 'react'

interface Args extends IntersectionObserverInit {
    freezeOnceVisible?: boolean
}

export function useOffsetScroll(offset = 200, shoudRun = true) {
    const [isTrue, setIsTrue] = useState(false)

    useEffect(() => {
        function onScroll() {
            let currentPosition = window.pageYOffset
            if (currentPosition > offset) {
                setIsTrue(true)
            } else {
                setIsTrue(false)
            }
        }
        if (shoudRun) window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset])

    return isTrue
}
