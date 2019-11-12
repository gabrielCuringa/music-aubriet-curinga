import React from "react";
import { AppBar, Typography } from "@material-ui/core";
import Chart from "react-google-charts";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import "./App.css";

import * as artistApi from "./services/artistApi";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistsWithMostBand: []
    };
  }

  async getArtistsWithMostBand() {
    let result = await artistApi.getartistsWithMostBand();
    console.log(result);
    this.setState({
      artistsWithMostBand: result
    });
  }

  componentDidMount() {
    this.getArtistsWithMostBand();
  }

  render() {
    const artistsWithMostBand =
      this.state.artistsWithMostBand.length > 0 &&
      this.state.artistsWithMostBand[0].membername;
    const datas = this.state.artistsWithMostBand.map((el, index) => {
      return [el.membername, el.sum];
    });
    datas.unshift(["a", "b"]);
    return (
      <div className="App">
        <Router>
          <Switch>
            <AppBar position="static">
              <Typography variant="h6">
                Projet web - Kevin Aubriet, Gabriel Curinga
              </Typography>
            </AppBar>

            <Route exact path="/" />
            <Route exact path="/comparison/artists">
              <Chart
                width={"500px"}
                height={"300px"}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={datas}
                options={{
                  title: "Lengths of dinosaurs, in meters",
                  legend: { position: "none" },
                  colors: ["#e7711c"],
                  histogram: { lastBucketPercentile: 5 },
                  vAxis: { scaleType: "mirrorLog" }
                }}
                rootProps={{ "data-testid": "3" }}
              />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

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
