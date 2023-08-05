import { createTheme } from '@mui/material/styles'
import localFont from 'next/font/local'

const fontFace = `
    @font-face {
        font-family: 'Clash Display Bold';
        src: url('/fonts/clash-display/ClashDisplay-Bold.otf') format('opentype');
    }
    @font-face {
        font-family: 'Clash Display';
        src: url('/fonts/clash-display/ClashDisplay-Regular.otf') format('opentype');
    }
    @font-face {
        font-family: 'Linik Sans';
        src: url('/fonts/linik-sans/LinikSans-Regular.ttf') format('truetype');
    }
    @font-face {
        font-family: 'Linik Sans Medium';
        src: url('/fonts/linik-sans/LinikSans-Medium.ttf') format('truetype');
    }
    @font-face {
        font-family: 'Linik Sans Bold';
        src: url('/fonts/linik-sans/LinikSans-Bold.ttf') format('truetype');
    }
    @font-face {
        font-family: 'Linik Sans Semi Bold';
        src: url('/fonts/linik-sans/LinikSans-SemiBold.ttf') format('truetype');
    }
    @font-face {
        font-family: 'Nexa Heavy';
        src: url('/fonts/nexa/Nexa-Heavy.ttf') format('truetype');
    }
    @font-face {
        font-family: 'Nexa';
        font-weight: 900;
        src: url('/fonts/nexa/Nexa-ExtraBold.otf') format('truetype');
    }
    @font-face {
        font-family: 'Nexa';
        font-weight: 100;
        src: url('/fonts/nexa/Nexa-Thin.otf') format('truetype');
    }
`

// https://beta.nextjs.org/docs/optimizing/fonts#local-fonts
// export const fonts = localFont({
//     src: [{ path: '../../public/fonts/linik-sans/LinikSans-Regular.ttf' }],
// })

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgba(91, 78, 250, 1)',
        },
        secondary: {
            main: '#28245E',
            light: 'rgba(190, 193, 252, 1)',
        },
        common: {
            black: '#262626',
        },
        text: {
            primary: '#232233',
            secondary: '#515167',
            disabled: 'rgba(175, 174, 184, 1)',
        },
        success: {
            main: 'rgba(1, 165, 165, 1)',
        },
        error: {
            main: '#ED3F54',
        },
        grey: {
            200: '#C9CCD8',
            300: '#A8ABB6',
            400: '#999999',
            500: '#F5F4F9',
        },
    },
    typography: {
        // fontFamily: ['Linik Sans', '-apple-system', 'Arial', 'sans-serif'].join(','),
        h1: {
            fontFamily: 'Clash Display Bold',
            fontSize: 64,
        },
        h2: {
            fontFamily: 'Linik Sans',
            fontSize: 40,
        },
        h4: {
            fontFamily: 'Linik Sans',
            fontSize: 28,
        },
        subtitle1: {
            fontSize: 20,
        },
        subtitle2: {
            fontSize: 24,
        },
        h5: {
            fontFamily: 'Linik Sans',
            fontSize: 18,
        },
        h6: {
            fontFamily: 'Linik Sans',
            fontSize: 12,
        },
        body1: {
            fontFamily: 'Linik Sans',
            fontSize: 16,
            letterSpacing: 'normal',
        },
        button: {
            fontFamily: 'Linik Sans Bold',
            fontSize: 16,
        },
    },
    shape: {
        borderRadius: 8,
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1440,
            // @ts-ignore
            xxl: 1513,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            ${fontFace}
            `,
        },
    },
})

export default theme
