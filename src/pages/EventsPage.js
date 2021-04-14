import React, { useState, useEffect, useContext } from "react";
import BackendAPI from "../api/BackendAPI";
import { navigate } from "hookrouter";
import { SnackbarContext } from "../contexts/SnackbarContext";
import ScrollMenu from "react-horizontal-scrolling-menu";
<<<<<<< HEAD
import {
  Button, //eslint-disable-line
  IconButton,
  Typography,
  ThemeProvider,
  makeStyles,
=======
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {
  Button, //eslint-disable-line
  Typography,
  ThemeProvider,
>>>>>>> events
  createMuiTheme, //eslint-disable-line
} from "@material-ui/core";
import EventDialog from "../components/eventsComponents/EventDialog.js";
import EventCard from "../components/eventsComponents/EventCard.js";
import "../App.css";
const { fetchEventsAsync, deleteEventAsync } = BackendAPI();

const Events = () => {
  const [sorted, setSorted] = useState("all");
  const [show, setShow] = useState(false);
  const [dialogData, setDialogData] = useState("");
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState("all");
  const { setSnackbar } = useContext(SnackbarContext);
  const isAdmin = useState(true); // admin placeholder

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

  const handleShow = (data) => {
    setDialogData(data);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };
  // remove duplicate categories

  const onSelect = (text) => {
    setSelected({ selected: text });
    handleSorted(text);
  };
  const handleSorted = (event) => {
    if (event !== "all") {
      // separate category and id to enable sorting
      console.log(event);
      const toString = event.split(" ");
      console.log("tostring:", toString);
      setSorted(toString[0]);
    } else {
      setSorted(event);
    }
  };

  const createEventsNav = () => {
    navigate("/event-create");
  };

  const deleteEvent = (id, category) => {
    deleteEventAsync(id, category).then((res) => {
      // creates a new state without the deleted object
      const newState = events.filter((item) => item.id !== id);
      // sets the new state "newState" as the current "events" state
      // Snackbar will alert about the status
      setEvents(newState);
      if (res.status === 200) {
        // removes event if
        setSnackbar("Deleted event succesfully", 3, 2000);
        handleClose();
      } else if (res.status === 400) {
        setSnackbar("Response returned status 400, cannot delete", 0, 2000);
        console.log("ERROR status:", res.status);
      } else {
        setSnackbar(
          "Something went wrong deleting event, status: ",
          res.status,
          1,
          2000
        );
        console.log("ERROR STATUS", res.status);
      }
    });
  };

  const MenuItem = ({ text, selected }) => {
    return (
      <div className={`menu-item ${selected ? "active" : ""}`}>{text}</div>
    );
  };

  const Arrow = ({ text, className }) => {
    return <div className={className}>{text}</div>;
  };

<<<<<<< HEAD
  const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
  const ArrowRight = Arrow({ text: ">", className: "arrow-next" });
=======
  const ArrowLeft = Arrow({ text: "<", className: "arrowprev" });
  const ArrowRight = Arrow({ text: ">", className: "arrownext" });
>>>>>>> events

  const categoryButtonTheme = createMuiTheme({
    overrides: {
      MuiButton: {
        // category button
        outlinedPrimary: {
          color: "blue",
          borderRadius: 20,
          width: "70%",
          marginTop: "2%",
          marginBottom: "2%",
        },
      },
    },
  });
<<<<<<< HEAD
  const useStyles = makeStyles({
    scrollMenuContainer: {
      width: "90%",
      marginLeft: "4vw",
      marginRight: "4vw",
      marginBottom: "2vw",
      alignItems: "center",
    },
  });
  const style = useStyles();
=======
>>>>>>> events

  // Two separate arrays, all items or sorted items depending on user choice (all or specific category)
  // Not optimal, but works as intended for now

  const allArray = events.map((data) => (
    <li onClick={() => handleShow(data)} key={data.id}>
      <EventCard data={data} handleDelete={deleteEvent} />
    </li>
  ));

  const sortedArray = events
    .filter((item) => item.category === sorted)
    .map(({ title, body, category, date, senderId, id }) => {
      return { title, body, category, date, senderId, id };
    })
    .map((data) => (
      <li onClick={() => handleShow(data)} key={data.id}>
        <EventCard data={data} handleDelete={deleteEvent} />
      </li>
    ));

  // remove duplicates from menuitems (category)
  const obj = [
    ...new Map(
      events.map((item) => [JSON.stringify(item.category), item])
    ).values(),
  ];
<<<<<<< HEAD
  console.log(obj);
=======
>>>>>>> events

  const menuItems = obj.map(({ category, id }) => (
    <MenuItem
      text={category}
      // save both category and id to create unique key and also save category for future
      // handling in onSelect() -function
      key={category + " " + id}
      selected={selected}
    />
  ));

  return (
    <div className="EventsPage">
      <ThemeProvider theme={categoryButtonTheme}>
        <Typography align="center">
          <Button
            className="eventButton"
            onClick={() => handleSorted("all")}
            variant="outlined"
            color="primary"
          >
            Show All Events
          </Button>
        </Typography>
      </ThemeProvider>
<<<<<<< HEAD
      <div className={style.scrollMenuContainer}>
        <ScrollMenu
          data={menuItems}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={onSelect}
          translate={0}
        />
      </div>
      <div className="CategoryDiv">
        <IconButton
          onClick={() => createEventsNav()}
          className="postEventButton"
          aria-label="open"
        >
          <AddCircleSharpIcon />
        </IconButton>
      </div>
=======
      <ScrollMenu
        data={menuItems}
        arrowLeft={ArrowLeft}
        arrowRight={ArrowRight}
        wheel={true}
        selected={selected}
        onSelect={onSelect}
        translate={0}
      />
>>>>>>> events
      {sorted === "all" ? <ul>{allArray}</ul> : <ul>{sortedArray}</ul>}
      <EventDialog
        isAdmin={isAdmin} // admin privileges prop
        show={show}
        handleClose={handleClose}
        data={dialogData}
        deleteEvent={deleteEvent}
      />
      <Fab
        color="primary"
        aria-label="add"
        style={{
          margin: 0,
          top: "auto",
          right: 16,
          bottom: 16,
          left: "auto",
          position: "fixed",
        }}
        onClick={() => createEventsNav()}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Events;
