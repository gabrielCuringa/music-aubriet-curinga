import React, { useState } from "react";

import Coverflow from "react-coverflow";
import { StyleRoot } from "radium";
import ListSongs from "./listSongs";
import { Grid } from "@material-ui/core";

export default function ListAlbums(props) {
  // const classes = useStyles();

  const [index, setIndex] = useState(0);

  const handleIndexChange = function(indexToChange) {
    console.log("child : " + indexToChange);
    setIndex(indexToChange);
  };
  return (
    <div>
      <Coverflow
        enableScroll={false}
        displayQuantityOfSide={1}
        infiniteScroll
        enableHeading
        active={0}
        media={{
          "@media (max-width: 900px)": {
            width: "600px",
            height: "300px"
          },
          "@media (min-width: 900px)": {
            width: "960px",
            height: "600px"
          }
        }}
      >
        {props.list.map((album, i) => (
          <img
            key={i}
            src={album && album.cover && album.cover.xl}
            alt={album.title}
            onClick={() => handleIndexChange(i)}
          ></img>
        ))}
      </Coverflow>

      <h1 style={{ color: "white" }}>
        Sons de l'album " {props.list[index].title} "
      </h1>

      <ListSongs list={props.list[index].songs}></ListSongs>
    </div>
  );
}
