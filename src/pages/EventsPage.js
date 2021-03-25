import React, { useState, useEffect } from "react";
import BackendAPI from "../api/BackendAPI";
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp";
import { navigate } from "hookrouter";
import Moment from "react-moment";
import {
  Button,
  Card,
  CardContent,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  makeStyles,
  Typography,
  ThemeProvider,
  createMuiTheme,
  Box,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import "../App.css";

const { fetchEventsAsync, deleteEventAsync } = BackendAPI();

const Events = () => {
  const [sorted, setSorted] = useState("all");
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const response = await fetchEventsAsync();
      setEvents(response);
    } catch (e) {
      console.log("error fetching bulletins");
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleSorted = (event) => {
    if (event !== "all") {
      const toString = event.category;
      setSorted(toString);
    } else {
      setSorted(event);
    }
  };

  const createEventsNav = () => {
    navigate("/event-create");
  };

  const useStyles = makeStyles({
    root: {

    },
  });

  const categoryButtonTheme = createMuiTheme({
    overrides: {
      MuiButton: {
        // category button
        outlinedPrimary: {
          color: 'blue',
          borderRadius: 20,
        },
      },
    }
  }
  );

  const eventCardTheme = createMuiTheme({
    spacing: 5,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
      MuiPaper: {
        root: {
          width: "100%",
        },
        rounded: {
          //textcolor
          color: "black",
          borderRadius: 5,
        },
      },
      // card
      MuiButtonBase: {
        root: {
          // text color
          color: "black",
        },
      },
      MuiCardContent: {
        root: {

          padding: "20px",
          marginLeft: "0",
          marginRight: "0",
        },
      },
    },
  });

  // Just a list of things for testing purposes
  const CategoryChoose = (props) => {
    const category = props.buttonData;

    return (
      <ThemeProvider theme={categoryButtonTheme}>
        <Button
          onClick={() => handleSorted({ category })}
          variant="outlined"
          color="primary"
        >
          {category}
        </Button>
      </ThemeProvider>
    );
  };

  const EventsPage = (props) => {
    const { title, body, category, date, id } = props.data;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      // Card for event details and dialog for more info

      <div>
        <ThemeProvider theme={eventCardTheme}>
          <Card onClick={() => handleShow()}>
            <CardActionArea>
              <CardContent>
                <Box display="flex" flexDirection="row" minWidth="200px">
                  <Box width="100%">
                    <Typography variant="h6" component="h6">{title}</Typography>
                  </Box>
                  <Box flexShrink={0}>
                    <Typography variant="body2" component="body2">{category}</Typography>
                  </Box>
                </Box>
                <Box width="100%" justifyContent="flex-start">
                  <Box minHeight="100px" marginTop="1%" marginBottom="1%">
                    <Typography variant="body1" component="body1">{body}</Typography>
                  </Box>           
                </Box>     
                <Box display="flex" justifyContent="flex-end">
                 <Typography variant="body" component="body">
                  <Moment format="DD-MM-YYYY" date={date} />{" "}
                  <Moment format="HH:mm:ss" date={date} />
                </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>


          <Dialog open={show} onClose={handleClose} fullWidth={true}>
            <Grid container justify="flex-end" xl={2} direction="row">
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  deleteEventAsync(id, category).then((res) => {
                    console.log("deleteEventAsync: " + res.msg);
                    if (res.msg === "deleted") {
                      console.log("done");
                      handleClose();
                      navigate("/events");
                    } else {
                      console.log(res);
                    }
                  })
                }
                startIcon={<DeleteIcon />}
              ></Button>
              <IconButton className="open event" onClick={handleClose}>
                X
              </IconButton>
            </Grid>
            <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
            <DialogContent>{category}</DialogContent>
            <DialogContent>{body}</DialogContent>
            <DialogContent>
              <Moment format="DD-MM-YYYY" date={date} />{" "}
              <Moment format="HH:mm:ss" date={date} />
            </DialogContent>
          </Dialog>
        </ThemeProvider>
      </div>
    );
  };

  const Event = () => {
    const styles = useStyles();

    // Two separate arrays, all items or sorted items depending on user choice (all or specific category)
    // Not optimal, but works as intended for now

    const allArray = events.map((data) => (
      <EventsPage key={data.senderId} data={data} />
    ));
    console.log(events);
    const sortedArray = events
      .filter((item) => item.category === sorted)
      .map(({ title, body, category, date, senderId, id }) => {
        return { title, body, category, date, senderId, id };
      })
      .map((data) => <EventsPage data={data} />);
    const returnSingleCategory = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    const filteredCategory = events
      .filter((item) => item)
      .map(({ category }) => {
        return { category };
      })
      .map((data) => data.category);
    const categoryList = filteredCategory
      .filter(returnSingleCategory)
      .map((data) => <CategoryChoose buttonData={data} />);

    return (
      <div>
        <div>
          <Button
            className={styles.eventButton}
            onClick={() => handleSorted("all")}
            variant="outlined"
            color="primary"
          >
            Show All
          </Button>
          {categoryList}
          <IconButton
            onClick={() => createEventsNav()}
            className={styles.postEventButton}
            aria-label="open"
          >
            <AddCircleSharpIcon />
          </IconButton>
        </div>
        {sorted === "all" ? <ul>{allArray}</ul> : <ul>{sortedArray}</ul>}
      </div>
    );
  };
  return <Event />;
};

export default Events;
