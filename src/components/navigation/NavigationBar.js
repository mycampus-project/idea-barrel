import "../../styles/nav-styles.css";
import React, { useState } from "react"
import { AppBar, Button, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import logo from "../../assets/logo_mycampus.webp"
import MenuIcon from "@material-ui/icons/Menu"
import { navigate } from "hookrouter";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  toolbar: {
    alignItems: 'flex-start',
    padding: theme.spacing(1),
    minHeight: "64px",
    flexGrow: 1
  },
  image: {
    flexGrow: 1,
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
      <AppBar position="fixed" style={{ zIndex: '100' }}>
        <Toolbar className={classes.toolbar}>
          <img src={logo} className={classes.image} onClick={() => handleNavigate("/")} alt="MyCampus Logo"/>
          <Typography variant="h6" className={classes.title}></Typography>
          {width < 670 // Breakpoint for view width of 670px. Smaller width renders only harmburger menu 
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
                <MenuItem onClick={() => handleNavigate("/calendar")}>Calendar</MenuItem>
                <MenuItem onClick={() => handleNavigate("/bulletin")}>Bulletin Board</MenuItem>
              </Menu>
            </div>
            : <div id="desktop-nav-items">
              <Button className={classes.desktopNav} onClick={() => handleNavigate("/")}>Home</Button>
              <Button className={classes.desktopNav} onClick={() => handleNavigate("/idea-barrel")}>Idea Barrel</Button>
              <Button className={classes.desktopNav} onClick={() => handleNavigate("/events")}>Events</Button>
              <Button className={classes.desktopNav} onClick={() => handleNavigate("/calendar")}>Calendar</Button>
              <Button className={classes.desktopNav} onClick={() => handleNavigate("/bulletin")}>Bulletin Board</Button>
            </div>}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
};

export default NavigationBar;
