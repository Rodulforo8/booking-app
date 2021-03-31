import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import logo from '../../images/linkedin_banner_image_1.png'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: "transparent"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        background: "transparent",
        marginTop: "2em"
    },
}));
export const Header = () => {
    const classes = useStyles();

    return (

        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid style={{ margin: "auto" }} item xs={11} item md={4}>
                    <Paper elevation={5} className={classes.paper}>
                        <img style={{ height: "240px", width: "100%", objectFit: "contain" }} src={logo} /></Paper>

                </Grid>

            </Grid>
        </div>

    )
}

export default Header

