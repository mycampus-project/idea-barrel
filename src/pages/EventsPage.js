import React, { useState, useEffect, useContext } from "react";
import BackendAPI from "../api/BackendAPI";
import { navigate } from "hookrouter";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {
  Button, //eslint-disable-line
  Typography,
  ThemeProvider,
  createMuiTheme, //eslint-disable-line
} from "@material-ui/core";
import { SnackbarContext } from "../contexts/SnackbarContext";
import { UserContext } from "../contexts/UserContext";
import EventDialog from "../components/eventsComponents/EventDialog.js";
import EventCard from "../components/eventsComponents/EventCard.js";
import "../App.css";
const { fetchEventsAsync, deleteEventAsync } = BackendAPI();

// Event page, check components EventCard.js and EventDialog.js for their functionality
const Events = () => {
  const [sorted, setSorted] = useState("all");
  const [show, setShow] = useState(false);
  const [dialogData, setDialogData] = useState("");

  const [selected, setSelected] = useState("all");
  const { setSnackbar } = useContext(SnackbarContext);
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const { fetchUsersAsync } = BackendAPI();

  const [sortedCategory, setSortedCategory] = useState("");
  const [sortedTitle, setSortedTitle] = useState("");
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const response = await fetchEventsAsync();
      console.log("eventspage user:", user);
      console.log("eventspage user:", user.isAdmin);
      setEvents(response);
    } catch (e) {
      console.log("error fetching bulletins");
    }
  };
  const dynamicSort = (property) => {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    } else {
      return function (a, b) {
        return a[property] < b[property]
          ? -1
          : a[property] > b[property]
          ? 1
          : 0 * sortOrder;
      };
    }
    return function (a, b) {
      return a[property] > b[property]
        ? -1
        : a[property] > b[property]
        ? 1
        : 0 * sortOrder;
    };
  };
  console.log(events);

  const sorter = (param) => {
    console.log(sorted);
    switch (param) {
      case "-category":
        if (sorted === "all") {
          setSortedCategory("Descending");
          setEvents(events.sort(dynamicSort(param)));
          console.log(events);
        }
        break;
      case "category":
        if (sorted === "all") {
          setSortedCategory("Ascending");
          setEvents(events.sort(dynamicSort(param)));
        }
        break;
      case "-title":
        if (sorted === "all") {
          setSortedTitle("Descending");
          setEvents(events.sort(dynamicSort(param)));
        }
        break;
      case "title":
        if (sorted === "all") {
          setSortedTitle("Ascending");
          setEvents(events.sort(dynamicSort(param)));
        }
        break;
      default:
        break;
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetchUsersAsync();
      setUsers(response);
      console.log("Users:");
      console.log(response);
    } catch (e) {
      console.log("error fetching users");
      console.log(e);
    }
  };

  useEffect(() => {
    getEvents();
    getUsers();
  }, []); //eslint-disable-line
  // Handles event dialog window data
  const handleShow = (data) => {
    setDialogData(data);
    setShow(true);
  };

  // Closes the event dialog
  const handleClose = () => {
    setShow(false);
  };
  // remove duplicate categories

  // Scrollmenu select to show right text / category
  const onSelect = (text) => {
    setSelected({ selected: text });
    handleSorted(text);
  };

  // sort the event list depending on scrollmenu choice
  const handleSorted = (event) => {
    if (event !== "all") {
      // separate category and id to enable sorting
      console.log("EVENT:", event);

      // split category text to separate category from id (stored in event)
      const array = event.split(" ").map((data) => {
        return data;
      });
      const id = array[array.length - 1];
      // Slice array to remove id, string it, replace commas with spaces to return the whole original category name
      const category = array.slice(0, -1).toString().replace(/,/g, " ");

      // not used for anything but
      console.log(id);
      setSorted(category);
    } else {
      setSorted(event);
    }
  };

  //go to create event page
  const createEventsNav = () => {
    navigate("/event-create");
  };

  // handles deleting of event
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

  // scrollmenu item populating
  const MenuItem = ({ text, selected }) => {
    return (
      <div className={`menu-item ${selected ? "active" : ""}`}>{text}</div>
    );
  };

  // left and right arrows for scrollmenu
  const Arrow = ({ text, className }) => {
    return <div className={className}>{text}</div>;
  };

  // left and right arrows
  const ArrowLeft = Arrow({ text: "<", className: "arrowprev" });
  const ArrowRight = Arrow({ text: ">", className: "arrownext" });

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
  console.log("USERS: ", users);
  const eventSender = users.filter((o1) =>
    events.map((o2) => o1.id === o2.senderId)
  );

  console.log("EVENTSENDER:", eventSender);

  // All events containing array
  const allArray = events.map((data) => (
    <li onClick={() => handleShow(data)} key={data.id}>
      <EventCard
        eventSender={eventSender}
        data={data}
        handleDelete={deleteEvent}
      />
    </li>
  ));

  // events sorted by category choice
  const sortedArray = events
    .filter((item) => item.category === sorted)
    .map((data) => (
      <li onClick={() => handleShow(data)} key={data.id}>
        <EventCard
          data={data}
          eventSender={eventSender}
          handleDelete={deleteEvent}
        />
      </li>
    ));
  // remove duplicates from menuitems (category)
  const obj = [
    ...new Map(
      events.map((item) => [JSON.stringify(item.category), item])
    ).values(),
  ];

  // Scrollmenu items mapping
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
          <Typography align="center">
            <Button
              onClick={() => {
                if (sortedCategory === "Descending") {
                  sorter("category");
                } else sorter("-category");
              }}
            >
              SORT BY CATEGORY {sortedCategory}
            </Button>
          </Typography>
          <Typography align="center">
            <Button
              onClick={() => {
                if (sortedTitle === "Descending") {
                  sorter("title");
                } else sorter("-title");
              }}
            >
              SORT BY TITLE {sortedTitle}
            </Button>
          </Typography>
        </Typography>
      </ThemeProvider>
      <ScrollMenu
        data={menuItems}
        arrowLeft={ArrowLeft}
        arrowRight={ArrowRight}
        wheel={true}
        selected={selected}
        onSelect={onSelect}
        alignOnResize={true}
        translate={0}
      />
      {sorted === "all" ? <ul>{allArray}</ul> : <ul>{sortedArray}</ul>}
      <EventDialog
        isAdmin={user.isAdmin} // admin privileges prop
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
