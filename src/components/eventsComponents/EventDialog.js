import Moment from "react-moment";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const EventDialog = (props) => {
  const { data, handleClose, show, isAdmin } = props;
  const { title, body, category, date, id } = data;

  console.log("isAdmin:", isAdmin);
  const adminPrivileges = {
    ...(isAdmin && { disabled: false }),
  };

  console.log("adminProp: ", adminPrivileges);

  // deleteEvent - can delete everything atm
  return (
    <div className="eventDialog">
      <Dialog open={show} fullWidth={true}>
        <Grid container justify="flex-end" xl={2} direction="row">
          <IconButton
            className="open event"
            aria-label="closeEvent"
            onClick={handleClose}
          >
            X
          </IconButton>
        </Grid>
        <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
        <DialogContent>{category}</DialogContent>
        <DialogContent>{body}</DialogContent>
        <DialogContent>
          <Moment format="DD-MM-YYYY" date={date} />{" "}
          <Moment format="HH:mm:ss" date={date} />
        </DialogContent>
        <Button
          {...adminPrivileges}
          variant="contained"
          color="secondary"
          onClick={() => props.deleteEvent(id, category)}
          startIcon={<DeleteIcon />}
        ></Button>
      </Dialog>
    </div>
  );
};
export default EventDialog;
