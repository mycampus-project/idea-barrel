import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles,FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import {  UserContext } from "../contexts/UserContext"
import BackendAPI from "../api/BackendAPI";


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    }
  }));

const UserDialog = (props) => {
    const { fetchUsersAsync,} = BackendAPI();
    const { user, setUser } = useContext(UserContext) // eslint-disable-line
    const [ users, setUsers] = useState([])
    const {open, handleUserDlgClose} = props
    const classes = useStyles();


    useEffect(() => {
        const getUsers = async () => {
          try {
            const response = await fetchUsersAsync();
            setUsers(response);
            console.log("Users:")
            console.log(response);
          } catch (e) {
            console.log("error fetching users");
            console.log(e);
          }
        };
       
        getUsers();
      }, []); // eslint-disable-line

    const handleUserChange = () => {

    }

    const makeUserString = (fname,lname, isAdmin) => {
        return `${fname} ${lname}. isAdmin: ${isAdmin}`
    }

    const listItem = users.map((u) => (
        <MenuItem value={u} key={u.id}>{makeUserString(u.fName, u.lName, u.isAdmin)}</MenuItem>
      )); 

    return(
        <div>
            <Dialog open={open} onClose={handleUserDlgClose} aria-labelledby="dialog-title">
                <DialogTitle id="dialog-title">Change application user</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Change the mock user being used in the application here
                    </DialogContentText>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="user-selector">User</InputLabel>
                        <Select autoFocus >
                             {listItem}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUserDlgClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUserChange} color="primary">
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default UserDialog