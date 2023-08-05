import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'

const PrivacyPolicy = styled(Typography)(({ theme }) => ({
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Linik Sans',
    display: 'flex',
    color: ' #727282',
    flexDirection: 'column',
}))

const TermAndPolicy = styled(Link)(({ theme }) => ({
    fontFamily: 'Linik Sans Bold',
    fontSize: 12,
    color: 'rgba(35, 34, 51, 1)',
    fontWeight: 700,
    textAlign: 'center',
    marginRight: 2,
    '&:hover': {
        textDecoration: 'underline',
    },
}))

export const PolicyArea = ({ ...props }) => {
    return (
        <Box {...props}>
            <PrivacyPolicy>This site is protected by reCAPTCHA and the </PrivacyPolicy>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex' }}>
                    <TermAndPolicy href="#">Google Privacy Policy</TermAndPolicy>
                    <PrivacyPolicy> and</PrivacyPolicy>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <TermAndPolicy href="#" sx={{ marginLeft: 0.275 }}>
                        Terms of Service
                    </TermAndPolicy>
                    <PrivacyPolicy>apply</PrivacyPolicy>
                </Box>
            </Box>
        </Box>
    )
}
