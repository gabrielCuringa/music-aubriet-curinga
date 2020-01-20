import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  Link,
  View
} from "react";
import { makeStyles } from "@material-ui/core/styles";

import CardHome from "./cardHome";

import { Button } from "@material-ui/core";
import { StyleRoot } from "radium";
import Fab from "@material-ui/core/Fab";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import Icon from "@material-ui/core/Icon";
import Slider from "infinite-react-carousel";
import { Grid } from "@material-ui/core";

// const [index, setIndex] = useState([]);

// const [index, setIndex] = useState([]);

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
const indexOf = function() {
  // console.log(index);
};

const handleIndexChange = function(indexToChange) {
  console.log("child : " + indexToChange);
  this.props.onSelectIndex(indexToChange);
};

export default function ListCardHome(props) {
  const classes = useStyles();

  return (
    <Slider
      dots
      // afterChange={indexAfterChange => handleIndexChange(indexAfterChange)}
    >
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
            <Fab variant="extended" href={"/compare/artist/" + art.name}>
              <CompareArrowsIcon className={classes.extendedIcon} />
              Compare
            </Fab>

            {/* <Grid container direction="column">
              <Grid container justifyContent="flex-start">
                <h1 style={{ color: "white" }}>Albums de {art.name}</h1>
                <ListAlbums list={props.list}></ListAlbums>
              </Grid>
            </Grid> */}
          </div>
        </div>
      ))}
    </Slider>
  );
}
