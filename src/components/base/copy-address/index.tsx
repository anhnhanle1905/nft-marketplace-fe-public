import { useState } from 'react'
import { Tooltip } from '@mui/material'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export const CopyAddress = ({
    children,
    text,
}: {
    children: string | React.ReactNode | any
    text: string
}) => {
    const [open, setOpen] = useState<boolean>(false)

    const handleTooltipOpen = () => {
        setOpen(true)

        setTimeout(() => {
            setOpen(false)
        }, 800)
    }

    return (
        <CopyToClipboard text={text}>
            <Tooltip
                PopperProps={{
                    disablePortal: true,
                }}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Copied"
                placement="left"
                arrow
                onClick={handleTooltipOpen}
            >
                {children}
            </Tooltip>
        </CopyToClipboard>
    )
}
