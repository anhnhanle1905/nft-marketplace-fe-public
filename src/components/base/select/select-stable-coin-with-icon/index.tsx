import { NextImage } from '@/components'
import { STABLE_COINS } from '@/onchains/constants'
import { FormHelperText, MenuItem, Select } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { styled } from '@mui/material/styles'
import { Control, useController } from 'react-hook-form'

export interface SelectOption {
    label?: string
    value: number | string
}

export interface SelectFieldProps {
    name: string
    control: Control<any>
    label?: string
    disabled?: boolean
}

const CurrencyLogo = styled(NextImage)(({ theme }) => ({
    marginRight: '8px',
    position: 'relative',
    top: '0px',
    left: 0,
}))
const FlipButton = styled('button')(({ theme }) => ({
    position: 'absolute',
    top: '-5px',
    left: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
    backgroundColor: '#E5E6FA',
    border: '4px solid #FFFFFF',
    borderRadius: '4px',
    padding: '6px 8px',
    cursor: 'pointer',
    zIndex: 10,
    [theme.breakpoints.up('md')]: {
        padding: '10px 13px',
    },
}))

const CurrencySelect = styled(Select)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '5px 17px 5px 6px',
    fontFamily: 'Linik Sans Bold',
    [theme.breakpoints.up('md')]: {
        padding: '6px 19px 6px 8px',
    },
    lineHeight: '24px',
    fontWeight: 700,
    fontSize: '16px',
    backgroundColor: '#E5E6FA',
    borderRadius: '100px',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#000000',
    '& .MuiOutlinedInput-notchedOutline': { border: 0, boxShadow: 'none' },
    '& .MuiList-root': {
        '& .MuiMenuItem-root': {},
    },
    '& .MuiButtonBase-root': {
        fontFamily: 'Linik Sans Bold',
        fontWeight: 700,
        fontSize: '16px',
        color: '#000000',
    },
    [theme.breakpoints.up('md')]: {
        lineHeight: '28px',
        fontSize: '20px',
        marginRight: '11px',
    },
}))
// const CurrencySymbol = styled(Typography)(({ theme }) => ({
//     fontFamily: 'Linik Sans Bold',
//     lineHeight: '24px',
//     fontSize: '16px',
//     fontWeight: 700,
//     color: '#000000',
//     marginRight: '8px',

//     [theme.breakpoints.up('md')]: {
//         lineHeight: '28px',
//         fontSize: '20px',
//         marginRight: '11px',
//     },
// }))

export function SelectStableCoin({ name, control, label, disabled }: SelectFieldProps) {
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    })
    return (
        <FormControl fullWidth margin="normal" size="small" disabled={disabled} error={invalid}>
            <InputLabel id={`${name}_label`}>{label}</InputLabel>
            <CurrencySelect
                labelId={`${name}_label`}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                label={label}
                // @ts-ignore
                // IconComponent={
                //     <FlipButton onClick={() => setOpen(!open)}>
                //     <NextImage
                //         src="/images/icon-arrow-down-2.svg"
                //         alt="arrow icon"
                //         priority
                //         width={upMd ? 16 : 12}
                //         height={upMd ? 16 : 12}
                //         className="arrow-icon"
                //     />
                // </FlipButton>
                // }
            >
                {Object.keys(STABLE_COINS).map((coin) => (
                    <MenuItem key={coin} value={coin}>
                        {coin}
                    </MenuItem>
                ))}
            </CurrencySelect>

            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    )
}
