import { EmotionCache } from '@emotion/react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

export interface LayoutProps {
    children: ReactNode
}

export type NextPageWithLayout = NextPage & {
    Layout?: (props: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
    emotionCache?: EmotionCache
}

export interface Response<T> {
    data: T
    message: string
    statusCode: number
}

export interface PaginationParams {
    _limit: number
    _page: number
    _totalRows: number
}

export interface ListResponse<T> {
    paginate: any
    data: T[]
    pagination: PaginationParams
}

export interface ListParams {
    _page?: number
    _limit?: number
    _sort?: string
    _order?: 'asc' | 'desc'

    [key: string]: any
}
