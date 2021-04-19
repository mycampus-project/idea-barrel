import { makeStyles, Dialog, AppBar, Toolbar, Slide, IconButton, Typography, Button } from "@material-ui/core"; //eslint-disable-line
import React, { useContext } from "react";
import CloseIcon from "@material-ui/icons/Close"
import DeleteIcon from '@material-ui/icons/Delete';
import BackendAPI from "../../api/BackendAPI";
import { UserContext } from "../../contexts/UserContext"

const {
  getImageUrl
} = BackendAPI();


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    minHeight: "64px",
    padding: theme.spacing(1)
  },
  title: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    flex: 1
  },
  image: {
    width: "100%",
    hieght: undefined,
    aspectRatio: 2 / 1,
    overflow: "hidden",
  },
  padding: {
    padding: theme.spacing(1)
  },
  buttonMargin: {
    marginRight: theme.spacing(2)
  },
  content: {
    flex: 1,
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  pinDeletePos: {
    margin: 0,
    top: "auto",
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    left: "auto",
    position: "absolute"
  }
}))

// Slide Transition for the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BulletinDetailsDialog = (props) => {
  const { open, handleDialogClose, data, handleDelete, handlePin } = props
  const { title, body, category, date, senderId, image, id, pinned } = data //eslint-disable-line
  const { user } = useContext(UserContext)

  const classes = useStyles()

  const checkId = (userId, senderId) => {
    if (userId === senderId) {
      return true
    } else {
      return false
    }
  }

  const PinAndDelete = () => {
    return (
      <div className={classes.pinDeletePos}>
        {user.isAdmin ? <Button // Only check for admin for pins
          variant="contained"
          color="secondary"
          className={classes.buttonMargin}
          onClick={() => handlePin(data)}
        >{!pinned ? "Pin" : "Unpin"}</Button> : null}
        {checkId(user.id,senderId) || user.isAdmin ? <Button // Check if user is admin or current user owns the item
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(id, category)}
          startIcon={<DeleteIcon />}
        >Delete</Button> : null}
      </div>
    )
  }

  return (
    <div style={{ position: "relative" }}>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleDialogClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h5">
              {category}
            </Typography>

          </Toolbar>
        </AppBar>
        <div >
          {data.image != null // Renders image on items that have one
            ? <img src={getImageUrl(image)} className={classes.image} alt={title} />
            : null}
          <Typography component="h4" variant="h4" className={classes.title}>
            {title}
          </Typography>
          <Typography className={classes.content}>
            {body}
          </Typography>
          <PinAndDelete />
        </div>
      </Dialog>
    </div>
  )
}

export default BulletinDetailsDialog