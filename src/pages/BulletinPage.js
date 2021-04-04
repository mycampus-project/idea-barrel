import { Fab } from "@material-ui/core"; //eslint-disable-line
import React, { useContext, useEffect, useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import { navigate } from "hookrouter";
import BackendAPI from "../api/BackendAPI"
import FullscreenDialog from "../components/bulletinComponents/FullscreenDialog.js"
import BulletinListItem from "../components/bulletinComponents/BulletinListItem"
import PinnedItemsList from "../components/bulletinComponents/PinnedItemsList"
import { SnackbarContext } from "../contexts/SnackbarContext"

const {
  fetchBulletinsAsync,
  deleteBulletinAsync,
  updateBulletinAsync
} = BackendAPI();

const BulletinPage = () => {
  const { setSnackbar } = useContext(SnackbarContext)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogData, setDialogData] = useState("")
  const [bulletins, setBulletins] = useState([])
  const [pinned, setPinned] = useState([])

  const getBulletins = async () => {
    try {
      const response = await fetchBulletinsAsync(); // Data array
      console.log(response);
      const pins = response.filter(item => item.pinned === true)
      const rest = response.filter(item => item.pinned === false)
      console.log(pins)
      setPinned(pins)
      setBulletins(rest);
    } catch (e) {
      console.log("error fetching bulletins");
      setSnackbar("There was an error fetching bulletins", 0, 5000)
      console.log(e);
    }
  };

  useEffect(() => {
    getBulletins()
  }, []) //eslint-disable-line

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
  const handleDelete = async (id, category) => {
    try {
      const del = await deleteBulletinAsync(id, category).then((res) => {
        if (res.status === 200) {
          setSnackbar("Bulletin Deleted!", 3, 5000)
          const newArray = bulletins.filter(item => item.id !== id)
          setBulletins(newArray)
          setDialogOpen(false)
        }
      })
      console.log(del);
    } catch (e) {
      console.log(e);
    }
  }
  // Handles the pinning event. Have to use location.reload() since updating states
  // didn't really work so well. Pinning is rare enough so the extra api call isn't 
  // bad.
  const handlePin = async (data) => {
    try {
      switch (data.pinned) {
        case true: // UNPIN
          data.pinned = false
          await updateBulletinAsync(data).then((res) => {
            if (res.status === 200) {
              window.location.reload()
              setSnackbar("Bulletin Unpinned!", 3, 5000)
            } else {
              setSnackbar("Something went wrong with unpin", 0, 5000)
            }
          })
          break
        case false: // PIN
          data.pinned = true
          await updateBulletinAsync(data).then((res) => {
            if (res.status === 200) {
              window.location.reload()
              setSnackbar("Bulletin Pinned!", 3, 5000)
            } else {
              setSnackbar("Something went wrong with pinning", 0, 5000)
            }
          })
          break
        default:
      }
    } catch (e) {
      console.log(e)
    }
  }

  const listItem = bulletins.map((d) =>
    <li onClick={() => handleDialogOpen(d)} key={d.id}><BulletinListItem data={d} handleDelete={handleDelete} /></li>)

  return (
    <div>
      <div>
        {pinned.length > 0 ? <PinnedItemsList pinnedItems={pinned} handleDelete={handleDelete} handleDialogOpen={handleDialogOpen} /> : null}
      </div>
      <div>
        <h1 style={{textAlign:"center"}}>Bulletins</h1>
      </div>
      <ul>
        {listItem}
      </ul>
      <Fab color="primary" aria-label="add" style={{ margin: 0, top: "auto", right: 16, bottom: 16, left: "auto", position: "fixed" }} onClick={() => createBulletinNav()}>
        <AddIcon />
      </Fab>
      <FullscreenDialog open={dialogOpen} handlePin={handlePin} handleDialogClose={handleDialogClose} data={dialogData} handleDelete={handleDelete} ></FullscreenDialog>
    </div>
  );
};

export default BulletinPage;
