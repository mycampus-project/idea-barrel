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
import { navigate } from "hookrouter";

const EventDialog = (props) => {
  const { data, handleClose, deleteEvent, show, handleOwner } = props;
  const { title, body, category, startTime, endTime, id } = data;
  const handleNavigate = (url) => {
    navigate(url, true);
  };

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
      maxWidth: "97%",
      minHeight: "150px",
    },
    dialogCategory: {
      width: "100%",
    },
    dialogDateTime: {
      width: "100%",
      marginBottom: "2rem",
    },
    dialogDeleteButton: {
      width: "15%",
      height: "40px",
      marginLeft: "2rem",
      marginTop: "2rem",
      marginBottom: "2rem",
    },
    calendarButton: {
      maxWidth: "40%",
      alignItems: "center",
    },
  });
  const styles = useStyles();

  // deleteEvent - can delete everything atm
  return (
    <Dialog open={show} fullWidth={true}>
      <Typography align="center" style={{ wordWrap: "break-word" }}>
        {handleOwner ? <body>This event is posted by you</body> : ""}
        <Grid container className={styles.dialogGrid}>
          <Button
            className={styles.closeButton}
            color="primary"
            startIcon={<CloseIcon />}
            aria-label="closeEvent"
            onClick={handleClose}
          ></Button>
        </Grid>
        <DialogTitle className={styles.dialogTitle}>{title}</DialogTitle>

        <DialogContent className={styles.dialogBody}>{body}</DialogContent>
        <DialogContent className={styles.dialogDateTime}>
          <Typography component={"span"} variant={"body"} align="center">
            <p>
              {"Event starts at: "}
              <Moment format="DD-MM-YYYY" date={startTime} />{" "}
              <Moment format="HH:mm:ss" date={startTime} />
            </p>

            <p>
              {"Event ends at: "}
              <Moment format="DD-MM-YYYY" date={endTime} />{" "}
              <Moment format="HH:mm:ss" date={endTime} />
            </p>
          </Typography>

          <Button
            className={styles.calendarButton}
            variant="contained"
            color="primary"
            onClick={() => {
              handleNavigate("/calendar");
            }}
          >
            Go to calendar
          </Button>
        </DialogContent>
        {handleOwner === true ? (
          <Typography variant="h2" align="left">
            <Button
              className={styles.dialogDeleteButton}
              disabled={!handleOwner}
              variant="contained"
              color="secondary"
              onClick={() => {
                window.confirm("Do you want to delete this event?") &&
                  deleteEvent(id, category);
              }}
              startIcon={<DeleteIcon />}
            ></Button>
          </Typography>
        ) : null}
      </Typography>
    </Dialog>
  );
};
export default EventDialog;
