import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "1em",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundCize: "cover",
        zIndex: 1,
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    loginContainer: {
        margin: "auto"
    },
    button: {
        color: '#bdb9ac',
    },
    icons: {
        color: '#364f6b'
    }
}));
function Login(props) {
    const classes = useStyles();
    const history = useHistory();
    const defaultValues = {
        user: "testapis@tuten.cl",
        password: 1234,
        showPassword: false,
    };

    const [formValues, setFormValues] = useState(defaultValues)
    const [openError, setOpenError] = React.useState(false);
    const [message, setMessage] = useState({})


    const handleError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false);
    };



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {
            formValues.user = formValues.user.replace('@', '%40')

            let config = {
                headers: {
                    password: formValues.password,
                    app: 'APP_BCK',
                    'Accept': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                }
            }

            let data = {}

            let URL = `https://dev.tuten.cl/TutenREST/rest/user/${formValues.user}`

            var response = await axios.put(URL, data, config)

            if (response.status = 200) {
                props.getAdminData(response.data)
                render()
            }

            setFormValues(defaultValues)

        } catch (error) {
            setMessage(error.response.data)
            setFormValues(defaultValues)
            setOpenError(true)
        }
    };

    function render() {
        history.push("/bookings");
    }

    const handleClickShowPassword = () => {
        setFormValues({ ...formValues, showPassword: !formValues.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    return (
        <div>

            <div className={classes.root}>
                <Grid container spacing={3}>

                    <Grid className={classes.loginContainer} item xs={11} item md={4}>

                        <Paper style={{ background: "transparent" }} elevation={8} className={classes.paper}>

                            <Grid className={classes.loginContainer} item xs={11} item md={11}>
                                <Paper elevation={8} className={classes.paper}>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={3}>
                                            <Grid className={classes.loginContainer} item xs={12} item md={7}>
                                                <InputLabel htmlFor="user">User</InputLabel>
                                                <Input
                                                    value={formValues.user}
                                                    onChange={handleInputChange}
                                                    type="email"
                                                    name="user"
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <EmailIcon className={classes.icons} />
                                                        </InputAdornment>
                                                    }
                                                    endAdornment={
                                                        <InputAdornment position="start">
                                                            <AccountCircle />
                                                        </InputAdornment>
                                                    }
                                                    required
                                                    id="user"
                                                    aria-describedby="my-helper-text" />
                                            </Grid>

                                            <Grid className={classes.loginContainer} item xs={12} item md={7}>
                                                <InputLabel htmlFor="password">Password</InputLabel>
                                                <Input
                                                    value={formValues.password}
                                                    onChange={handleInputChange}
                                                    type={formValues.showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <LockIcon className={classes.icons} />
                                                        </InputAdornment>
                                                    }
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {formValues.showPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    required
                                                    id="password"
                                                    aria-describedby="my-helper-text" />
                                            </Grid>

                                            <Grid className={classes.loginContainer} item xs={12} item md={7}>
                                                <Button style={{ width: '50%', margin: 'auto', backgroundColor: "#364f6b", color: "white" }} variant="contained" className="Button" type="submit">
                                                    Submit
                                         </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>

                        </Paper>

                    </Grid>

                </Grid>
            </div>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleError}>
                <Alert onClose={handleError} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </div >
    )
}

export default Login

