import { makeStyles, Button, Grid, TextField, Typography } from "@material-ui/core"
import React, { useState } from "react"
import BackendAPI from "../api/BackendAPI";
import { navigate } from "hookrouter";

const useStyles = makeStyles({

})


const CreateEventPage = () => {
    const styles = useStyles();
    const [eventData, setEventData] = useState({
        senderId: "",
        title: "",
        body: "",
        category: "",
    });

    const {
        postEventAsync,
    } = BackendAPI();

    const updateField = event => {
        setEventData({
            ...eventData,
            [event.target.name]: event.target.value
        });
    };
    const postEvent = () => {
        const data = {
            senderId: eventData.senderId,
            title: eventData.title,
            body: eventData.body,
            category: eventData.category,

        };
        postEventAsync(data).then(res => {
            if (res.status === 200) {
                navigate('/events')
            } else {
                console.log(res)
            }
        })

    }




    return (
        <div>
            <Typography component="h4" variant="h4">
                Create event
            </Typography>
            <form className={styles.eventForm} noValidate>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <Typography component="h5" variant="h5">
                            SenderId
                        </Typography>
                        <TextField
                            variant="outlined"
                            name="senderId"
                            fullWidth
                            value={eventData.senderId}
                            requiredlabel="Insert sender id"
                            autoFocus
                            onChange={updateField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h5" variant="h5">
                            Event title
                        </Typography>
                        <TextField
                            variant="outlined"
                            name="title"
                            fullWidth
                            value={eventData.title}
                            requiredlabel="Insert event title"
                            onChange={updateField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h5" variant="h5">
                            Event info
                        </Typography>
                        <TextField
                            variant="outlined"
                            name="body"
                            fullWidth
                            value={eventData.body}
                            requiredlabel="Insert event info"
                            onChange={updateField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h5" variant="h5">
                            Event category
                        </Typography>
                        <TextField
                            variant="outlined"
                            name="category"
                            value={eventData.category}
                            fullWidth
                            requiredlabel="Insert event category"
                            onChange={updateField}
                        />
                    </Grid>
                </Grid>
                <Button
                    onClick={() => postEvent()}
                    type="create event"
                    variant="contained"
                    color="primary"
                    className={styles.submitBtn}
                >
                    Sign Up
          </Button>
            </form>

        </div>
    )
}

export default CreateEventPage