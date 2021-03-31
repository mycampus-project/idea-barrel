import {
    Button,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import BackendAPI from "../api/BackendAPI";
import { navigate } from "hookrouter";


const CreateEventPage = () => {
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
    const postEvent = async () => {
        const data = {
            senderId: eventData.senderId,
            title: eventData.title,
            body: eventData.body,
            category: eventData.category,
        };

        const res = await postEventAsync(data)
        if (res.status === 200) {
            navigate('/events')
        } else if (res.status === 400) {
            console.log("Cant send", res)
        } else {
            console.log("different error")
        }
    }
    const onSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <Typography component="h4" variant="h4">
                Create event
            </Typography>
                <form noValidate onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h5" variant="h5">
                                SenderId
                        </Typography>
                            <TextField
                                variant="outlined"
                                name="senderId"
                                autoFocus
                                required
                                fullWidth
                                value={eventData.senderId}
                                label="Insert sender id"
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
                                required
                                value={eventData.title}
                                label="Insert event title"
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
                                multiline
                                rows={5}
                                fullWidth
                                required
                                value={eventData.body}
                                label="Insert event info"
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
                                label="Insert event info"
                                onChange={updateField}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={() => postEvent()}
                        type="create event"
                        variant="contained"
                        color="primary"
                    >
                        Submit event
          </Button>
        </form>
    </div>
    )
}

export default CreateEventPage