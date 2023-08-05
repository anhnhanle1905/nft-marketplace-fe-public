import { Grid } from '@mui/material'

const mobilePadding = '16px'

export const AppContainer = ({
    children,
    sx = {},
    fullWidth = false,
    container = true,
    width,
    extendedWidth = '0px',
    ...others
}: any) => (
    <Grid
        container={container}
        sx={{
            width:
                width || fullWidth
                    ? '100%'
                    : {
                          xs: '100%',
                          sm: `calc(90% + ${extendedWidth})`,
                          md: `calc(768px + ${extendedWidth})`,
                          lg: `calc(1128px + ${extendedWidth})`,
                      },
            margin: 'auto',
            paddingLeft: fullWidth
                ? { xs: mobilePadding, sm: '76px', xl: '156px' }
                : { xs: mobilePadding, md: 'auto' },
            paddingRight: fullWidth
                ? { xs: mobilePadding, sm: '76px', xl: '156px' }
                : { xs: mobilePadding, md: 'auto' },
            boxSizing: fullWidth ? '' : { xs: 'border-box', md: 'content-box' },
            ...sx,
        }}
        {...others}
    >
        {children}
    </Grid>
)
