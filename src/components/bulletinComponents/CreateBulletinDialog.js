import { makeStyles, Select, TextField, Typography, Button, FormControl,IconButton, InputLabel, Box, Dialog, Slide, AppBar,Toolbar } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import React, { useState, useContext } from "react"
import BackendAPI from "../../api/BackendAPI"
import { SnackbarContext } from "../../contexts/SnackbarContext"

// Slide Transition for the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },
    item: {
        paddingTop: theme.spacing(2),
        width: "300dp",
        textAlign: "center"
    },
    formItem: {
        width: "80%"
    },
    FormControl: {
        paddingTop: theme.spacing(1),

    },
    imagePreview: {
        maxWidth: "200px",
        height: "auto",
        aspectRatio: 3 / 2
    },
    appBar: {
        position: "relative",
        minHeight: "64px",
        padding: theme.spacing(1)
      },
}))

const CreateBulletinDialog = (props) => {
    const { postBulletinsAsync } = BackendAPI();
    const { setSnackbar } = useContext(SnackbarContext)
    const hiddenFileInput = React.useRef(null)
    const [errors, setErrors] = useState({ title: false, body: false })
    const [helpers, setHelpers] = useState({ title: "", body: "" })
    const [formState, setFormState] = useState({ title: "", body: "", category: "Announcement", image: null, senderId: "Arttu", pinned: false }) // Category set to Annoucement since is the automatically selected item in the selector
    const classes = useStyles()                                                                                       // Remember to Change if selectors first option changes!
    const { open, handleCreateClose } = props
    // Handles data submission 
    const hadnleFormSubmit = async (data, url) => {
        try {
            await postBulletinsAsync(data).then((res) => {
                console.log(res)
                if (res.status === 200) {
                    console.log("POST EVENT SUCCESS")
                    setSnackbar("Succesfully created a new bulletin!", 3, 3000)
                    window.location.reload()
                } else {

                }
            })
        } catch (e) {
            setSnackbar(e, 0, 5000)
        }
    }

    const updateHelperMsg = (helper, message) => {
        setHelpers({
            ...helpers,
            [helper]: message
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

    const updateImage = (event) => {
        setFormState({
            ...formState,
            "image": URL.createObjectURL(event.target.files[0])
        })
    }

    const handleImageSelectClick = e => {
        hiddenFileInput.current.click()
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
            case "body": {
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
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleCreateClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h5" className={classes.title}>
                        Create Bulletin
                    </Typography>

                </Toolbar>
            </AppBar>
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
                            className={classes.formItem}
                        />
                    </Box>
                    <Box className={classes.item}>
                        <TextField
                            required
                            value={formState.body}
                            variant="outlined"
                            multiline
                            id="body"
                            label="Body"
                            onBlur={handleOnBlur}
                            onChange={updateField}
                            rows={4}
                            error={errors.body}
                            helperText={helpers.body}
                            className={classes.formItem}
                        />
                    </Box>
                    <Box className={classes.item}>
                        <Button type="button" className={classes.formItem} formControl={false} variant="contained" color="primary" onClick={handleImageSelectClick}>Choose Image</Button>
                        <input type="file" onChange={updateImage} style={{ display: "none" }} ref={hiddenFileInput} />
                    </Box>
                    {formState.image == null
                        ? null
                        : <Box className={classes.item}>
                            <img src={formState.image} className={classes.imagePreview} alt={formState.title} />
                        </Box>}
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
            </div>
        </Dialog>
    )

}

export default CreateBulletinDialog