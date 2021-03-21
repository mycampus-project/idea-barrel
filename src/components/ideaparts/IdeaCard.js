import React, { useState } from "react";
import {
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
import "../../App.css"

const IdeaCard = () => {
 

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


  const IdeaCardItem = (props) => {
    //const {info, category, date, time } = props.data;
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
          <DialogTitle id="max-width-dialog-title">Title</DialogTitle>
          <DialogContent>Info</DialogContent>
          <DialogContent>Info 2</DialogContent>
          <DialogContent>Info 3</DialogContent>
        </Dialog>

        <Card className={styles.card} onClick={() => handleShow()}>
          <CardActionArea>
            <CardContent>
              <Grid container spacing={3} direction="row" alignItems="flex-start" justify="flex-start">
                <CardHeader title="Title" titleTypographyProps={{ variant: 'h3' }} />
                <Typography className={styles.category}>
                  Category
                </Typography>
              </Grid>
              <Typography className={styles.body}>
                Info
              </Typography>
              <Grid container direction="row" alignItems="center">
                <Typography className={styles.date}>
                  Info 2
                </Typography>
                <Typography className={styles.time}>
                  Info 3
                </Typography>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>

      </div>
    );
  };


  return (
    <IdeaCardItem />
  );
}

export default IdeaCard;




