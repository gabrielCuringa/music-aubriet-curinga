import React, { createContext, useReducer, useContext } from "react";
import { AppBar, Typography } from "@material-ui/core";
import Chart from "react-google-charts";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Link
} from "react-router-dom";
import "./App.css";
import ComparePage from "./screens/comparison/comparePage";
import ComparisonArtistsPage from "./screens/comparison/artists/compareArtistsPage";
import StateContext from "./stateContext";

const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={reducer}>{children}</StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);

// export const mapDispatchToProps = dispatch => {
//   return {
//     // dispatching plain actions
//     showLoader: () => dispatch({ type: "show_loader" }),
//     hideLoader: () => dispatch({ type: "hide_loader" })
//   };
// };

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

const App = props => {
  const initialState = { isFetching: false };
  const [state, dispatch] = useReducer(loaderReducer, initialState);

  return (
    <StateProvider initialState={initialState} reducer={{ dispatch }}>
      <div className="App">
        <Router>
          <AppBar position="static">
            <Typography variant="h6">
              Projet web - Kevin Aubriet, Gabriel Curinga
            </Typography>
          </AppBar>
          <Switch>
            <Route exact path="/">
              <Link to="/compare">Comparaison</Link>
            </Route>
            <Route exact path="/compare">
              <ComparePage />
              {/* <ComparisonArtistsPage />
              <Chart
                width={"500px"}
                height={"300px"}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[]}
                options={{
                  title: "Lengths of dinosaurs, in meters",
                  legend: { position: "none" },
                  colors: ["#e7711c"],
                  histogram: { lastBucketPercentile: 5 },
                  vAxis: { scaleType: "mirrorLog" }
                }}
                rootProps={{ "data-testid": "3" }}
              /> */}
            </Route>
            <Route exact path="/compare/:first/and/:second">
              <ComparisonArtistsPage />
            </Route>
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
