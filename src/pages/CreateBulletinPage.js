import { makeStyles, Select, TextField, Typography, Button, FormControl, InputLabel, Box } from "@material-ui/core"
import React, { useState } from "react"

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
    }
}))

const CreateBulletinPage = () => {

    const [errors, setErrors] = useState({ title: false, description: false })
    const [helpers, setHelpers] = useState({ title: "", description: "" })
    const [formState, setFormState] = useState({ title: "", description: "", category: "Announcement", image: null }) // Category set to Annoucement since is the automatically selected item in the selector
    const classes = useStyles()                                                                                       // Remember to Change if selectors first option changes!

    const hadnleFormSubmit = () => {
        console.log("FormSubmitEvent")
        console.log(formState)
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
                if (formState.description.length === 0) {
                    updateErrorBool("description", true)
                    updateHelperMsg("description", "Required")
                } else {
                    updateErrorBool("description", false)
                    updateHelperMsg("description", "")
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
                        id="description"
                        label="Description"
                        onBlur={handleOnBlur}
                        onChange={updateField}
                        rows={4}
                        error={errors.description}
                        helperText={helpers.description}
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
                    <Button variant="contained" color="primary" onClick={hadnleFormSubmit}>Submit</Button>
                </Box>
            </form>
        </div>
    )

}

export default CreateBulletinPage