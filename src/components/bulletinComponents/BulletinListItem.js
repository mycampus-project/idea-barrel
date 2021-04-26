import { Card, CardMedia, Typography, makeStyles } from "@material-ui/core"; //eslint-disable-line
import RoomIcon from '@material-ui/icons/Room';
import React, { useEffect } from "react";
import Moment from "react-moment";
import BackendAPI from "../../api/BackendAPI";

const {
  getImageUrl
} = BackendAPI();

const BulletinListItem = (props) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex"
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 120,
      height: 120,
      marginTop:"auto",
      marginBottom: "auto"
    },
    row: {
      display: "flex",
      flexDirection: "row",
    },
    boxPadding: {
      marginLeft: 25
    },
    highlighted: {
      backgroundColor: "#80d2ff",
      display: "flex",
      flexDirection: "row",
    },
    pinPos: {
      margin: 0,
      top: "auto",
      right: theme.spacing(1),
      bottom: theme.spacing(1),
      left: "auto",
      position: "absolute"
    },
    position: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    }
  }))

  const classes = useStyles()

  const { title, image, body, category, date, senderId, id, pinned, senderName } = props.data //eslint-disable-line

  useEffect(() => {
    console.log(props.data)
  }, []); //eslint-disable-line
  return (
    <div style={{ position: "relative" }}>
      <Card className={!pinned ? classes.row : classes.highlighted} >
        {image != null
          ? <CardMedia className={classes.cover} image={getImageUrl(image)} />
          : <div></div>
        }
        <div className={classes.details}>
          <Typography component="h4" variant="h4" className={classes.position}>
            {title}
          </Typography>
          <Typography component="h6" variant="h6" className={classes.position}>
            {category}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.position}>
            By: {senderName}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" className={classes.position}>
            <Moment format="DD/MM/YYYY" date={date} /> at <Moment format="HH:mm" date={date} />
          </Typography>
        </div>
        <div className={classes.pinPos}>
          {!pinned ? null : <RoomIcon />}
        </div>
      </Card>
    </div>
  )
}
export default BulletinListItem