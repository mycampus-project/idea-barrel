import {  Fab } from "@material-ui/core"; //eslint-disable-line
import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import { navigate } from "hookrouter";
import FullscreenDialog from "../components/bulletinComponents/FullscreenDialog.js"
import BulletinListItem from "../components/bulletinComponents/BulletinListItem"

const mock_data = [
  {
    title: "Parking 5 closed for maintanance",
    image: null,
    description: "old shoes. Still in good condition",
    category: "Announcement",
    date: "1.2.2021",
    user: "Jussi Hepo",
    id: 321
  },
  {
    title: "Nike Shoes",
    image: "https://static.highsnobiety.com/thumbor/Na9LoUW3ldw_2gvzfLeck1sxnyM=/1200x720/static.highsnobiety.com/wp-content/uploads/2020/03/27174925/nike-best-feature.jpg",
    description: "old shoes. Still in good condition",
    category: "Renting",
    date: "5.7.2021",
    user: "Janne",
    id: 58293
  },
  {
    title: "Nike Shoes",
    image: "https://static.highsnobiety.com/thumbor/Na9LoUW3ldw_2gvzfLeck1sxnyM=/1200x720/static.highsnobiety.com/wp-content/uploads/2020/03/27174925/nike-best-feature.jpg",
    description: "old shoes. Still in good condition",
    category: "Selling",
    date: "5.7.2021",
    user: "Janne",
    id: 84932
  },
  {
    title: "Free candy",
    image: null,
    description: "old shoes. Still in good condition",
    category: "Info",
    date: "5.7.2021",
    user: "Jukka",
    id: 5023423
  },
  {
    title: "Nike Shoes",
    image: null,
    description: "old shoes. Still in good condition",
    category: "Info",
    date: "5.7.2021",
    user: "Janne",
    id: 90990
  },

]

const BulletinPage = () => {

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogData, setDialogData] = useState("")
  
  const handleDialogOpen = (data) => {
    setDialogData(data)
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const createBulletinNav = () => {
    navigate("/bulletin-create")
  }

  const listItem = mock_data.map((d) =>
   <li onClick={() => handleDialogOpen(d)} key={d.id}><BulletinListItem data={d} /></li>)


  return (
    <div>
      <ul>
        {listItem}
      </ul>
      <Fab color="primary" aria-label="add" style={{ margin: 0, top: "auto", right: 16, bottom: 16, left: "auto", position: "fixed" }} onClick={() => createBulletinNav()}>
        <AddIcon />
      </Fab>
      <FullscreenDialog open={dialogOpen} handleDialogClose={handleDialogClose} data={dialogData} ></FullscreenDialog>
    </div>
  );
};

export default BulletinPage;
