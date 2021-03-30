import { makeStyles, Dialog, AppBar, Toolbar, Slide, IconButton, Typography } from "@material-ui/core"; //eslint-disable-line
import React from "react";
import CloseIcon from "@material-ui/icons/Close"

// Slide Transition for the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullscreenDialog = (props) => {

  const { open, handleDialogClose, data } = props

  const {title, body, category, date, senderId, image, id} = data //eslint-disable-line

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
      aspectRatio: 2/1,
      overflow: "hidden",
    },
    padding: {
      padding: theme.spacing(1)
    }, 
    content: {
      flex:1,
      paddingLeft: theme.spacing(1),
      paddingTop: theme.spacing(2)
    }

  }))

  const classes = useStyles()

  return (
    <div>
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
          {data.image != null
            ? <img src={image} className={classes.image}  alt={title}/>
            : null
          }
          <Typography component="h4" variant="h4" className={classes.title}>
            {title}
          </Typography>
          <Typography className={classes.content}>
            {body}
          </Typography>
        </div>
      </Dialog>
    </div>
  )
}

export default FullscreenDialog