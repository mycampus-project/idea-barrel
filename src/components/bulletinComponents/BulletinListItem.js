import { Card, CardMedia, Typography, makeStyles } from "@material-ui/core"; //eslint-disable-line
import React from "react";

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
      height: 120
    },
    row: {
      display: "flex",
      flexDirection: "row",
    },
    boxPadding: {
      marginLeft: 25
    }
  }))

  const classes = useStyles()

  const { title, image, body, category, date, senderId } = props.data //eslint-disable-line

  return (
    <div>
      <Card className={classes.row}>
        {image != null
          ? <CardMedia className={classes.cover} image={image} />
          : <div></div>
        }
        <div className={classes.details}>
          <Typography component="h4" variant="h4" className={classes.posiotion}>
            {category}
          </Typography>
          <Typography component="h6" variant="h6" className={classes.posiotion}>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
           By: {senderId}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {date}
          </Typography>
        </div>
      </Card>
    </div>
  )
}
export default BulletinListItem