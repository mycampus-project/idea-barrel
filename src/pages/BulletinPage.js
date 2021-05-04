import React, { useContext, useEffect, useState } from "react";
import { Fab, makeStyles } from "@material-ui/core"; //eslint-disable-line
import AddIcon from "@material-ui/icons/Add";
import BackendAPI from "../api/BackendAPI";
import BulletinDetailsDialog from "../components/bulletinComponents/BulletinDetailsDialog.js";
import BulletinListItem from "../components/bulletinComponents/BulletinListItem";
import BulletinFilter from "../components/bulletinComponents/BulletinFilter";
import CreateBulletinDialog from "../components/bulletinComponents/CreateBulletinDialog";
import { SnackbarContext } from "../contexts/SnackbarContext";
import { UserContext } from "../contexts/UserContext"

const {
  fetchBulletinsAsync,
  deleteBulletinAsync,
  updateBulletinAsync,
} = BackendAPI();

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("lg")]: {
      width: "50%",
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "5px",
    }
  },
  listItem: {
  }

}))


const BulletinPage = () => {

  const classes = useStyles()
  const { user  } = useContext(UserContext)
  const [tempUser, setTempUser] = useState({email: "default",
  fName: "default",
  id: "defauly",
  isAdmin: false,
  lName: "default",
  _attachments: "default",
  _etag: "default",
  _rid: "default",
  _self: "default",
  _ts: 1615660487})
  const { setSnackbar } = useContext(SnackbarContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState("");
  const [bulletins, setBulletins] = useState([]);
  const [filter, setFilter] = useState("None"); //eslint-disable-line
  const [createDialog, setCreateDialog] = useState(false);

  const sortBulletinArray = (data) => {
    const pins = data.filter((item) => item.pinned === true);
    const rest = data.filter((item) => item.pinned === false || item.pinned === undefined); // fixes if the the pinned is property is missing
    const complete = [...pins, ...rest]; // Sets the pinned items to the start of the array first
    return complete;
  };

  const getBulletins = async () => {
    try {
      const response = await fetchBulletinsAsync(); // Data array
      const complete = sortBulletinArray(response);
      setBulletins(complete);
    } catch (e) {
      setSnackbar("There was an error fetching bulletins", 0, 5000);
    }
  };

  const userFromLocal = async () => {
    const localStorageUserGet = window.localStorage.getItem("user")
    if (localStorageUserGet != null || undefined) {
      const parse = JSON.parse(localStorageUserGet)
      return parse
    } else {
      console.log("not setting from local");
    }
  }
  useEffect(()=>{
    userFromLocal().then((it)=> {
      console.log(it);
      setTempUser(it)
    })
    console.log("CTX user");
    console.log(user);
  },[tempUser.id])//eslint-disable-line

  useEffect(() => {
    getBulletins();
  }, []); //eslint-disable-line

  const handleDialogOpen = (data) => {
    setDialogData(data);
    setDialogOpen(true);
  };

  const handleCreateDialogOpen = () => {
    setCreateDialog(true);
  };

  const handleDialogClose = () => setDialogOpen(false);
  const handleCreateClose = () => setCreateDialog(false);
  const createBulletinNav = () => handleCreateDialogOpen();

  // Handle bulletin delete
  const handleDelete = async (id, category) => {
    try {
      await deleteBulletinAsync(id, category).then((res) => {
        if (res.status === 200) {
          setSnackbar("Bulletin Deleted!", 3, 5000);
          const newArray = bulletins.filter((item) => item.id !== id);
          const complete = sortBulletinArray(newArray);
          setBulletins(complete);
          setDialogOpen(false);
        }
      });
    } catch (e) {
      setSnackbar(e, 0, 5000);
    }
  };
  // Handles the pinning event. Have to use location.reload() since updating states
  // didn't really work so well. Pinning is rare enough so the extra api call isn't
  // bad.
  const handlePin = async (data) => {
    try {
      switch (data.pinned) {
        case true: // UNPIN
          data.pinned = false;
          await updateBulletinAsync(data).then((res) => {
            if (res.status === 200) {
              window.location.reload();
              setSnackbar("Bulletin Unpinned!", 3, 5000);
            } else {
              setSnackbar("Something went wrong with unpin", 0, 5000);
            }
          });
          break;
        case false: // PIN
          data.pinned = true;
          await updateBulletinAsync(data).then((res) => {
            if (res.status === 200) {
              window.location.reload();
              setSnackbar("Bulletin Pinned!", 3, 5000);
            } else {
              setSnackbar("Something went wrong with pinning", 0, 5000);
            }
          });
          break;
        default:
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Just sets the filter to the clicked button
  const handleFilterClick = (event) => {
    setFilter(event.currentTarget.value);
  };
  const filteredList = bulletins
    .filter((item) => item.category === filter)
    .map((d) => (
      <li onClick={() => handleDialogOpen(d)} key={d.id} className={classes.lis}>
        <BulletinListItem data={d} handleDelete={handleDelete} />
      </li>
    ));

  const listItem = bulletins.map((d) => (
    <li onClick={() => handleDialogOpen(d)} key={d.id} className={classes.listItem}>
      <BulletinListItem data={d} handleDelete={handleDelete} />
    </li>
  ));

  return (
    <div>
      <div className={classes.filters}>
        <BulletinFilter handleFilterClick={handleFilterClick} />
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}>Bulletins</h1>
      </div>
      <div>
        {filter === "None" ? <ul>{listItem}</ul> : <ul>{filteredList}</ul>}
      </div>
      <Fab
        color="primary"
        aria-label="add"
        style={{
          margin: 0,
          top: "auto",
          right: 16,
          bottom: 16,
          left: "auto",
          position: "fixed",
        }}
        onClick={() => createBulletinNav()}
      >
        <AddIcon />
      </Fab>
      <BulletinDetailsDialog
        open={dialogOpen}
        handlePin={handlePin}
        handleDialogClose={handleDialogClose}
        data={dialogData}
        handleDelete={handleDelete}
      />
      
      <CreateBulletinDialog
        open={createDialog}
        handleCreateClose={handleCreateClose}
        user={tempUser}
      />
    </div>
  );
};

export default BulletinPage;
