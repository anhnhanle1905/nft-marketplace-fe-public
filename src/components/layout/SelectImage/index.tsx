import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'

interface IUploadImage {
    onUpload: (image: any) => void
}

export default function UploadImage({ onUpload }: IUploadImage) {
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0]

        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const imgDataUrl = e.target?.result as any
                onUpload(imgDataUrl)
            }
            reader.readAsDataURL(file)
        }
    }
    return (
        <Box
            border="3px dashed #ddd"
            borderRadius="10px"
            padding="50px"
            display="flex"
            width="100%"
            flexDirection="column"
            text-align="center"
        >
            <Typography component="h1" variant="h5" fontWeight="bold">
                PNG, JPG, GIF, WEBP or MP4. Max 200mb.
            </Typography>
            <br></br>

            <Box height="auto" margin="0 auto" position="relative" width="max-content">
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={(event: any) => {
                        console.log(event.target.files[0])
                        handleFileSelect(event)
                    }}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span">
                        Browse
                    </Button>
                </label>
            </Box>
        </Box>
    )
}
