import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import moment from 'moment'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const columns = [

    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'bookingTime', headerName: 'Booking Time', width: 200 },
    {
        field: 'streetAddress',
        headerName: 'Street Address',
        sortable: false,
        width: 600,
    },
    {
        field: 'bookingPrice',
        headerName: 'Booking Price',
        type: 'number',
        width: 150,
    },
];

// const rows = [
//     { id: 1, bookingTime: 'Snow', firstName: 'Jon', streetAddress: 'Loren Ipsum', bookingPrice: 100 },
//     { id: 2, bookingTime: 'Lannister', firstName: 'Cersei', streetAddress: 'Loren Ipsum', bookingPrice: 100 },
//     { id: 3, bookingTime: 'Lannister', firstName: 'Jaime', streetAddress: 'Loren Ipsum', bookingPrice: 100 },
//     { id: 4, bookingTime: 'Stark', firstName: 'Arya', streetAddress: 'Loren Ipsum', bookingPrice: 100 },
//     { id: 5, bookingTime: 'Targaryen', firstName: 'Daenerys', streetAddress: 'Loren Ipsum', bookingPrice: 100 },
//     { id: 6, bookingTime: 'Melisandre', firstName: null, streetAddress: 'Loren Ipsum', bookingPrice: 100 },
//     { id: 7, bookingTime: 'Clifford', firstName: 'Ferrara', streetAddress: 'Loren Ipsum', bookingPrice: 100 },
//     { id: 8, bookingTime: 'Frances', firstName: 'Rossini', streetAddress: 'Loren Ipsum', bookingPrice: 100 },
//     { id: 9, bookingTime: 'Roxie', firstName: 'Harvey', streetAddress: 'Loren Ipsum', bookingPrice: 100 },
// ];


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    },
    gridContainer: {
        margin: "auto"
    }
}));


function Bookings(props) {



    const classes = useStyles();
    const history = useHistory();
    const [admin, setAdminData] = useState(props.adminData)
    const [rows, setRows] = useState([])
    const [fetched, setFetched] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {

        if (!props.logged) {
            history.push("/");
        }

        fetchData()


    }, [rows])

    async function fetchData() {
        try {

            let config = {
                headers: {
                    adminemail: admin.email,
                    app: 'APP_BCK',
                    Accept: 'application/json',
                    token: admin.sessionTokenBck
                }
            }


            let URL = "https://dev.tuten.cl:443/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=true"

            var response = await axios.get(URL, config)

            let array = []
            for (var i in response.data) {
                var data = response.data[i]
                var newRow = {
                    id: data.bookingId,
                    name: data.tutenUserClient.firstName + ' ' + data.tutenUserClient.lastName,
                    bookingTime: moment.unix(data.bookingTime).format("MM/DD/YYYY, h:mm:ss a"),
                    streetAddress: data.locationId.streetAddress,
                    bookingPrice: data.bookingPrice.toFixed(1)
                }
                array.push(newRow)
            }

            setFetched(true)

            setRows(array)

        } catch (error) {
            console.log(error)
        }
    }

    const handleLogout = () => {
        console.log('login out...')
        localStorage.clear();
        history.push("/");
    }





    return (
        <div>
            <Grid container spacing={3}>
                <Grid className={classes.gridContainer} item xs={11} md={7}>
                    <Paper elevation={5} className={classes.paper}>
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickOpen}
                        >
                            <ExitToAppIcon />
                        </IconButton>
                        <Grid className={classes.gridContainer} item xs={11} md={11}>
                            <div style={{ height: 400, width: '100%' }}>

                                {fetched &&
                                    <DataGrid rows={rows} columns={columns} pageSize={5} />}
                            </div>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Desea salir de la  sesion?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ margin: "auto" }}>
                    <Button autoFocus onClick={handleClose} color="primary">
                        NO CERRAR
            </Button>
                    <Button onClick={handleLogout} color="primary" autoFocus>
                        SALIR
          </Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}

export default Bookings

