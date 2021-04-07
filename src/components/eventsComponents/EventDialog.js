import Moment from "react-moment";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

const EventDialog = (props) => {
  const { data, handleClose, show, isAdmin } = props;
  const { title, body, category, date, id } = data;

  console.log("isAdmin eventDialog:", isAdmin);

  const adminPrivileges = {
    ...(isAdmin && { disabled: false }),
  };
  const toString = adminPrivileges.disabled.toString();
  console.log(toString);

  const useStyles = makeStyles({
    dialogGrid: {
      justifyContent: "flex-end",
      borderRadius: 0,
    },
    closeButton: {
      marginTop: "1%",
      marginRight: "1%",
      padding: 0,
    },
    dialogTitle: {
      width: "100%",
      height: "25%",
    },
    dialogBody: {
      width: "100%",
    },
    dialogCategory: {
      width: "100%",
    },
    dialogDateTime: {
      width: "100%",
    },
    dialogDeleteButton: {
      width: "100%",
      marginTop: "5rem",
    },
  });
  const styles = useStyles();

  // deleteEvent - can delete everything atm
  return (
    <Dialog open={show} fullWidth={true}>
      <Grid container className={styles.dialogGrid}>
        <Button
          className={styles.closeButton}
          color="black"
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
        <Moment format="DD-MM-YYYY" date={date} />{" "}
        <Moment format="HH:mm:ss" date={date} />
      </DialogContent>
      <Button
        className={styles.dialogDeleteButton}
        disabled="{toString}"
        variant="contained"
        color="secondary"
        onClick={() => props.deleteEvent(id, category)}
        startIcon={<DeleteIcon />}
      ></Button>
    </Dialog>
  );
};
export default EventDialog;
