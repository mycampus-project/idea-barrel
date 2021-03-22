import "./App.css";
import Router from "./components/navigation/Router";
import NavigationBar from "./components/navigation/NavigationBar";
import { CssBaseline } from "@material-ui/core";

function App() {
  return (
    <div>
      <CssBaseline />
      <div style={{paddingBottom: "16px"}}>
        <NavigationBar></NavigationBar>
      </div>
      <div id="main-content">
        <Router></Router>
      </div>
    </div>
  );
}

export default App;
