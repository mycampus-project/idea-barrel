import { Card, CardHeader, CardMedia, CardContent, Typography } from "@material-ui/core";
import React, {useEffect, useState} from "react";


const mock_data = [
  {
    title: "Nike Shoes",
    image: "https://static.highsnobiety.com/thumbor/Na9LoUW3ldw_2gvzfLeck1sxnyM=/1200x720/static.highsnobiety.com/wp-content/uploads/2020/03/27174925/nike-best-feature.jpg",
    description: "old shoes. Still in good condition",
    category: "selling",
    date: "10.3.2021",
    user:"Matti"
  }, 
  {
    title: "Nike Shoes",
    image: "https://static.highsnobiety.com/thumbor/Na9LoUW3ldw_2gvzfLeck1sxnyM=/1200x720/static.highsnobiety.com/wp-content/uploads/2020/03/27174925/nike-best-feature.jpg",
    description: "old shoes. Still in good condition",
    category: "selling",
    date:"1.2.2021",
    user:"Jesse"
  },
  {
    title: "Nike Shoes",
    image: "https://static.highsnobiety.com/thumbor/Na9LoUW3ldw_2gvzfLeck1sxnyM=/1200x720/static.highsnobiety.com/wp-content/uploads/2020/03/27174925/nike-best-feature.jpg",
    description: "old shoes. Still in good condition",
    category: "selling",
    date:"5.7.2021",
    user:"Janne"
  },  
  {
    title: "Nike Shoes",
    image: "https://static.highsnobiety.com/thumbor/Na9LoUW3ldw_2gvzfLeck1sxnyM=/1200x720/static.highsnobiety.com/wp-content/uploads/2020/03/27174925/nike-best-feature.jpg",
    description: "old shoes. Still in good condition",
    category: "selling",
    date:"5.7.2021",
    user:"Janne"
  }, 

]

const BulletinListItem = (props) => {

  const {title, image, description, category, date, user} = props.data
  const byString = date + " by: " + user

  console.log(props)

  return(
    <div>
      <Card>
        <CardHeader title={title} subheader={byString}/>
        <CardMedia component="img" src={image} title={title} height="140"/>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
} 

const BulletinPage = () => {

  const listItem = mock_data.map((d)=> <li><BulletinListItem data={d}/></li>)


  return (
    <div>
      <ul>
        {listItem}
      </ul>
    </div>
  );
};

export default BulletinPage;
