import React, { useState } from "react";
import {
  Button,
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
} from '@material-ui/core';
import "../App.css"

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
    eventButton: {
      marginTop: '2%',
      marginLeft: '1%',
      marginRight: '1%',
      borderRadius: '50%',
      maxWidth: '5%',
    },
    card: {
      border: 'solid 1px blue',
    },
    date: {
      textAlign: 'end',
    },
    likes: {
    },
    body: {
      justifyContent: 'left',
    },
    category: {
      flexDirection: 'row',
      fontSize: '15px',
    },
    eventDetailButton: {
      position: 'absolute',
      left: '85%',
      top: '-5%',
    },
    events: {
      width: '100%',
    }
  });

  // Just a list of things for testing purposes
  const CategoryChoose = (props) => {
    const styles = useStyles();


    return (
      <div className={styles.eventsTop}>
        <Button className={styles.eventButton} onClick={() => handleSorted("all")} variant="outlined" color="primary"> Show all</Button>
        <Button className={styles.eventButton} onClick={() => handleSorted("hobby")} variant="contained" color="default" size="small">Hobby</Button>
        <Button className={styles.eventButton} onClick={() => handleSorted("work")} variant="contained" color="default" size="small">Work</Button>
        <Button className={styles.eventButton} onClick={() => handleSorted("essential")} variant="contained" color="default" size="small">Essential</Button>
        <Button className={styles.eventButton} onClick={() => handleSorted("slack")} variant="contained" color="default" size="small">Slack</Button>
      </div>
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
        <Dialog open={show} onClose={handleClose} fullWidth={true}>
          <IconButton className={styles.eventDetailButton} onClick={handleClose}>
            X
                </IconButton>
          <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
          <DialogContent>{info}</DialogContent>
          <DialogContent>{date}</DialogContent>
          <DialogContent>{time}</DialogContent>
        </Dialog>

        <Card className={styles.card} onClick={() => handleShow()}>
          <CardActionArea>
            <CardContent>
              <Grid container spacing={3} direction="row" alignItems="flex-start" justify="flex-start">
                <CardHeader title={title} titleTypographyProps={{ variant: 'h3' }} />
                <Typography className={styles.category}>
                  {category}
                </Typography>
              </Grid>
              <Typography className={styles.body}>
                {info}
              </Typography>
              <Grid container direction="row" alignItems="center">
                <Typography className={styles.date}>
                  {date}
                </Typography>
                <Typography className={styles.time}>
                  {time}
                </Typography>
              </Grid>
            </CardContent>
          </CardActionArea>
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
    return (
      <div>
        <CategoryChoose />
        {sorted === 'all' ? 
        <ul>{allArray}</ul> : 
        <ul>{sortedArray}</ul> }
        </div>
    );
  };

  return (
    <Event />
  );
}

export default Events;




