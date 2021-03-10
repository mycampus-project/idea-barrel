import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Typography,

} from '@material-ui/core';

const data = [
  {
    title: "kalastusta",
    info: "kalaa",
    likes: "5"
  },
  {
    title: "kaliaa",
    info: "kaliaa",
    likes: "5"
  },
  {
    title: "ruokaa",
    info: "ruokaa",
    likes: "0"
  },
  {
    title: "nukkuu",
    info: "krooh",
    likes: "0"
  },
]
const useStyles = makeStyles({
  root: {
    borderRadius: 10,
    margin: 10,
  },
  cardContent: {
    color: 'black',
    marginTop: 10,
  },
  eventButton: {
    borderRadius: 20,
  }



});

// Just a list of things for testing purposes
const CategoryChoose = () => {
  const styles = useStyles();
  return (
    <div className="eventsTop">
      <Container component='main' maxWidth="xs"></Container>
      <Button className={styles.eventButton} onClick={console.log("Button 1 clicked)")} variant="contained">Cat 1</Button>
      <Button className={styles.eventButton} onClick={console.log("Button 2 clicked)")} variant="contained">Cat 2</Button>
      <Button className={styles.eventButton} onClick={console.log("Button 3 clicked)")} variant="contained">Cat 3</Button>
      <Button className={styles.eventButton} onClick={console.log("Button 4 clicked)")} variant="contained">Cat 4</Button>
      <Container />
    </div>
  )
};


const EventsPage = (props) => {
  const { title, info, likes } = props.data;
  const styles = useStyles();
  return (
    <Container component='main' maxWidth="xs">
      <Container component='content'>
        <div className="events">
          <Card>
            <CardHeader title={title} />
            <CardContent>
              <Typography variant="body" className={styles.body}>
                {info}
              </Typography>
              <Typography variant="h5" className={styles.h5}>
                {likes}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Container>
  );
};
const Events = () => {
  const eventItem = data.map((i) => <li><EventsPage data={i} /></li>)
  return (
    <div>
      <CategoryChoose/>
      <ul>
        {eventItem}
      </ul>
    </div>
  );
};

export default Events;


