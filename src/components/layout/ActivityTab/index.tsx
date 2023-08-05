import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import { EmptyActivity } from '../EmptyActivity'

import { nftInfoProps, userInfoProps } from '../ProfileTabs'
import { userApi } from '@/apis/user'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { ReactVirtualizedTable } from '../TableTransaction'
import Skeleton from 'react-loading-skeleton'
interface activityInfoProps {
    nft: nftInfoProps
    interactiveUser: userInfoProps
    type: string
    created_at: string
}

interface IActivityTabProps {
    index: Number
    account: string | null
}

enum FilterType {
    transfer = 'transfer',
    addOrder = 'addOrder',
    approve = 'approve',
    cancelOrder = 'cancelOrder',
    executeOrder = 'executeOrder',
    mintPublic = 'mintPublic',
}

export interface IFilter {
    blockNumber: Number
    data: string
    from: string
    method: string
    timestamp: Number
    to: string
    value: string
    hash: string
}

export const ActivityTab = ({ index, account }: IActivityTabProps) => {
    const [filters, setFilters] = useState<Array<FilterType>>([])
    const [resFilters, setResFilters] = useState<Array<IFilter>>([])
    const [isLoading, setIsLoading] = useState<Boolean>(false)
    // const handleFilter = () => {
    //     setShowFilter(!showFilter)
    // }

    useEffect(() => {
        ;(async () => {
            try {
                if (account == null) {
                    return
                } else if (index == 3) {
                    setIsLoading(true)
                    const { data } = await userApi.filterTransaction([], account)

                    if (data) {
                        setResFilters(data)
                    }
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [index, account])

    useEffect(() => {
        ;(async () => {
            try {
                setIsLoading(true)
                const { data } = await userApi.filterTransaction(filters, account)

                if (data) {
                    setResFilters(data)
                }
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [filters, account])

    return isLoading ? (
        <Skeleton count={4} height={30} style={{ marginBottom: '10px' }} />
    ) : resFilters.length > 0 ? (
        <Grid
            container
            spacing={{ xs: 1, sm: 2, md: 3 }}
            marginBottom="50px"
            marginLeft="50px"
            paddingX="20px"
        >
            {/* <Grid container item spacing={1}>
                <Grid item>
                    <FilterSideBar filters={filters} setFilter={setFilters}></FilterSideBar>
                </Grid>
                <Grid item xs={12} lg={10}>
                    <ReactVirtualizedTable transactions={resFilters}></ReactVirtualizedTable>
                </Grid>
            </Grid> */}
            <ReactVirtualizedTable transactions={resFilters.reverse()} />
        </Grid>
    ) : (
        <Box paddingBottom="50px" display="flex" justifyContent="center" width="100%" height="100%">
            <EmptyActivity />
        </Box>
    )
}

interface IFilterSideBarProps {
    filters: Array<FilterType>
    setFilter: React.Dispatch<React.SetStateAction<Array<FilterType>>>
}

export const FilterSideBar = ({ filters, setFilter }: IFilterSideBarProps) => {
    const [checked, setChecked] = useState({
        transfer: filters.includes(FilterType.transfer),
        addOrder: filters.includes(FilterType.addOrder),
        approve: filters.includes(FilterType.approve),
        cancelOrder: filters.includes(FilterType.cancelOrder),
        executeOrder: filters.includes(FilterType.executeOrder),
        mintPublic: filters.includes(FilterType.mintPublic),
    })

    const handleChange = (event: React.SyntheticEvent, filter: FilterType) => {
        const tmpChecked = checked
        tmpChecked[filter] = !checked[filter]
        changeFilters(tmpChecked, filter)
    }

    const changeFilters = (checked: any, filter: FilterType) => {
        const tmpFilter = Array.from(filters)
        setChecked(checked)
        if (tmpFilter.includes(filter)) {
            const index = tmpFilter.indexOf(filter)
            if (index > -1) {
                // only splice filters when item is found
                tmpFilter.splice(index, 1) // 2nd parameter means remove one item only
            }

            setFilter(tmpFilter)
            return
        }
        tmpFilter.push(filter)
        setFilter(tmpFilter)
    }
    return (
        <Grid container item>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={checked['transfer']} />}
                    label="Transfer"
                    onChange={(e) => handleChange(e, FilterType.transfer)}
                />
                <FormControlLabel
                    control={<Checkbox checked={checked['addOrder']} />}
                    label="Add order"
                    onChange={(e) => handleChange(e, FilterType.addOrder)}
                />
                <FormControlLabel
                    control={<Checkbox checked={checked['approve']} />}
                    label="Approve"
                    onChange={(e) => handleChange(e, FilterType.approve)}
                />
                <FormControlLabel
                    control={<Checkbox checked={checked['cancelOrder']} />}
                    label="Cancel order"
                    onChange={(e) => handleChange(e, FilterType.cancelOrder)}
                />
                <FormControlLabel
                    control={<Checkbox checked={checked['executeOrder']} />}
                    label="Execute Order"
                    onChange={(e) => handleChange(e, FilterType.executeOrder)}
                />
                <FormControlLabel
                    control={<Checkbox checked={checked['mintPublic']} />}
                    label="Mint public"
                    onChange={(e) => handleChange(e, FilterType.mintPublic)}
                />
            </FormGroup>
        </Grid>
    )
}
