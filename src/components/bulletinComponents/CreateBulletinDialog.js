import { makeStyles, Select, TextField, Typography, Button, FormControl,IconButton, InputLabel, Box, Dialog, Slide, AppBar,Toolbar } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import React, { useState, useContext } from "react"
import BackendAPI from "../../api/BackendAPI"
import { SnackbarContext } from "../../contexts/SnackbarContext"
import { UserContext } from "../../contexts/UserContext"

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
    formControl: {
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
    const { open, handleCreateClose} = props

    const { user } = useContext(UserContext)

    const formatUserString = () => {
        return `${user.fName} ${user.lName}`
    }
    const { setSnackbar } = useContext(SnackbarContext)
    const hiddenFileInput = React.useRef(null)
    const [errors, setErrors] = useState({ title: false, body: false })
    const [helpers, setHelpers] = useState({ title: "", body: "" })
    const [file, setFile] = useState()
    const [preview, setPreview] = useState()
    const [formState, setFormState] = useState({ title: "", body: "", category: "Announcement",  senderId: user.id, senderName: formatUserString(), pinned: false }) // Category set to Annoucement since is the automatically selected item in the selector
    const classes = useStyles()                                                                                       // Remember to Change if selectors first option changes!

    // Handles data submission 
    const hadnleFormSubmit = async (data) => {
        try {
            const image = file
            const complete = {...data, image}
            console.log("COMPLETE POST:")
            console.log(complete)
            await postBulletinsAsync(complete).then((res) => {
                console.log(res)
                if (res.status === 200) {
                    console.log("POST EVENT SUCCESS")
                    setSnackbar("Succesfully created a new bulletin!", 3, 3000)
                    window.location.reload()
                } else {
                    // Status not 200... so prolly an error
                    setSnackbar("There was an error creating bulletin",0 ,5000)
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
        setFile(event.target.files[0])
        setPreview(URL.createObjectURL(event.target.files[0]))
    
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
                    {preview == null
                        ? null
                        : <Box className={classes.item}>
                            <img src={preview} className={classes.imagePreview} alt={formState.title} />
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
                        <Button variant="contained" color="primary" onClick={() => hadnleFormSubmit(formState, "/bulletins",{file})}>Submit</Button>
                    </Box>
                </form>
            </div>
        </Dialog>
    )

}

export default CreateBulletinDialog