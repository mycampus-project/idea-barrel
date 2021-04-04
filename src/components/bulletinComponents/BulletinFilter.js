import React from "react"
import {
    Button,
    makeStyles
  } from "@material-ui/core";


  const useStyles = makeStyles((theme) => ({
    buttonMargin: {
        margin: theme.spacing(1)
    },
    center: {
        textAlign: "center",
        paddingTop: theme.spacing(1)
    }
  }))

const BulletinFilter = (props) => {

    const classes = useStyles()

    return (
        <div className={classes.center}>
            <Button variant="contained" color="primary" className={classes.buttonMargin}>Announcnement</Button>
            <Button variant="contained" color="primary" className={classes.buttonMargin}>Info</Button>
            <Button variant="contained" color="primary" className={classes.buttonMargin}>Selling</Button>
            <Button variant="contained" color="primary" className={classes.buttonMargin}>Renting</Button>
        </div>
    )
}

export default BulletinFilter