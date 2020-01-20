import React from "react";
import {
  AppBar,
  Typography,
  Button,
  makeStyles,
  Toolbar
} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import "./App.css";
import CompareArtistPage from "./screens/comparison/artist/compareArtistPage";
import StatsPage from "./screens/stats/statsPage";
import HomePage from "./screens/home/homePage";

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

  return (
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
            <Button color="inherit" href="/compare/artist">
              Comparaison
            </Button>
            <Button color="inherit" href="/stats">
              Stats
            </Button>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route
            exact
            path="/compare/artist/"
            render={props => <CompareArtistPage {...props} />}
          ></Route>
          <Route exact path="/stats">
            <StatsPage />
          </Route>
          <Route
            exact
            path="/compare/artist/:name"
            render={props => <CompareArtistPage {...props} />}
          ></Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </div>
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
