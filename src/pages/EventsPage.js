import React from "react";
import {
  Button,
  Container,
  makeStyles,
  Card,
  Typography,
  CardContent
} from '@material-ui/core';

// Just for some testing and so on
const EventsPage = () => {
  const styles = useStyles();
  return (
    <Container component='main' maxWidth="xs">
      <p>Events1</p>
      <Button className={styles.eventButton}onClick={console.log("Button 1 clicked)")} variant="contained">Cat 1</Button>
      <Button className={styles.eventButton}onClick={console.log("Button 1 clicked)")} variant="contained">Cat 2</Button>
      <Button className={styles.eventButton}onClick={console.log("Button 1 clicked)")} variant="contained">Cat 3</Button>
      <Button className={styles.eventButton}onClick={console.log("Button 1 clicked)")} variant="contained">Cat 4</Button>
      <Card className={styles.root}>
        <CardContent className={styles.cardContent}>
          <Typography variant="h5">
            Event
          </Typography>
          <Typography variant="body">
            This is event info
          </Typography>
        </CardContent>

      </Card>
    </Container>
  );
};
const useStyles = makeStyles ({
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
export default EventsPage;


