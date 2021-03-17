import { makeStyles, Dialog,Button, AppBar, Toolbar, Slide, IconButton, Typography } from "@material-ui/core"; //eslint-disable-line
import React from "react";
import CloseIcon from "@material-ui/icons/Close"

// Slide Transition for the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const FullscreenDialog = (props) => {

    const {open, handleDialogClose, data} = props
    
    const useStyles = makeStyles((theme)=> ({
      appBar: {
        position: "relative",
        minHeight: "64px",
        padding: theme.spacing(1)
      },
      title: {
        marginLeft : theme.spacing(2),
        flex: 1
      }
    }))

    const classes = useStyles()

    return (
      <div>
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleDialogClose} aria-label="close">
                <CloseIcon/>
              </IconButton>
              <Typography variant="h5" className={classes.title}>
                {data.category}
              </Typography>
         
            </Toolbar>
          </AppBar>
          <div>
              {JSON.stringify(data)}
          </div>
        </Dialog>
      </div>
    )
  }

  export default FullscreenDialog