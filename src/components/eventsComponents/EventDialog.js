import Moment from "react-moment";
import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

const EventDialog = (props) => {
  const { data, handleClose, deleteEvent, show, handleOwner } = props;
  const { title, body, category, startTime, endTime, id } = data;

  const useStyles = makeStyles({
    dialogGrid: {
      justifyContent: "flex-end",
      borderRadius: 0,
    },
    closeButton: {
      marginTop: "0%",
      marginRight: "0%",
      borderRadius: "20px",
    },
    dialogTitle: {
      width: "100%",
      height: "25%",
    },
    dialogBody: {
      width: "100%",
      minHeight: "100px",
    },
    dialogCategory: {
      width: "100%",
    },
    dialogDateTime: {
      width: "100%",
    },
    dialogDeleteButton: {
      width: "100%",
      marginTop: "2rem",
    },
  });
  const styles = useStyles();

  // deleteEvent - can delete everything atm
  return (
    <Dialog open={show} fullWidth={true}>
      {handleOwner ? <body>This is your own post</body> : ""}
      <Grid container className={styles.dialogGrid}>
        <Button
          className={styles.closeButton}
          color="primary"
          startIcon={<CloseIcon />}
          aria-label="closeEvent"
          onClick={handleClose}
        ></Button>
      </Grid>
      <DialogTitle id="max-width-dialog-title" className={styles.dialogTitle}>
        {title}
      </DialogTitle>
      <DialogContent className={styles.dialogCategory}>
        {category}
      </DialogContent>
      <DialogContent className={styles.dialogBody}>{body}</DialogContent>
      <DialogContent className={styles.dialogDateTime}>
        <Typography component={"span"} variant={"body"}>
          <p>Event starts at:</p>
          <Moment format="DD-MM-YYYY" date={startTime} />{" "}
          <Moment format="HH:mm:ss" date={startTime} />
          <p>Event ends at:</p>
          <Moment format="DD-MM-YYYY" date={endTime} />{" "}
          <Moment format="HH:mm:ss" date={endTime} />
        </Typography>
      </DialogContent>
      <Button
        className={styles.dialogDeleteButton}
        disabled={!handleOwner}
        variant="contained"
        color="secondary"
        onClick={() => {
          deleteEvent(id, category);
        }}
        startIcon={<DeleteIcon />}
      ></Button>
    </Dialog>
  );
};
export default EventDialog;
