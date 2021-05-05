import React, { useState, useEffect, useContext } from "react";
import BackendAPI from "../api/BackendAPI";
import { navigate } from "hookrouter";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {
  Button, //eslint-disable-line
  makeStyles,
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
  const [sortedCategory, setSortedCategory] = useState("Sort by category");
  const [events, setEvents] = useState([]);
  const [isOwnerOrAdmin, setOwnerOrAdmin] = useState(false);

  const getEvents = async () => {
    try {
      const response = await fetchEventsAsync();
      setEvents(response);
    } catch (e) {
      console.log("error fetching bulletins");
    }
  };
  const formatDate = (string) => {
    const parsed = new Date(string);
    return parsed;
  };

  // sorting button, either by category or latest
  const sorter = (param) => {
    switch (param) {
      case "category":
        const sortedNames = events.sort((a, b) =>
          a.category.localeCompare(b.category)
        );
        setSortedCategory("Sort by latest");
        setEvents(sortedNames);
        break;
      case "latest":
        const sortedDates = events.sort(
          (a, b) => formatDate(b.date) - formatDate(a.date)
        );
        setSortedCategory("Sort by category");
        setEvents(sortedDates);
        break;
      default:
        break;
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetchUsersAsync();
      setUsers(response);
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
    if (data.senderId === user.id || user.isAdmin) {
      setOwnerOrAdmin(true);
    } else {
      setOwnerOrAdmin(false);
    }
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
      // split category text to separate category from id (stored in event)
      const array = event.split(" ").map((data) => {
        return data;
      });
      //const id = array[array.length - 1];
      // Slice array to remove id, string it, replace commas with spaces to return the whole original category name
      const category = array.slice(0, -1).toString().replace(/,/g, " ");

      // not used for anything but
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

  const useStyles = makeStyles((theme) => ({
    sortedText: {
      marginTop: "2%",
      marginBottom: "2%",
    },
    buttonMargin: {
      margin: theme.spacing(1),
    },
    center: {
      marginTop: theme.spacing(1),
      justifyContent: "center",
    },
  }));
  const style = useStyles();

  const eventSender = users.filter((o1) =>
    events.map((o2) => o1.id === o2.senderId)
  );

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
    <div className={style.center}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          className={style.buttonMargin}
          variant="contained"
          color="primary"
          onClick={() => handleSorted("all")}
        >
          Show All Events
        </Button>
        {sorted === "all" ? (
          <div>
            <Button
              className={style.buttonMargin}
              variant="contained"
              color="primary"
              onClick={() => {
                if (sortedCategory === "Sort by category") {
                  sorter("category");
                } else sorter("latest");
              }}
            >
              {sortedCategory}
            </Button>
          </div>
        ) : (
          <div className={style.sortedText}>Sorting by category: {sorted}</div>
        )}
      </div>
      <ScrollMenu
        data={sortedArray.length < 1 ? menuItems : ""}
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
        userData={user}
        show={show}
        handleClose={handleClose}
        handleOwner={isOwnerOrAdmin}
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
