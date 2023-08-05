import { Divider, styled } from '@mui/material'

const StyledDivider = styled(Divider)(({ theme }) => ({
    backgroundColor: 'rgba(233, 233, 240, 1)',
    borderColor: 'rgba(233, 233, 240, 1)',
}))

export const N2Divider = ({ ...props }) => {
    return <StyledDivider {...props} />
}
