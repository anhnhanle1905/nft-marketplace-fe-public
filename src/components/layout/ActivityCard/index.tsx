import { MoreVert } from '@mui/icons-material'
import { Grid, Avatar, Typography, IconButton } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
// import { MoreVert } from '@material-ui/icons';

const useStyles = makeStyles((theme: any) => ({
    card: {
        width: '100%',
        height: '100px',
        border: '1px solid #ccc',
        borderRadius: 10,
        paddingLeft: 20,
        boxSizing: 'border-box',
    },
    avatar: {
        marginRight: theme.spacing(100),
    },
    icon: {
        position: 'absolute',
        right: 40,
        bottom: 10,
        // top: theme.spacing(2),
    },
    span: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 6,
        marginTop: 6,
    },
}))

interface IActivityProps {
    type: string
    uri: string
    userName: string
    nftName: string
    createAt: string
}

export const ActivityCard = ({ activity }: any) => {
    const classes = useStyles()
    const { nft, interactiveUser, created_at, type } = activity
    function content() {
        if (type == 'likeNFT') return `liked by `
    }

    function date() {
        const dateString = created_at
        const date = new Date(dateString)

        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear().toString()
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')

        const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes}`
        return formattedDate
    }

    return (
        <Grid
            container
            width="100%"
            alignItems="center"
            className={classes.card}
            sx={{ bgcolor: '#eeeef0' }}
        >
            <Grid item>
                <Avatar
                    alt="Avatar"
                    src={nft.uri}
                    sx={{ bgcolor: deepOrange[500], width: 70, height: 70 }}
                />
            </Grid>
            <Grid item xs marginLeft={5}>
                <Typography variant="body1" fontWeight="bold">
                    {nft.name}
                </Typography>
                <div className={classes.span}>
                    <Typography variant="body1">{content()}</Typography>
                    <Typography marginLeft="4px" variant="body1" color="#8364e2">
                        {interactiveUser.name}
                    </Typography>
                </div>
                <Typography variant="body1" color="textSecondary">
                    {date()}
                </Typography>
            </Grid>
            {/* <Grid item>
                <IconButton aria-label="more" className={classes.icon}>
                    <MoreVert />
                </IconButton>
            </Grid> */}
        </Grid>
    )
}
