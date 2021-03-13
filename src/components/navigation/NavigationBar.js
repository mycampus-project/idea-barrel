import "../../styles/nav-styles.css";
import React, { useState } from "react"
import NavigationItem from "./NavigationItem";
import { AppBar, Button, Grid, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import logo from "../../assets/logo_mycampus.webp"
import MenuIcon from "@material-ui/icons/Menu"
import { navigate } from "hookrouter";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    flexGrow: 1
  },
  image: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
    padding: theme.spacing(2),
    maxWidth: 160
  },
  title: {
    flexGrow: 1
  },
  menuButton: {
    color: "#FFFFFF",
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  offset: theme.mixins.toolbar,
  desktopNav: {
    padding: theme.spacing(2),
    flexGrow: 1,
    color: "#FFFFFF"

  }
}))

const NavigationBar = () => {
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
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <img src={logo} className={classes.image} onClick={() => handleNavigate("/")} />
          <Typography variant="h6" className={classes.title}></Typography>
          {width < 730 // Breakpoint for view width of 730px. Smaller width renders only harmburger menu 
            ? <div>
              <IconButton className={classes.menuButton} onClick={handleMenuClick} aria-haspopup="true">
                <MenuIcon />
              </IconButton>
              <Menu
                id="nav-menu"
                anchorEl={open}
                keepMounted open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "bottom", horizontal: "right" }} >
                <MenuItem onClick={() => handleNavigate("/")}>Home</MenuItem>
                <MenuItem onClick={() => handleNavigate("/idea-barrel")}>Idea Barrel</MenuItem>
                <MenuItem onClick={() => handleNavigate("/events")}>Events</MenuItem>
                <MenuItem onClick={() => handleNavigate("/bulletin")}>Bulletin Board</MenuItem>
              </Menu>
            </div>
            : <div id="desktop-nav-items">
              <Button className={classes.desktopNav}>Home</Button>
              <Button className={classes.desktopNav}>Idea Barrel</Button>
              <Button className={classes.desktopNav}>Events</Button>
              <Button className={classes.desktopNav}>Bulletin Board</Button>
            </div>}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
};

export default NavigationBar;
