import React, { createContext, useReducer, useContext } from "react";
import {
  AppBar,
  Typography,
  Button,
  makeStyles,
  Toolbar
} from "@material-ui/core";
import Chart from "react-google-charts";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import "./App.css";
import ComparePage from "./screens/comparison/comparePage";
import StateContext from "./stateContext";
import HomePage from "./screens/home/homePage";
import testComponent from "./screens/components/testComponent";

const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={reducer}>{children}</StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);

const loaderReducer = (state = false, action) => {
  switch (action.type) {
    case "show_loader":
      return { isFetching: true };
    case "hide_loader":
      return { isFetching: false };
    default:
      throw new Error("Unexpected action");
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const App = props => {
  const classes = useStyles();
  const initialState = { isFetching: false };
  const [state, dispatch] = useReducer(loaderReducer, initialState);

  return (
    <StateProvider initialState={initialState} reducer={{ dispatch }}>
      <div className="App">
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Projet web - Kevin Aubriet, Gabriel Curinga
              </Typography>
              <Button color="inherit" href="/">
                Accueil
              </Button>
              <Button color="inherit" href="/compare">
                Comparaison
              </Button>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/compare">
              <ComparePage />
            </Route>
            <Route
              exact
              path="/compare/:name"
              component={testComponent}
            ></Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </div>
    </StateProvider>
  );
};

/**
 * No route
 */
function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <p>
        La page <code>{location.pathname}</code> n'existe pas.
        <a href="/">Vers l'accueil</a>
      </p>
    </div>
  );
}

export default App;
