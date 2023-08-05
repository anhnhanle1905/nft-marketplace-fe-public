import { headerLogoBlack } from '@/assets/logo'
import { NextImage } from '@/components/base/next-image'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const HeaderLogoWrapper = styled(Box)({
    position: 'absolute',
    overflow: 'hidden',
    top: 24,
    left: 40,
})

export const HeaderLogo = () => {
    return (
        <HeaderLogoWrapper>
            <NextImage
                src={headerLogoBlack}
                width={419 * 0.4}
                height={89 * 0.4}
                alt="N2Arena"
                priority
            />
        </HeaderLogoWrapper>
    )
}
