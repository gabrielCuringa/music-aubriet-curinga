import React from "react";
import logo from "./logo.svg";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import * as api from "./services/api";
import "./App.css";

const URL_ARTIST = "/api/v1/artist";

class App extends React.Component {
  constructor(props) {
    super(props);
    // modele, equivalent du data de VueJS
    this.state = {
      artistsMostAlbums: [],
      search: ""
    };
  }

  componentDidMount() {
    this.getArtistWithMostAlbum(10);
  }

  classes = makeStyles({
    root: {
      width: "100%",
      overflowX: "auto"
    },
    table: {
      minWidth: 650
    }
  });
  rows = [
    this.createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    this.createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    this.createData("Eclair", 262, 16.0, 24, 6.0),
    this.createData("Cupcake", 305, 3.7, 67, 4.3),
    this.createData("Gingerbread", 356, 16.0, 49, 3.9)
  ];

  createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  async getArtistWithMostAlbum(limit) {
    const res = await api.get(URL_ARTIST + "/count/album/?limit=" + limit);
    console.log(res);

    this.setState({
      artistsMostAlbums: res
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>HEROKU</p>

          <Paper className={this.classes.root}>
            <Table className={this.classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell align="right">Nombre albums vendus</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.artistsMostAlbums.length > 0 &&
                  this.state.artistsMostAlbums.map(row => (
                    <TableRow key={row.name}>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="right">{row.sum}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </header>
      </div>
    );
  }
}

export default App;
