import React, { useState } from "react";
import {
  Button,
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Typography,

} from '@material-ui/core';

const Events = () => {
  const [sorted, setSorted] = useState('all');
  const data = [
    {
      uniqueID: "1",
      title: "kalastusta",
      info: "kalaa tulee, kuha on jo saalista",
      likes: "5",
      category: "work",
      date: "10.3.2021",
      time: "15:21",
    },
    {
      uniqueID: "2",
      title: "kaliaa",
      info: "kaliaa joka päivä täysii glug glug",
      likes: "5",
      category: "hobby",
      date: "6.2.2021",
      time: "15:21",
    },
    {
      uniqueID: "3",
      title: "ruokaa",
      info: "ruokaa Infoa blabla, jotai safkaa heh",
      likes: "0",
      category: "essential",
      date: "7.3.2021",
      time: "15:15",
    },
    {
      uniqueID: "4",
      title: "nukkuu",
      info: "krooh pyyh",
      likes: "0",
      category: "slack",
      date: "9.1.2021",
      time: "15:00",
    },
  ]
  const handleSorted = (event) => {
    setSorted(event);
  };

  const useStyles = makeStyles({
    root: {
      display: 'flex',
    },
    body: {
      display: 'inline-block',
    },
    h5: {
      borderRadius: 20,
    },
    title: {
      fontSize: 20,
    },
    eventButton: {
      borderRadius: 30,
      maxWidth: 1,
    },
    eventsTop: {
      marginTop: "3%",
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    category: {
      justifyContent: 'flex-end'
    }
  });

  // Just a list of things for testing purposes
  const CategoryChoose = (props) => {
    const styles = useStyles();

    return (
      <div className={styles.eventsTop}>
        <Button className={styles.eventButton} onClick={() => handleSorted("all")} variant="contained">Show all</Button>
        <Button className={styles.eventButton} onClick={() => handleSorted("hobby")} variant="contained">Hobby</Button>
        <Button className={styles.eventButton} onClick={() => handleSorted("work")} variant="contained">Work</Button>
        <Button className={styles.eventButton} onClick={() => handleSorted("essential")} variant="contained">Essential</Button>
        <Button className={styles.eventButton} onClick={() => handleSorted("slack")} variant="contained">Slack</Button>
      </div>
    )
  };


  const EventsPage = (props) => {
    const { title, info, likes, category, date, time } = props.data;
    const styles = useStyles();

    return (
      <div className="events">
        <Card>
          <CardHeader className={styles.title} title={title} />
          <CardContent>
            <Typography className={styles.body}>
              {info}
            </Typography>
            <Typography className={styles.category}>
              {category}
            </Typography>
            <Typography className={styles.h5}>
              likes: {likes}
            </Typography>
            <Typography className={styles.date}>
              {date}{" "}{time}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  };

  const Event = () => {

    // Two separate arrays, all items or sorted items depending on user choice (all or specific category)
    // Not optimal, but works as intended for now

    const allArray = data.map((details) => <li key={details.uniqueID}><EventsPage data={details} /></li>)
    const sortedCategoryArray = data.filter((item) => {
      return item.category === sorted;
    }).map(({ title, info, likes, category, date, time }) => {
      return { title, info, likes, category, date, time }
    });
    const sortedArray = sortedCategoryArray.map((item) => <li key={item.uniqueID}><EventsPage data={item} /></li>)
    if (sorted === 'all') {
      return (
        <div>
          <CategoryChoose />
          <ul>
            {allArray}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <CategoryChoose />
          <ul>
            {sortedArray}
          </ul>
        </div>
      )
    }
  };
  return (
    <Event />
  );
}

export default Events;




