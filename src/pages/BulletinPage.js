import { Card, CardHeader, CardMedia, CardContent, Typography, makeStyles, Fab } from "@material-ui/core"; //eslint-disable-line
import React from "react";
import AddIcon from '@material-ui/icons/Add';
import { navigate } from "hookrouter";


const mock_data = [
  {
    title: "Nike Shoes",
    image: "https://static.highsnobiety.com/thumbor/Na9LoUW3ldw_2gvzfLeck1sxnyM=/1200x720/static.highsnobiety.com/wp-content/uploads/2020/03/27174925/nike-best-feature.jpg",
    description: "old shoes. Still in good condition",
    category: "selling",
    date: "10.3.2021",
    user: "Matti",
    id: 123
  },
  {
    title: "Nike Shoes",
    image: "https://static.highsnobiety.com/thumbor/Na9LoUW3ldw_2gvzfLeck1sxnyM=/1200x720/static.highsnobiety.com/wp-content/uploads/2020/03/27174925/nike-best-feature.jpg",
    description: "old shoes. Still in good condition",
    category: "selling",
    date: "1.2.2021",
    user: "Jesse",
    id: 321
  },
  {
    title: "Nike Shoes",
    image: "https://static.highsnobiety.com/thumbor/Na9LoUW3ldw_2gvzfLeck1sxnyM=/1200x720/static.highsnobiety.com/wp-content/uploads/2020/03/27174925/nike-best-feature.jpg",
    description: "old shoes. Still in good condition",
    category: "selling",
    date: "5.7.2021",
    user: "Janne",
    id: 58293
  },
  {
    title: "Nike Shoes",
    image: "https://static.highsnobiety.com/thumbor/Na9LoUW3ldw_2gvzfLeck1sxnyM=/1200x720/static.highsnobiety.com/wp-content/uploads/2020/03/27174925/nike-best-feature.jpg",
    description: "old shoes. Still in good condition",
    category: "selling",
    date: "5.7.2021",
    user: "Janne",
    id: 84932
  },
  {
    title: "Nike Shoes",
    image: null,
    description: "old shoes. Still in good condition",
    category: "selling",
    date: "5.7.2021",
    user: "Janne",
    id: 5023423
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

  const classes = useStyles()

  const { title, image, description, category, date, user } = props.data //eslint-disable-line
  const byString = date + " by: " + user //eslint-disable-line
  return (
    <div>
      <Card className={classes.root}>
        {image != null
          ? <CardMedia className={classes.cover} image={image} />
          : <div></div>
        }
        <div className={classes.details}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            By:  {user}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {date}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {description}
          </Typography>
        </div>
      </Card>
    </div>
  )
}

const BulletinPage = () => {

  const listItem = mock_data.map((d) => <li onClick={() => handleNavigate(d)}><BulletinListItem data={d} /></li>)


  const handleNavigate = (data) => {
    navigate("/bulletin/"+ data.id)
  }

  const createBulletinNav = () => {
    navigate("/bulletin-create")
  }

  return (
    <div>
      <ul>
        {listItem}
      </ul>
      <Fab color="primary" aria-label="add" style={{ margin: 0, top: "auto", right: 16, bottom: 16, left: "auto", position: "fixed" }} onClick={() => createBulletinNav()}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default BulletinPage;
