import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 400
  },
  tableHeader: {
    backgroundColor: "black"
  },
  tableCell: { color: "white", fontWeight: "Bold" }
});

export default function ListSongs(props) {
  const classes = useStyles();

  const playAudio = function(indexToPlay) {
    console.log("child : " + indexToPlay);
    const audioEl = document.getElementsByClassName("audio-element")[
      indexToPlay
    ];
    audioEl.play();
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="sticky table">
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <TableCell className={classes.tableCell}>Titre</TableCell>
            <TableCell align="right" className={classes.tableCell}>
              Rang Deezer
            </TableCell>
            <TableCell align="right" className={classes.tableCell}>
              Date de publication
            </TableCell>
            <TableCell align="right" className={classes.tableCell}>
              Preview
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.list.map((song, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {song.title}
              </TableCell>
              <TableCell align="right">{song.rank}</TableCell>
              <TableCell align="right">{song.publicationDate}</TableCell>
              <TableCell align="right">
                <div>
                  <button onClick={() => playAudio(i)}>
                    <span>Play Audio</span>
                  </button>
                  <audio className="audio-element">
                    <source src={song.preview}></source>
                  </audio>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
