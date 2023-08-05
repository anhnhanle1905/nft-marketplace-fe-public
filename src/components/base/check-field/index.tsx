import { styled } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import { useTheme } from '@mui/material/styles'

interface CheckBoxFieldProps {
    label?: string
}

const StyledCheckBox = styled(Checkbox)((theme) => ({
    fontWeight: 'normal',
    color: ' #727282',
    padding: '8px',
    '& .MuiSvgIcon-root': {
        height: '22px',
        width: '22px',
    },
}))

export const CheckboxFiled = ({ label }: CheckBoxFieldProps) => {
    const theme = useTheme()
    return (
        <FormGroup>
            <FormControlLabel
                control={<StyledCheckBox />}
                label={label}
                sx={{
                    '.MuiFormControlLabel-label': {
                        fontSize: 14,
                        fontFamily: 'Linik Sans',
                        lineHeight: '20px',
                    },
                    [theme.breakpoints.down(480)]: {
                        '& .MuiFormControlLabel-label': {
                            fontSize: 12,
                        },
                    },
                }}
            />
        </FormGroup>
    )
}
