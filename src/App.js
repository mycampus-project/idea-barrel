import "./App.css";
import Router from "./components/navigation/Router";
import NavigationBar from "./components/navigation/NavigationBar";
import { SnackbarContainer } from "./contexts/SnackbarContext";
import SnackbarUtil from "./components/Snackbar";
import { CssBaseline } from "@material-ui/core";

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
