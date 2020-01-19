import React from "react";

import Coverflow from "react-coverflow";
import { StyleRoot } from "radium";

export default function ListAlbums(props) {
  // const classes = useStyles();

  const imageClick = () => {
    console.log("Click");
  };
  return (
    <StyleRoot>
      <Coverflow
        displayQuantityOfSide={1}
        infiniteScroll
        enableHeading
        enableScroll="false"
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
        {props.list.map(art => (
          <img src={art.picture.xl} alt={art.name}></img>
        ))}
      </Coverflow>
    </StyleRoot>
  );
}
