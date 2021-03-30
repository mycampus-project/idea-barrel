import { makeStyles, Select, TextField, Typography, Button, FormControl, InputLabel, Box, Snackbar } from "@material-ui/core"
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState } from "react"
import BackendAPI from "../api/BackendAPI"


const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },
    item: {
        paddingTop: theme.spacing(2)
    },
    form: {

    },
    FormControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    snack: {
        width: "100%",
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}))

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const CreateBulletinPage = () => {

    const {
        postBulletinsAsync,
    } = BackendAPI();

    const [snack, setSnack] = useState({ open: false, severity: "success", message: "" })
    const [errors, setErrors] = useState({ title: false, body: false })
    const [helpers, setHelpers] = useState({ title: "", body: "" })
    const [formState, setFormState] = useState({ title: "", body: "", category: "Announcement", image: null, senderId: "Arttu" }) // Category set to Annoucement since is the automatically selected item in the selector
    const classes = useStyles()                                                                                       // Remember to Change if selectors first option changes!

    const openSnack = (severity, message) => {
        console.log("open snack")
        setSnack({ open: true, severity: severity, message: message })
    }

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        updateSnack("open", false)
    }

    const hadnleFormSubmit = async (data, url) => {
        try {
            await postBulletinsAsync(data).then((res) => {
                console.log(res)
                if (res.status === 200) {
                    console.log("POST EVENT SUCCESS")
                    openSnack("success", "Bulletin posted!")
                } else {
                    openSnack("error", res.statusText)
                }
            })
        } catch (e) {

        }
    }

    const updateHelperMsg = (helper, message) => {
        setHelpers({
            ...helpers,
            [helper]: message
        })
    }

    const updateSnack = (field, value) => {
        setSnack({
            ...snack,
            [field]: value
        })
    }

    const updateErrorBool = (error, bool) => {
        setErrors({
            ...errors,
            [error]: bool
        })
    }

    const updateField = e => {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        })
    }


    const handleOnBlur = (event) => {
        switch (event.target.id) {
            case "title": {
                if (formState.title.length === 0) {
                    updateErrorBool("title", true)
                    updateHelperMsg("title", "Required")
                } else {
                    updateErrorBool("title", false)
                    updateHelperMsg("title", "")
                }
                break;

            }
            case "description": {
                if (formState.body.length === 0) {
                    updateErrorBool("body", true)
                    updateHelperMsg("body", "Required")
                } else {
                    updateErrorBool("body", false)
                    updateHelperMsg("body", "")
                }
                break;
            }

            default:
        }
    }

    return (
        <div className={classes.root}>
            <form>
                <Box className={classes.item}>
                    <Typography component="h4" variant="h4">
                        Create a new Bulletin!
                 </Typography>
                </Box>
                <Box className={classes.item}>
                    <TextField
                        required
                        value={formState.title}
                        variant="outlined"
                        id="title"
                        label="Title"
                        onBlur={handleOnBlur}
                        onChange={updateField}
                        error={errors.title}
                        helperText={helpers.title}
                    />
                </Box>
                <Box className={classes.item}>
                    <TextField
                        required
                        value={formState.description}
                        variant="outlined"
                        multiline
                        id="body"
                        label="Body"
                        onBlur={handleOnBlur}
                        onChange={updateField}
                        rows={4}
                        error={errors.body}
                        helperText={helpers.body}
                    />
                </Box>
                <Box className={classes.item}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="filled-category-native-simple">Category</InputLabel>
                        <Select native onChange={updateField} label="Category" inputProps={{ name: "category", id: "category" }}>
                            <option value="Announcement">Announcement</option>
                            <option value="Info">Info</option>
                            <option value="Selling">Selling</option>
                            <option value="Renting">Renting</option>
                        </Select>
                    </FormControl>
                </Box>
                <Box className={classes.item}>
                    <Button variant="contained" color="primary" onClick={() => hadnleFormSubmit(formState, "/bulletins")}>Submit</Button>
                </Box>

            </form>
            <div className={classes.snack}>
                <Snackbar open={snack.open} autoHideDuration={2000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity={snack.severity}>
                        {snack.message}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )

}

export default CreateBulletinPage