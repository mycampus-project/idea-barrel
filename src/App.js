import "./App.css";
import Router from "./components/navigation/Router";
import NavigationBar from "./components/navigation/NavigationBar";
import { SnackbarContainer } from "./contexts/SnackbarContext";
import { UserContainer } from "./contexts/UserContext"
import SnackbarUtil from "./components/Snackbar";
import { CssBaseline } from "@material-ui/core";

function App() {


  return (
    <div>
      <UserContainer>
      <CssBaseline />
      <div style={{ paddingBottom: "16px" }}>
        <NavigationBar></NavigationBar>
      </div>
      <SnackbarContainer>
        <div id="main-content">
          <Router></Router>
          <SnackbarUtil />
        </div>
      </SnackbarContainer>
      </UserContainer>
    </div>
  );
}

export default App;
