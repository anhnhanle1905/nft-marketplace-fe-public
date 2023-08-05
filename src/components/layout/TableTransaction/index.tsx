import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TableVirtuoso, TableComponents } from 'react-virtuoso'
import { IFilter } from '../ActivityTab'
import { shortenIfAddress } from '@usedapp/core'

// interface IFilter {
//     id: number
//     method: string
//     block: number
//     age: string
//     from: string
//     to: string
//     value: string
// }

interface ColumnData {
    dataKey: keyof IFilter
    label: string
    numeric?: boolean
    width: number
}

// type Sample = [string, number, string, string, string, string]

// const sample: readonly Sample[] = [
//     ['method1method1method1method1method1method1method1method1', 159, 'age1', 'from1', 'to', '4.0'],
//     ['method2', 237, 'age2', 'from2', 'to', '4.3'],
//     ['method3', 262, 'age3', 'from3', 'to', '6.0'],
//     ['method4', 305, 'age4', 'from4', 'to', '4.3'],
//     ['method5', 356, 'age4', 'from4', 'to', '3.9'],
// ]

// function createData(
//     blockNumber: Number,
//     data: string,
//     from: string,
//     method: string,
//     timestamp: Number,
//     to: string,
//     value: string
// ): IFilter {
//     return { blockNumber, data, from, method, timestamp, to, value }
// }

const columns: ColumnData[] = [
    {
        width: 120,
        label: 'Hash',
        dataKey: 'hash',
    },
    {
        width: 120,
        label: 'Data',
        dataKey: 'data',
    },
    {
        width: 120,
        label: 'Method',
        dataKey: 'method',
    },
    {
        width: 120,
        label: 'Block',
        dataKey: 'blockNumber',
        numeric: true,
    },
    {
        width: 120,
        label: 'Age',
        dataKey: 'timestamp',
        numeric: true,
    },
    {
        width: 120,
        label: 'From',
        dataKey: 'from',
    },
    {
        width: 120,
        label: 'To',
        dataKey: 'to',
    },
    {
        width: 120,
        label: 'Value',
        dataKey: 'value',
    },
]

// const rows: IFilter[] = Array.from({ length: sample.length }, (_, index) => {
//     // const randomSelection = sample[Math.floor(Math.random() * sample.length)]
//     return createData(index, ...sample[index])
// })

const VirtuosoTableComponents: TableComponents<IFilter> = {
    // eslint-disable-next-line react/display-name
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    // eslint-disable-next-line react/display-name
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableBody {...props} ref={ref} />
    )),
}

function fixedHeaderContent() {
    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align={column.numeric || false ? 'right' : 'left'}
                    style={{ width: column.width, maxWidth: column.width }}
                    sx={{
                        backgroundColor: 'background.paper',
                    }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    )
}
interface Cell {
    cellIndex: number
}

function handleClick(dataKey: any, content: any) {
    if (dataKey === 'hash') {
        window.open(`https://goerli.etherscan.io/tx/${content}`, '_blank')
    }
}

function rowContent(_index: number, row: IFilter) {
    const isHoverButton = (column: ColumnData) =>
        column.dataKey === 'from' ||
        column.dataKey === 'to' ||
        column.dataKey === 'blockNumber' ||
        column.dataKey === 'hash'
    const content = (column: ColumnData, row: IFilter) => row[column.dataKey] as string

    const splitContent = (column: ColumnData, row: IFilter) => {
        let first = (row[column.dataKey] as string).substring(0, 6)
        let last = (row[column.dataKey] as string).substring(
            (row[column.dataKey] as string).length - 3,
            (row[column.dataKey] as string).length
        )
        return `${first}...${last}`
    }
    return (
        <React.Fragment>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    align={column.numeric || false ? 'right' : 'left'}
                    onClick={() => handleClick(column.dataKey, content(column, row))}
                    style={{
                        color: isHoverButton(column) ? 'blue' : 'black',
                        cursor: isHoverButton(column) ? 'pointer' : 'null',
                    }}
                >
                    {column.dataKey === 'from' || column.dataKey === 'to'
                        ? shortenIfAddress(content(column, row))
                        : column.dataKey === 'data'
                        ? content(column, row).substring(0, 10)
                        : column.dataKey === 'hash'
                        ? splitContent(column, row)
                        : content(column, row)}
                </TableCell>
            ))}
        </React.Fragment>
    )
}

interface PaperProps {
    transactions: IFilter[]
}

export const ReactVirtualizedTable = ({ transactions }: PaperProps) => {
    return (
        <Paper style={{ height: 400, width: '100%' }}>
            <TableVirtuoso
                data={transactions}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
            />
        </Paper>
    )
}
