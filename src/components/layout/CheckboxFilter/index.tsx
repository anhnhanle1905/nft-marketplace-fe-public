import React, { memo, useCallback } from 'react'
// import { useDispatch } from 'react-redux';
import {
    status,
    itemsType,
    collections,
    catalysties,
    tagsNFTs,
    subTagsNFTs,
} from '@/data/statics/filters'
import { makeStyles, styled } from '@mui/styles'
import { Box, Typography } from '@mui/material'
import styles from './styles.module.scss'
import { nftApi } from '@/apis'

// import { filterCategories, filterStatus, filterItemsType, filterCollections } from '../../store/actions';
interface SearchPanelProps {
    selectedFilters: string[]
    setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>
    setResultFilter: React.Dispatch<React.SetStateAction<any>>
}

const CheckboxFilter = ({
    selectedFilters,
    setSelectedFilters,
    setResultFilter,
}: SearchPanelProps) => {
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await nftApi.filterNFTs(selectedFilters)
                setResultFilter(selectedFilters.length > 0 ? response.data : [])
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [selectedFilters])

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target

        setSelectedFilters((prevFilters) => {
            if (checked) {
                return [...prevFilters, value]
            } else {
                return prevFilters.filter((filter) => filter !== value)
            }
        })
    }

    const isFilterSelected = (value: string) => selectedFilters.includes(value)
    return (
        <Box
            sx={{
                display: { xs: 'none', sm: 'flex' },
            }}
        >
            <Box
                sx={{
                    display: { xs: 'none', sm: 'flex' },
                    flexDirection: 'column',
                    width: '200px',

                    padding: '0 10px 10px 10px',
                }}
            >
                <div className={styles.item_filter_group}>
                    <Typography variant="h4" fontSize="16px" fontWeight={700} marginBottom="10px">
                        Select Catalyst
                    </Typography>
                    <div className={styles.de_form}>
                        {catalysties.map((item, index) => (
                            <div className={styles.de_checkbox} key={index}>
                                <input
                                    id={item.value}
                                    name={item.value}
                                    type="checkbox"
                                    value={item.value}
                                    // onChange={() => onFilter(item.value)}
                                    onChange={handleFilterChange}
                                />
                                <label htmlFor={item.value}>{item.label}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.item_filter_group}>
                    <Typography variant="h4" fontSize="16px" fontWeight={700} margin="10px 0">
                        Status
                    </Typography>

                    <div className={styles.de_form}>
                        {status.map((item, index) => (
                            <div className={styles.de_checkbox} key={index}>
                                <input
                                    id={item.value}
                                    name={item.value}
                                    type="checkbox"
                                    value={item.value}
                                    onChange={handleFilterChange}
                                />
                                <label htmlFor={item.value}>{item.label}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.item_filter_group}>
                    <Typography variant="h4" fontSize="16px" fontWeight={700} margin="10px 0">
                        Tag
                    </Typography>

                    <div className={styles.de_form}>
                        {tagsNFTs.map((item, index) => (
                            <div className={styles.de_checkbox} key={index}>
                                <input
                                    id={item.value}
                                    name={item.value}
                                    type="checkbox"
                                    value={item.value}
                                    // onChange={() => onFilter(item.value)}
                                    onChange={handleFilterChange}
                                />
                                <label htmlFor={item.value}>{item.label}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.item_filter_group}>
                    <Typography variant="h4" fontSize="16px" fontWeight={700} margin="10px 0">
                        Subtag
                    </Typography>
                    <div className={styles.de_form}>
                        {subTagsNFTs.map((item, index) => (
                            <div className={styles.de_checkbox} key={index}>
                                <input
                                    id={item.value}
                                    name={item.value}
                                    type="checkbox"
                                    value={item.value}
                                    // onChange={() => onFilter(item.value)}
                                    onChange={handleFilterChange}
                                />
                                <label htmlFor={item.value}>{item.label}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </Box>
            <Box
                sx={{
                    height: '730px',
                    borderLeft: '1px solid #E9E9F0',
                    borderRight: '1px solid #E9E9F0',
                    width: '15px',
                    backgroundColor: 'rgba(249,249,249,1)',
                    marginLeft: '-35px',
                }}
            />
        </Box>
    )
}

export default memo(CheckboxFilter)
