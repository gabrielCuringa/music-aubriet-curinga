import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import CardHome from "./cardHome";

import { Button } from "@material-ui/core";
import { StyleRoot } from "radium";
import Fab from "@material-ui/core/Fab";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import Icon from "@material-ui/core/Icon";
import Slider from "infinite-react-carousel";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));
const goToCompare = function(id) {
  console.log(id);
};

export default function ListCardHome(props) {
  const classes = useStyles();

  return (
    <Slider dots>
      {props.list.map(art => (
        <div>
          <CardHome artist={art}></CardHome>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Fab variant="extended" href={"/compare/" + art.name}>
              <CompareArrowsIcon className={classes.extendedIcon} />
              Compare
            </Fab>
          </div>
        </div>
      ))}
    </Slider>
  );
}
