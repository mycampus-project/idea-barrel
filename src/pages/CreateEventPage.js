import {
  Button,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useState, useContext } from "react";
import BackendAPI from "../api/BackendAPI";
import { navigate } from "hookrouter";
import { SnackbarContext } from "../contexts/SnackbarContext";
import { UserContext } from "../contexts/UserContext";

const CreateEventPage = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const { user } = useContext(UserContext);
  const [errors, setErrors] = useState({
    title: true,
    titleError: "Cant be empty",
    body: true,
    bodyError: "Cant be empty",
    category: true,
    categoryError: "Cant be empty",
  });
  const [eventData, setEventData] = useState({
    senderId: user.id,
    senderEmail: user.email,
    senderfName: user.fName,
    senderlName: user.lName,
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
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
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
      senderEmail: eventData.senderEmail,
      senderfName: eventData.senderfName,
      senderlName: eventData.senderlName,
      title: eventData.title,
      body: eventData.body,
      category: eventData.category,
      startTime: startTime,
      endTime: endTime,
    };
    console.log("POSTED DATA DATA: ", data);
    console.log("USER CREATEVENT:", user);

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
  const useStyles = makeStyles({
    createEvent: {
      marginTop: 0,
      marginBottom: "2vw",
    },
    pageTitle: {
      textAlign: "center",
      marginTop: "5%",
    },
    formStyle: {
      width: "100%",
      marginTop: "2%",
    },
    senderId: {
      marginLeft: "2%",
    },
    senderIdField: {
      marginLeft: "2%",
      width: "100%",
    },
    fieldContainer: {
      marginLeft: "2%",
      marginRight: "2%",
      width: "94%",
    },
    titleField: {
      marginLeft: "2%",
      marginRight: "2%",
      width: "100%",
    },
    title: {
      marginLeft: "2%",
      marginRight: "2%",
      width: "94%",
    },
    infoField: {
      marginLeft: "2%",
      marginRight: "2%",
      width: "100%",
    },
    info: {
      marginLeft: "2%",
      marginRight: "2%",
      width: "94%",
    },
    categoryField: {
      marginLeft: "2%",
      marginRight: "2%",
      width: "100%",
    },
    category: {
      marginLeft: "2%",
      marginRight: "2%",
      width: "94%",
    },
    startPicker: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
    },
    endPicker: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
    },
    pickerTitle: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
    },
    submitButtonBase: {
      alignContent: "center",
      width: "100%",
    },
    submitButton: {
      alignContent: "center",
      width: "40%",
      marginLeft: "30%",
      marginRight: "30%",
    },
    dateStartPicker: {
      textAlign: "center",
    },
    dateEndPicker: {
      textAlign: "center",
    },
  });
  const style = useStyles();

  return (
    <div className={style.createEvent}>
      <Typography className={style.pageTitle} component="h4" variant="h4">
        Create event
      </Typography>
      <form noValidate onSubmit={onSubmit} className={style.formStyle}>
        <Grid container spacing={2} className={style.fieldContainer}>
          <Grid item xs={12}>
            <Typography component="h4" variant="h4" className={style.title}>
              Event title
            </Typography>
            <TextField
              className={style.titleField}
              variant="outlined"
              name="title"
              required
              value={eventData.title}
              label="Insert event title"
              onChange={handleForm}
              onBlur={handleForm}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography component="h4" variant="h4" className={style.info}>
              Event info
            </Typography>
            <TextField
              className={style.infoField}
              variant="outlined"
              name="body"
              multiline
              rows={5}
              required
              value={eventData.body}
              label="Insert event info"
              onChange={handleForm}
              onBlur={handleForm}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography component="h4" variant="h4" className={style.category}>
              Event category
            </Typography>
            <TextField
              className={style.categoryField}
              variant="outlined"
              name="category"
              value={eventData.category}
              label="Insert event info"
              onChange={handleForm}
              onBlur={handleForm}
            />
          </Grid>
        </Grid>
        <Typography component="p" variant="p" className={style.pickerTitle}>
          Start time
        </Typography>
        <div className={style.startPicker}>
          <DatePicker
            className={style.dateStartPicker}
            selected={startTime}
            showTimeSelect
            shouldCloseOnSelect={true}
            showWeekNumbers
            filterDate={filterPassedTime}
            filterTime={filterPassedTime}
            timeFormat="HH:mm"
            dateFormat="dd/MM/yyyy HH:mm"
            onChange={(date) => setStartTime(date)}
          />
        </div>
        <Typography component="p" variant="p" className={style.pickerTitle}>
          End time
        </Typography>
        <div className={style.endPicker}>
          <DatePicker
            className={style.dateEndPicker}
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
        </div>
        <br />
        <br />
        <div className={style.submitButtonBase}>
          <Button
            className={style.submitButton}
            onClick={() => postEvent()}
            type="create event"
            variant="contained"
            color="primary"
          >
            Submit event
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
