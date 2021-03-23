import React, { useState, useEffect } from "react";
import BackendAPI from "../api/BackendAPI";
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import { navigate } from "hookrouter";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  makeStyles,
  Typography,
  Box
} from '@material-ui/core';
import "../App.css"
import { InfoOutlined } from "@material-ui/icons";

const {
  fetchEventsAsync,
} = BackendAPI();

const Events = () => {
  const [sorted, setSorted] = useState('all');
  const [events, setEvents] = useState([]);


  const getEvents = async () => {
    try {
      const response = await fetchEventsAsync();
      console.log(response);
      setEvents(response);
    } catch (e) {
      console.log("error fetching bulletins");
      console.log(e);
    }
  };


  useEffect(() => {
    getEvents();
  }, [])

  const handleSorted = (event) => {
    if (event !== 'all') {
      const toString = event.category
      setSorted(toString);
    } else {
      setSorted(event)
    }

  };
  const createEventsNav = () => {
    navigate("/event-create")
  }

  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
    eventButton: {
      marginTop: '2%',
      marginLeft: '1%',
      marginRight: '1%',
      borderRadius: '50%',
      maxWidth: '5%',
    },
    cardContent: {
      padding: '0',
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 10,
    },
    cardStyle: {
      border: 'solid 1px blue',
    },
    cardTitle: {
      marginTop: 10,
      marginRight: 20,
      marginBottom: 10,
      padding: 0,
    },
    cardTopRow: {
      marginTop: 10,
      marginLeft: 5,
      marginRight: 10
    },
    cardCategory: {
      textAlign: 'end',
      marginTop: 10,

    },
    dateTime: {
      marginTop: '50%',
      textAlign: 'end',
    },
    likes: {
    },
    info: {
      justifyContent: 'left',
    },


    events: {
      width: '100%',
    }
  });

  // Just a list of things for testing purposes
  const CategoryChoose = (props) => {
    const styles = useStyles();
    const { category } = props.buttonData;

    return (
      <Button className={styles.eventButton} onClick={() => handleSorted({ category })} variant="outlined" color="primary">{category}</Button>
    )
  };


  const EventsPage = (props) => {
    const { title, info, category, date, time } = props.data;
    const styles = useStyles();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      // Card for event details and dialog for more info
      <div className={styles.events} >
        <Card className={styles.cardStyle} onClick={() => handleShow()}>
          <CardActionArea>
            <CardContent className={styles.cardContent}>
              <Grid container spacing={2}>
                <Grid item>
                  <CardHeader className={styles.cardTitle} title={title} />
                </Grid>
                <Grid item xs container className={styles.cardTopRow} direction="column" spacing={2}>
                  {info}
                </Grid>
                <Grid item xs>
                  <Grid container spacing={0} direction="column">
                    <Typography className={styles.cardCategory}>
                      {category}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography className={styles.dateTime}>
                      {date}{" "}{time}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
        <Dialog open={show} onClose={handleClose} fullWidth={true}>
          <Grid container justify="flex-end" xl={2} direction="row">
            <IconButton className="open event" onClick={handleClose}>
              X
            </IconButton>
          </Grid>
          <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
          <DialogContent>{category}</DialogContent>
          <DialogContent>{info}</DialogContent>
          <DialogContent>{date}</DialogContent>
          <DialogContent>{time}</DialogContent>
        </Dialog>

      </div >

    );
  };

  const Event = () => {
    const styles = useStyles();

    // Two separate arrays, all items or sorted items depending on user choice (all or specific category)
    // Not optimal, but works as intended for now

    const allArray = events.map((details) => <li key={details.senderId}><EventsPage data={details} /></li>)
    const sortedCategoryArray = events.filter((item) => {
      return item.category === sorted;
    }).map(({ title, info, likes, category, date, time }) => {
      return { title, info, likes, category, date, time }
    });
    const sortedArray = sortedCategoryArray.map((item) => <li key={item.uniqueID}><EventsPage data={item} /></li>)
    const category = events.map((cat) => <CategoryChoose buttonData={cat} />);



    return (
      <div>
        <div>
          <Button className={styles.eventButton} onClick={() => handleSorted('all')} variant="outlined" color="primary">Show All</Button>
          {category}
          <IconButton onClick={() => createEventsNav()} className={styles.postEventButton} aria-label="open"><AddCircleSharpIcon /></IconButton>
        </div>
        {sorted === 'all' ?
          <ul>{allArray}</ul> :
          <ul>{sortedArray}</ul>}

      </div>
    );
  };
  return (
    <Event />
  );
}

export default Events;




