import { Typography } from '@mui/material'

import React from 'react'

interface SubSectionTitleProps {
    children?: React.ReactNode
    [x: string]: any
}
export const SubSectionTitle = ({ children, ...props }: SubSectionTitleProps) => {
    return (
        <Typography variant="subtitle1" component="p" {...props}>
            {children}
        </Typography>
    )
}
