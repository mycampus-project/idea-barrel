import "../../styles/nav-styles.css";

import React, { useState } from "react"
import NavigationItem from "./NavigationItem";
import { AppBar, IconButton, makeStyles, Menu, MenuItem, Toolbar } from "@material-ui/core";
import logo from "../../assets/logo_mycampus.webp"
import MenuIcon from "@material-ui/icons/Menu"
import { navigate } from "hookrouter";

const NavigationBar = () => {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    image: {
      maxWidth: 100
    },
    title: {
      flexGrow: 1
    },
    menuButton: {
      marginLeft: theme.spacing(2),
      color: "#FFFFFF"
    }
  }))

  const classes = useStyles()
  const [open, setOpen] = useState(null)
  const [width, setWidth] = useState(window.innerWidth)

  const handleMenuClick = (event) => {
    setOpen(event.currentTarget)
  }
  const handleMenuClose = () => {
    setOpen(null)
  }

  const handleNavigate = (url) => {
    navigate(url, true)
    setOpen(null)
  }
  const updateWidth = () => {
    setWidth(window.innerWidth)
  }

  window.addEventListener("resize", updateWidth)
 


  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <img src={logo} className={classes.image} />

          {width < 500
            ? <div>
              <IconButton edge="end" className={classes.menuButton} onClick={handleMenuClick} aria-haspopup="true">
                <MenuIcon />
              </IconButton>
              <Menu id="nav-menu" anchorEl={open} keepMounted open={open} onClose={handleMenuClose} >
                <MenuItem onClick={() => handleNavigate("/")}>Home</MenuItem>
                <MenuItem onClick={() => handleNavigate("/idea-barrel")}>Idea Barrel</MenuItem>
                <MenuItem onClick={() => handleNavigate("/events")}>Events</MenuItem>
                <MenuItem onClick={() => handleNavigate("/bulletin")}>Bulletin Board</MenuItem>
              </Menu>
            </div>
            : <div>
              <NavigationItem url="/" title="Home" />
              <NavigationItem url="/idea-barrel" title="Idea Barrel" />
              <NavigationItem url="/events" title="Events" />
              <NavigationItem url="/bulletin" title="Bulletin Board" />
            </div>



          }


        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
