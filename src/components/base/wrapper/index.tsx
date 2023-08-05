import { Box } from '@mui/material'

import { styled } from '@mui/material/styles'

interface WrapperProps {
    background?: string
    height?: string
    children: React.ReactNode
    [x: string]: any
}
const StyledWrapper = styled(Box)(({ theme }) => ({
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}))

export const Wrapper = ({ background, height, children, sx, ...props }: WrapperProps) => {
    return (
        <StyledWrapper
            sx={{
                backgroundImage: `url(${background})`,
                height: `${height ? height : '100vh'}`,
                ...sx,
            }}
            {...props}
        >
            {children}
        </StyledWrapper>
    )
}
