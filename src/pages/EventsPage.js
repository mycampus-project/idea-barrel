import { useState, useEffect, useContext } from "react";
import BackendAPI from "../api/BackendAPI";
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp";
import { navigate } from "hookrouter";
import { SnackbarContext } from "../contexts/SnackbarContext";
import {
  Button,
  IconButton,
  ThemeProvider,
  createMuiTheme,
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
    console.log("handleShow:", data);
  };

  const handleClose = () => {
    setShow(false);
  };

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

  const categoryButtonTheme = createMuiTheme({
    overrides: {
      MuiButton: {
        // category button
        outlinedPrimary: {
          color: "blue",
          borderRadius: 20,
        },
      },
    },
  });

  // Category choose function
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
    <div className="EventsPage">
      <div className="CategoryDiv">
        <Button
          className="eventButton"
          onClick={() => handleSorted("all")}
          variant="outlined"
          color="primary"
        >
          Show All
        </Button>
        {categoryList}
        <IconButton
          onClick={() => createEventsNav()}
          className="postEventButton"
          aria-label="open"
        >
          <AddCircleSharpIcon />
        </IconButton>
      </div>
      {sorted === "all" ? <ul>{allArray}</ul> : <ul>{sortedArray}</ul>}
      <EventDialog
        isAdmin={isAdmin} // admin privileges prop
        show={show}
        handleClose={handleClose}
        data={dialogData}
        handleDelete={deleteEvent}
      ></EventDialog>
    </div>
  );
};

export default Events;
