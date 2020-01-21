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
import ListAlbums from "./listAlbums";

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

export default function ListCardHome(props) {
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  const handleIndexChange = function(indexToChange) {
    console.log("child : " + indexToChange);
    setIndex(indexToChange);
  };

  return (
    <div>
      <Slider
        dots
        afterChange={indexAfterChange => handleIndexChange(indexAfterChange)}
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
            </div>
          </div>
        ))}
      </Slider>
      <h1 style={{ color: "white" }}>Albums de {props.list[index].name}</h1>
      <Grid container direction="column">
        <Grid container justifyContent="center">
          <Grid item>
            <ListAlbums list={props.list[index].albums}></ListAlbums>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
