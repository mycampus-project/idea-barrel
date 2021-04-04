import { makeStyles, Dialog, AppBar, Toolbar, Slide, IconButton, Typography, Button } from "@material-ui/core"; //eslint-disable-line
import React from "react";
import CloseIcon from "@material-ui/icons/Close"
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    minHeight: "64px",
    padding: theme.spacing(1)
  },
  title: {
    marginLeft: theme.spacing(1),
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
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(2)
  },
  pinDeletePos:{
    margin: 0,
    top:"auto",
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
  const admin = true // Placeholder!!!
  const classes =  useStyles()

  const PinAndDelete = () => {
    return( 
      <div className={classes.pinDeletePos}>
        <Button
         variant="contained" 
         color="secondary" 
         className={classes.buttonMargin}
         onClick={()=> handlePin(data)}
         >{!pinned? "Pin": "Unpin"}</Button>
        <Button // If Admin: Render button. otherwise render nothing
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(id, category)}
              startIcon={<DeleteIcon />}
            >Delete</Button>
      </div>
    )
  }

  return (
    <div style={{position:"relative"}}>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleDialogClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" className={classes.title}>
              {category}
            </Typography>
            
          </Toolbar>
        </AppBar>
        <div >
          {data.image != null // Renders image on items that have one
            ? <img src={image} className={classes.image} alt={title} />
            : null }
          <Typography component="h4" variant="h4" className={classes.title}>
            {title}
          </Typography>
          <Typography className={classes.content}>
            {body}
          </Typography>
          {admin ?  <PinAndDelete/> : null }
        </div>
      </Dialog>
    </div>
  )
}

export default BulletinDetailsDialog