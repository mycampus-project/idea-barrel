import { Fab } from "@material-ui/core"; //eslint-disable-line
import React, { useContext, useEffect, useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import { navigate } from "hookrouter";
import BackendAPI from "../api/BackendAPI"
import FullscreenDialog from "../components/bulletinComponents/FullscreenDialog.js"
import BulletinListItem from "../components/bulletinComponents/BulletinListItem"
import { SnackbarContext} from "../contexts/SnackbarContext"

const {
  fetchBulletinsAsync, 
  deleteBulletinAsync,
} = BackendAPI();

const BulletinPage = () => {
  const { setSnackbar } = useContext(SnackbarContext)
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

  useEffect(() => {
    getBulletins()
  }, [])

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
  const handleDelete = async(id, category) => {
    try {
      const del = await deleteBulletinAsync(id, category).then((res)=>{
        if(res.status===200){
          setSnackbar("Bulletin Deleted!", 3,5000)

        }
      })
      console.log(del);
    } catch (e) {
      console.log(e);
    }
  }

  const listItem = bulletins.map((d) =>
    <li onClick={() => handleDialogOpen(d)} key={d.id}><BulletinListItem data={d} handleDelete={handleDelete} /></li>)

  return (
    <div>
      <ul>
        {listItem}
      </ul>
      <Fab color="primary" aria-label="add" style={{ margin: 0, top: "auto", right: 16, bottom: 16, left: "auto", position: "fixed" }} onClick={() => createBulletinNav()}>
        <AddIcon />
      </Fab>
      <FullscreenDialog open={dialogOpen} handleDialogClose={handleDialogClose} data={dialogData}handleDelete={handleDelete} ></FullscreenDialog>
    </div>
  );
};

export default BulletinPage;
