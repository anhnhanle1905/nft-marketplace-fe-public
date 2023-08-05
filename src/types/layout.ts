// ** Type Imports
import { SxProps, Theme } from '@mui/material'
import { ReactNode } from 'react'

export type ContentWidth = 'full' | 'boxed'

export type AppBar = 'fixed' | 'static' | 'hidden'

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

export type BlankLayoutProps = {
    children: ReactNode
}

export type BlankLayoutWithAppBarProps = {
    children: ReactNode
}

export type NavSectionTitle = {
    action?: string
    subject?: string
    sectionTitle: string
}

export type NavGroup = {
    icon?: string
    title: string
    action?: string
    subject?: string
    badgeContent?: string
    children?: (NavGroup | NavLink)[]
    badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

export type NavLink = {
    icon?: string
    path?: string
    title: string
    action?: string
    subject?: string
    disabled?: boolean
    badgeContent?: string
    externalLink?: boolean
    openInNewTab?: boolean
    badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

export type VerticalNavItemsType = (NavLink | NavGroup | NavSectionTitle)[]
export type HorizontalNavItemsType = (NavLink | NavGroup)[]

export type FooterProps = {
    sx?: SxProps<Theme>
    content?: (props?: any) => ReactNode
}
export enum HeaderTheme {
    Black = 'Black',
    White = 'White',
}

// export type VerticalLayoutProps = {
//     appBar?: {
//         componentProps?: AppBarProps
//         content?: (props?: any) => ReactNode
//     }
//     navMenu: {
//         lockedIcon?: ReactNode
//         unlockedIcon?: ReactNode
//         navItems?: VerticalNavItemsType
//         content?: (props?: any) => ReactNode
//         branding?: (props?: any) => ReactNode
//         afterContent?: (props?: any) => ReactNode
//         beforeContent?: (props?: any) => ReactNode
//         componentProps?: Omit<SwipeableDrawerProps, 'open' | 'onOpen' | 'onClose'>
//     }
// }

// export type HorizontalLayoutProps = {
//     appBar?: {
//         componentProps?: AppBarProps
//         content?: (props?: any) => ReactNode
//         branding?: (props?: any) => ReactNode
//     }
//     navMenu?: {
//         sx?: SxProps<Theme>
//         navItems?: HorizontalNavItemsType
//         content?: (props?: any) => ReactNode
//     }
// }

// export type LayoutProps = {
//     hidden: boolean
//     children: ReactNode
//     footerProps?: FooterProps
//     contentHeightFixed?: boolean
//     scrollToTop?: (props?: any) => ReactNode
//     verticalLayoutProps: VerticalLayoutProps
//     horizontalLayoutProps?: HorizontalLayoutProps
// }
