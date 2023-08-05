import { Typography } from '@mui/material'
import { styled } from '@mui/system'

export const SsoFormCaption = styled(Typography)(({ theme }) => ({
    lineHeight: '20px',
    fontSize: 14,
    marginBottom: 40,
    color: theme.palette.text['main'],
}))
