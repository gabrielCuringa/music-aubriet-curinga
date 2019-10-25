import React from "react";
import Chart from "react-google-charts";
import logo from "./logo.svg";
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>HEROKU</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>{artistsWithMostBand}</p>
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
        </header>
      </div>
    );
  }
}

export default App;
