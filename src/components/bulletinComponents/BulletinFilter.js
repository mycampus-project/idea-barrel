import React from "react"
import {
    Button,
    makeStyles,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    buttonMargin: {
        margin: theme.spacing(1)
    },
    center: {
        marginTop: theme.spacing(1),
        justifyContent: "center"
    },
}))

const BulletinFilter = (props) => {
    const { handleFilterClick } = props
    const classes = useStyles()

    return (
        <div className={classes.center}>
            <Button onClick={handleFilterClick} variant="contained" color="primary" className={classes.buttonMargin} value="Announcement">
                Announcement
                </Button>
            <Button onClick={handleFilterClick} variant="contained" color="primary" className={classes.buttonMargin} value="Info">
                Info
                </Button>
            <Button onClick={handleFilterClick} variant="contained" color="primary" className={classes.buttonMargin} value="Selling">
                Selling
                </Button>
            <Button onClick={handleFilterClick} variant="contained" color="primary" className={classes.buttonMargin} value="Renting">
                Renting
                </Button>

            <Button onClick={handleFilterClick} variant="contained" color="primary" className={classes.buttonMargin} value="None">
                No Filter
                </Button>
        </div>
    )
}

export default BulletinFilter