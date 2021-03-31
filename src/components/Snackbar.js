import { makeStyles, Snackbar } from "@material-ui/core"
import MuiAlert from '@material-ui/lab/Alert';
import React, { useContext } from "react"
import { SnackbarContext } from '../contexts/SnackbarContext'

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    snack: {
        width: "100%",
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}))

const SnackbarUtil = (props) => {
    const { snackbar, setSnackbar } = useContext(SnackbarContext);
    const { message, severity, duration } = snackbar
    const classes = useStyles() 
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSnackbar(null, 3, 6000) // sets the duration back to the default 6000ms
    }

    return (
        <div className={classes.snack}>
            <Snackbar open={!!message} autoHideDuration={duration} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default SnackbarUtil