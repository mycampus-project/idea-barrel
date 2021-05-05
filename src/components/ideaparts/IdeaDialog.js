import React from "react";
import BackendAPI from "../../api/BackendAPI";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DeleteIcon from "@material-ui/icons/Delete";

//Pop-up window that open on top of IdeaList when clicking an item

const IdeaDialog = (props) => {
  const { deleteIdeaAsync, updateIdeaAsync } = BackendAPI();
  const { data, handleClose, show, handleOwner } = props;
  const { title, body, category, id, senderId, department, upvotes } = data;

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
      marginLeft: "8em",
      width: "8.5em",
      height: "2.5em",
      marginTop: "2rem",
      marginBottom: "2rem",
    },
    calendarButton: {
      maxWidth: "40%",
      alignItems: "center",
    },
    depCat: {
      border: "solid 1px #3F51B5",
      width: "50%",
      marginLeft: "25%",
      marginRight: "25%",
      paddingBottom: "0%",
      paddingTop: "0%",
    },
  });
  const styles = useStyles();

  // HTTP delete from backend
  const deleteIdea = async (id, category) => {
    try {
      await deleteIdeaAsync(id, category);
      console.log("deleted");
      window.location.reload();
    } catch (e) {
      console.log("error deleting an idea");
      console.log(e);
    }
  };

  //HTTP PUT (update) upvote amount to idea object in backend
  const upvoteIdea = async (
    id,
    senderId,
    upvotes,
    category,
    title,
    body,
    department
  ) => {
    try {
      const data = {
        upvotes: upvotes + 1,
        id: id,
        senderId: senderId,
        category: category,
        title: title,
        body: body,
        department: department,
      };
      // TODO  if current user = idea senderID...
      const res = await updateIdeaAsync(data);
      window.location.reload();
      if (res.status === 200) {
        console.log("upvoted");
      } else if (res.status === 400) {
        console.log("Unable to update idea", res.json());
      } else {
        console.log("This shouldn't happend");
      }
    } catch (e) {
      console.log("error upvoting an idea");
      console.log(e);
    }
  };

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
        <DialogTitle className={styles.depCat}>
          {department} {category}
        </DialogTitle>

        <DialogContent className={styles.dialogBody}>{body}</DialogContent>
        <DialogContent className={styles.dialogDateTime}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              upvoteIdea(
                id,
                senderId,
                upvotes,
                category,
                title,
                body,
                department
              );
            }}
            startIcon={<ArrowUpwardIcon />}
          >
            Upvote
          </Button>
          {JSON.parse(window.localStorage.getItem("user"))?.isAdmin ||
          JSON.parse(window.localStorage.getItem("user"))?.department ===
            department ? (
            <Button
              className={styles.dialogDeleteButton}
              variant="contained"
              color="secondary"
              onClick={() => {
                window.confirm("Do you want to delete this idea?") &&
                  deleteIdea(id, category);
              }}
              startIcon={<DeleteIcon />}
            />
          ) : null}
        </DialogContent>
      </Typography>
    </Dialog>
  );
};
export default IdeaDialog;
