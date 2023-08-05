import { Typography } from '@mui/material'
import React from 'react'

interface SectionTitleProps {
    children?: React.ReactNode
    [x: string]: any
}
export const SectionTitle = ({ children, ...props }: SectionTitleProps) => {
    return (
        <Typography variant={'h1'} component="h1" {...props}>
            {children}
        </Typography>
    )
}
