import { makeStyles, Dialog, AppBar, Toolbar, Slide, IconButton, Typography, Button, TextField, Select } from "@material-ui/core"; //eslint-disable-line
import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BackendAPI from "../../api/BackendAPI";
import { UserContext } from "../../contexts/UserContext"
import { SnackbarContext } from "../../contexts/SnackbarContext"
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    minHeight: "64px",
    padding: theme.spacing(1),
    
  },

  root: {
    [theme.breakpoints.up("sm")]: {
      width: "50%",
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "5px",

    }
  },
  title: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    flex: 1
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    overflow: "hidden",
  },
  padding: {
    padding: theme.spacing(1)
  },
  buttonMargin: {
    marginRight: theme.spacing(2)
  },
  subHeader: {
    marginLeft: theme.spacing(2),

  },
  content: {
    flex: 1,
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  separator: {
    margin: theme.spacing(2),
    backgroundColor: "lightGrey",
    height: "1px",
  },
  editText: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "90%"
  },
  pinDeletePos: {
    margin: 0,
    top: "auto",
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    left: "auto",
    position: "absolute"
  },
  formControl: {
    paddingTop: theme.spacing(1),
  },
  acceptBtn: {
    backgroundColor: "#00db1a",
    color: "white"
  },
  acceptBtnDisabled: {
    backgroundColor: "#b5b2aa",
    color: "white"
  }
}))

// Slide Transition for the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BulletinDetailsDialog = (props) => {
  const { open, handleDialogClose, data, handleDelete, handlePin } = props
  const { title, body, category, date, senderId, image, id, pinned, senderName } = data //eslint-disable-line
  const { user } = useContext(UserContext)
  const { setSnackbar } = useContext(SnackbarContext)
  const [editMode, setEditMode] = useState(false)
  const [editState, setEditState] = useState({ title, body, category, date, senderId, image, id, pinned, senderName })
  const classes = useStyles()
  const {
    getImageUrl,
    updateBulletinAsync
  } = BackendAPI();

  useEffect(() => {
    setEditState({ title, body, category, date, senderId, image, id, pinned, senderName })
  }, []) // eslint-disable-line

  const checkId = (userId, senderId) => {
    if (userId === senderId) {
      return true
    } else {
      return false
    }
  }

  const enableEditMode = () => {
    setEditMode(true)
    setEditState({ title, body, category, date, senderId, image, id, pinned, senderName })
  }

  const disableEditMode = () => {
    setEditMode(false)
    setErrors({ title: false, body: false })
    setHelpers({ title: "", body: "" })
  }

  const determineEditMode = () => {
    if (editMode) {
      disableEditMode()
    } else {
      enableEditMode()
    }
  }
  // TODO DO THIS 
  const handleEditSubmit = () => {
    try {
      updateBulletinAsync(editState).then((res)=> {
        console.log(editState)
        console.log(res)
        if (res.status === 200){
          window.location.reload()
          setSnackbar("Updated bulletin!",3 , 5000)
        }
      })
    } catch (e) {
      setSnackbar(e, 0, 5000)
    }
    console.log("submit")
  }

  const updateField = e => {
    setEditState({
      ...editState,
      [e.target.id]: e.target.value
    })
  }

  // Disable edit state so it doesn't persist and close the dialog 
  const onClose = () => {
    disableEditMode()
    handleDialogClose()
  }

  const [errors, setErrors] = useState({ title: false, body: false })
  const [helpers, setHelpers] = useState({ title: "", body: "" })

  const updateHelperMsg = (helper, message) => {
    setHelpers({
      ...helpers,
      [helper]: message
    })
  }

  const updateErrorBool = (error, bool) => {
    setErrors({
      ...errors,
      [error]: bool
    })
  }

  const handleOnBlur = (event) => {
    switch (event.target.id) {
      case "title": {
        if (editState.title.length === 0) {
          updateErrorBool("title", true)
          updateHelperMsg("title", "Required")
        } else {
          updateErrorBool("title", false)
          updateHelperMsg("title", "")
        }
        break;

      }
      case "body": {
        if (editState.body.length === 0) {
          updateErrorBool("body", true)
          updateHelperMsg("body", "Required")
        } else {
          updateErrorBool("body", false)
          updateHelperMsg("body", "")
        }
        break;
      }
      default:
    }
  }

  const validate = () => {
    if (errors.title || errors.body === true) return true
  }

  const PinEditAndDelete = () => {
    return (
      <div className={classes.pinDeletePos}>
        {user.isAdmin ? <Button // Only check for admin for pins
          variant="contained"
          color="secondary"
          className={classes.buttonMargin}
          onClick={() => handlePin(data)}
        >{!pinned ? "Pin" : "Unpin"}</Button>
          : null}
        {checkId(user.id, senderId) || user.isAdmin ? <div><Button // Check if user is admin or current user owns the item
          variant="contained"
          color="secondary"
          style={{ marginRight: "10px" }} // Bit of inline margin to separate the buttons
          onClick={() => handleDelete(id, category)}
          startIcon={<DeleteIcon />}
        >Delete</Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: "10px" }}
            onClick={() => determineEditMode()}
            startIcon={<EditIcon />}
          >
            {editMode ? "Cancel" : "Edit"}
          </Button>
          {editMode ? <Button
            variant="contained"
            disabled={validate()}
            classes={{ root: classes.acceptBtn, disabled: classes.acceptBtnDisabled }}
            onClick={() => handleEditSubmit()}>
            Accept</Button> : null}
        </div>
          : null}
      </div>
    )
  }

  return (
    <div style={{ position: "relative" }}>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h5">{category} </Typography>

          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          {data.image != null // Renders image on items that have one
            ? <img src={getImageUrl(image)} className={classes.image} alt={title} />
            : null}

          {editMode ? <TextField className={classes.editText} value={editState.title} id="title" onChange={updateField} onBlur={handleOnBlur} error={errors.title} helperText={helpers.title} /> : <Typography component="h4" variant="h4" className={classes.title}>{title} </Typography>}

          <div className={classes.separator} />
          <Typography variant="subtitle1" color="textSecondary" className={classes.subHeader}>
            By: {senderName}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" className={classes.subHeader}>
            On: <Moment format="DD/MM/YYYY" date={date} /> at <Moment format="HH:mm" date={date} />
          </Typography>
          <div className={classes.separator} />
          {editMode ? <TextField className={classes.editText} value={editState.body} multiline rows={1} rowsMax={4} id="body" onChange={updateField} onBlur={handleOnBlur} error={errors.body} helperText={helpers.body}
          /> : <Typography className={classes.content}>{body}</Typography>}
          <PinEditAndDelete />
        </div>
      </Dialog>
    </div>
  )
}

export default BulletinDetailsDialog