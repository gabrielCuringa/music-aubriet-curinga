import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

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
  const [stateSongs, setStateSongs] = useState([]);

  useEffect(() => {
    console.log("je recharge");
    props.list.map(() => {
      setStateSongs(stateSongs => [...stateSongs, false]);
    });
  }, stateSongs.length);

  const play = function(indexToPlay) {
    console.log("child : " + indexToPlay);

    const audioEls = document.getElementsByTagName("audio");
    let renderAudio = [...stateSongs];
    for (var i = 0; i < audioEls.length; i++) {
      audioEls[i].pause();
      audioEls[i].load();
    }
    for (var j = 0; j < renderAudio.length; j++) {
      renderAudio[j] = false;
    }
    setStateSongs(renderAudio);

    const audioEl = document.getElementsByClassName("audio-element")[
      indexToPlay
    ];

    let newArr = [...stateSongs]; // copying the old datas array
    newArr[indexToPlay] = true; // replace e.target.value with whatever you want to change it to

    setStateSongs(newArr);

    audioEl.play();
  };
  const pause = function(indexToPause) {
    console.log("child : " + indexToPause);
    const audioEl = document.getElementsByClassName("audio-element")[
      indexToPause
    ];
    let newArr = [...stateSongs]; // copying the old datas array
    newArr[indexToPause] = false; // replace e.target.value with whatever you want to change it to
    setStateSongs(newArr);

    audioEl.pause();
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
                  {stateSongs[i] == false ? (
                    <Fab color="primary" onClick={() => play(i)}>
                      <PlayArrowIcon></PlayArrowIcon>
                    </Fab>
                  ) : (
                    <Fab color="primary" onClick={() => pause(i)}>
                      <PauseIcon></PauseIcon>
                    </Fab>
                  )}

                  <audio className="audio-element" onEnded={() => pause(i)}>
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
