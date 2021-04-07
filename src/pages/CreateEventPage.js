import { Button, Grid, TextField, Typography } from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useState, useContext } from "react";
import BackendAPI from "../api/BackendAPI";
import { navigate } from "hookrouter";
import { SnackbarContext } from "../contexts/SnackbarContext";

const CreateEventPage = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const { setSnackbar } = useContext(SnackbarContext);
  const [errors, setErrors] = useState({
    senderId: true,
    senderIdError: "Cant be empty",
    title: true,
    titleError: "Cant be empty",
    body: true,
    bodyError: "Cant be empty",
    category: true,
    categoryError: "Cant be empty",
  });
  const [eventData, setEventData] = useState({
    senderId: "",
    title: "",
    body: "",
    category: "",
    startTime: "",
    endTime: "",
  });
  const updateErrors = (error, boolean) => {
    setErrors({
      ...errors,
      [error]: boolean,
    });
  };
  const validateErrors = () => {
    if (
      (errors.senderIdError === null) &
      (errors.titleError === null) &
      (errors.bodyError === null) &
      (errors.categoryError === null)
    ) {
      setSubmitEnabled(false);
    } else {
      setSubmitEnabled(true);
    }
  };

  const { postEventAsync } = BackendAPI();

  // check that form does not have empty fields
  const handleForm = (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
    switch (event.target.name) {
      case "senderId":
        errors.senderId =
          eventData.senderId.length === 0
            ? updateErrors("senderId", true) &
              updateErrors("senderIdError", "Cant be empty")
            : updateErrors("senderId", false) &
              updateErrors("senderIdError", null);
        break;
      case "title":
        errors.title =
          eventData.title.length === 0
            ? updateErrors("title", true) &
              updateErrors("titleError", "Cant be empty")
            : updateErrors("title", false) & updateErrors("titleError", null);
        break;
      case "body":
        errors.body =
          eventData.body.length === 0
            ? updateErrors("body", true) &
              updateErrors("bodyError", "Cant be empty")
            : updateErrors("body", false) & updateErrors("bodyError", null);
        break;
      case "category":
        errors.category =
          eventData.category.length === 0
            ? updateErrors("category", true) &
              updateErrors("categoryError", "Cant be empty")
            : updateErrors("category", false) &
              updateErrors("categoryError", null);
        break;
      default:
        break;
    }
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  const filterSelectedTime = (time) => {
    const selectedDate = new Date(time);
    selectedDate.setDate(selectedDate.getDate() + 1);

    return startTime.getTime() < selectedDate.getTime();
  };

  const postEvent = async () => {
    const data = {
      senderId: eventData.senderId,
      title: eventData.title,
      body: eventData.body,
      category: eventData.category,
      startTime: startTime,
      endTime: endTime,
    };

    const res = await postEventAsync(data);
    validateErrors();
    if (res.status === 200 && { submitEnabled }) {
      setSnackbar("Event added", 3, 2000);
      navigate("/events");
    } else if (res.status === 400) {
      setSnackbar("Cannot add event: status 400", 1, 2000);
    } else {
      console.log("different error", { submitEnabled });
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
  };

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
              onChange={handleForm}
              onBlur={handleForm}
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
              onChange={handleForm}
              onBlur={handleForm}
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
              onChange={handleForm}
              onBlur={handleForm}
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
              onChange={handleForm}
              onBlur={handleForm}
            />
          </Grid>
        </Grid>
        <Typography component="p" variant="p">
          Start time
        </Typography>
        <DatePicker
          selected={startTime}
          showTimeSelect
          showWeekNumbers
          filterDate={filterPassedTime}
          filterTime={filterPassedTime}
          shouldCloseOnSelect={false}
          timeFormat="HH:mm"
          dateFormat="dd/MM/yyyy HH:mm"
          onChange={(date) => setStartTime(date)}
        />
        <Typography component="p" variant="p">
          End time
        </Typography>
        <DatePicker
          selected={endTime}
          showTimeSelect
          showWeekNumbers
          filterDate={filterSelectedTime}
          filterTime={filterSelectedTime}
          shouldCloseOnSelect={false}
          timeFormat="HH:mm"
          dateFormat="dd/MM/yyyy HH:mm"
          onChange={(date) => setEndTime(date)}
        />
        <br />
        <br />
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
  );
};

export default CreateEventPage;
