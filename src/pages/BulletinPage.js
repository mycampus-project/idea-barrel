import {  Fab } from "@material-ui/core"; //eslint-disable-line
import React, { useEffect, useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import { navigate } from "hookrouter";
import BackendAPI from "../api/BackendAPI"
import FullscreenDialog from "../components/bulletinComponents/FullscreenDialog.js"
import BulletinListItem from "../components/bulletinComponents/BulletinListItem"

const {
  fetchBulletinsAsync,
} = BackendAPI();

const BulletinPage = () => {

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogData, setDialogData] = useState("")
  const [bulletins, setBulletins] = useState([])

  const getBulletins = async () => {
    try {
      const response = await fetchBulletinsAsync();
      console.log(response);
      setBulletins(response);
    } catch (e) {
      console.log("error fetching bulletins");
      console.log(e);
    }
  };

  useEffect(()=>{
    getBulletins()
  },[])
  
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

  const listItem = bulletins.map((d) =>
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
