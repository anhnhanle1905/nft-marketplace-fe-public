import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { userApi } from '@/apis/user'
import { LoadingButton } from '@mui/lab'

interface IChangeNameProps {
    account: string | null
    changeName: string
    setChangeName: React.Dispatch<React.SetStateAction<string>>
}

export default function ChangeNameDialog(props: IChangeNameProps) {
    const { account, changeName, setChangeName } = props
    const [open, setOpen] = React.useState(false)
    const [name, setName] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOnChange = (value: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setName(value.target.value)
    }

    const handleChangeName = async () => {
        setLoading(true)
        try {
            console.log({
                address: account!,
                name: name,
            })
            const { data } = await userApi.changeName(name, account!)
            setChangeName(data.name)
            setLoading(false)
            setOpen(false)
        } catch (err) {
            throw `erro on changeName ${err}`
        }
    }

    return (
        <div>
            <IconButton
                color="primary"
                aria-label="edit name"
                component="label"
                onClick={handleClickOpen}
            >
                <Edit />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>Enter your new name.</DialogContentText>
                    <Box component="form" noValidate={false}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="New name"
                            type="Name"
                            defaultValue={changeName}
                            fullWidth
                            variant="standard"
                            onChange={(value) => {
                                handleOnChange(value)
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            width: '120px',
                        }}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <LoadingButton
                        onClick={handleChangeName}
                        endIcon={<Edit />}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                    >
                        <span>Change</span>
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    )
}
