import {
    Button,
    Grid,
    TextField,
    Typography,
    createMuiTheme,
    ThemeProvider,
} from "@material-ui/core"
import React, { useState } from "react"
import BackendAPI from "../api/BackendAPI";
import { navigate } from "hookrouter";

const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    custom: {
        cardDiv: {
          margin: "10px 10px",
          backgroundColor: "lightgreen"
        }
      }
})


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
        console.log("postEventAsync", res)
        if (res !== null) {
            navigate('/events')
            console.log("postEventAsync", res)

        } else {
            console.log("postEventAsync error", res)
        }

    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Typography component="h4" variant="h4">
                    Create event
            </Typography>
                <form  noValidate>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Typography component="h5" variant="h5">
                                SenderId
                        </Typography>
                            <TextField
                                variant="outlined"
                                name="senderId"
                                autoFocus
                                fullWidth
                                value={eventData.senderId}
                                requiredlabel="Insert sender id"
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
                    >
                        Sign Up
          </Button>
                </form>
            </ThemeProvider>
        </div>
    )
}

export default CreateEventPage