import { Card, CardMedia, Typography, makeStyles,CardContent } from "@material-ui/core"; //eslint-disable-line
import RoomIcon from '@material-ui/icons/Room';
import React from "react";
import Moment from "react-moment";
import BackendAPI from "../../api/BackendAPI";

const {
  getImageUrl
} = BackendAPI();

const BulletinListItem = (props) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
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
    media: {
      height: 0,
      maxHeight: "200px",
      paddingTop: '56.25%', // 16:9
      marginTop:"auto",
      marginBottom: "auto",
      overflow:"hidden"
    },
    row: {
      flexDirection: "row",
      border: "1px solid",
      borderColor: theme.palette.primary.main
    },
    boxPadding: {
      marginLeft: 25
    },
    highlighted: {
      backgroundColor: theme.palette.info.light,
      display: "flex",
      flexDirection: "row",
      border: "1px solid",
      borderColor: theme.palette.primary.main
      
    },
    pinPos: {
      margin: 0,
      top: "auto",
      right: theme.spacing(1),
      bottom: theme.spacing(1),
      left: "auto",
      position: "absolute"
    },
    title: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      paddingTop: theme.spacing(2)
    }, 
    category: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    }, 
    sender: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    }, 
    date: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    }
  }))

  const classes = useStyles()

  const { title, image, body, category, date, senderId, id, pinned, senderName } = props.data //eslint-disable-line

  return (
    <div style={{ position: "relative" }}>
      <Card className={!pinned ? classes.row : classes.highlighted} >
        {image != null
          ? <CardMedia className={classes.media} image={getImageUrl(image)} />
          : null
        }
        <div className={classes.details}>
          <CardContent>
          <Typography component="h4" variant="h4" className={classes.title}>
            {title}
          </Typography>
          <Typography component="h6" variant="h6" className={classes.category}>
            {category}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.sender}>
            By: {senderName}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" className={classes.date}>
            <Moment format="DD/MM/YYYY" date={date} /> at <Moment format="HH:mm" date={date} />
          </Typography>
          </CardContent>
        </div>
        <div className={classes.pinPos}>
          {!pinned ? null : <RoomIcon />}
        </div>
      </Card>
    </div>
  )
}
export default BulletinListItem