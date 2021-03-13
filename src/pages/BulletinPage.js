import { Card, CardHeader, CardMedia, CardContent, Typography, makeStyles } from "@material-ui/core"; //eslint-disable-line
import React from "react";


const mock_data = [
  {
    title: "Nike Shoes",
    image: "https://static.highsnobiety.com/thumbor/Na9LoUW3ldw_2gvzfLeck1sxnyM=/1200x720/static.highsnobiety.com/wp-content/uploads/2020/03/27174925/nike-best-feature.jpg",
    description: "old shoes. Still in good condition",
    category: "selling",
    date: "10.3.2021",
    user: "Matti"
  },
  {
    title: "Nike Shoes",
    image: "https://static.highsnobiety.com/thumbor/Na9LoUW3ldw_2gvzfLeck1sxnyM=/1200x720/static.highsnobiety.com/wp-content/uploads/2020/03/27174925/nike-best-feature.jpg",
    description: "old shoes. Still in good condition",
    category: "selling",
    date: "1.2.2021",
    user: "Jesse"
  },
  {
    title: "Nike Shoes",
    image: "https://static.highsnobiety.com/thumbor/Na9LoUW3ldw_2gvzfLeck1sxnyM=/1200x720/static.highsnobiety.com/wp-content/uploads/2020/03/27174925/nike-best-feature.jpg",
    description: "old shoes. Still in good condition",
    category: "selling",
    date: "5.7.2021",
    user: "Janne"
  },
  {
    title: "Nike Shoes",
    image: "https://static.highsnobiety.com/thumbor/Na9LoUW3ldw_2gvzfLeck1sxnyM=/1200x720/static.highsnobiety.com/wp-content/uploads/2020/03/27174925/nike-best-feature.jpg",
    description: "old shoes. Still in good condition",
    category: "selling",
    date: "5.7.2021",
    user: "Janne"
  },

]

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
  }))

  const classes  = useStyles()

  const { title, image, description, category, date, user } = props.data //eslint-disable-line
  const byString = date + " by: " + user //eslint-disable-line

  

  return(
    <div>
      <Card className={classes.root}>
        <CardMedia className={classes.cover} image={image}/>
        <div className={classes.details}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {user}
          </Typography>
        </div>
      </Card>
    </div>
  )

/*
  return (
    <div>
      <Card>
        <CardHeader title={title} subheader={byString} />
        <CardMedia component="img" src={image} title={title} height="140" />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
  */
}

const BulletinPage = () => {

  const listItem = mock_data.map((d) => <li><BulletinListItem data={d} /></li>)


  return (
    <div>
      <ul>
        {listItem}
      </ul>
    </div>
  );
};

export default BulletinPage;
