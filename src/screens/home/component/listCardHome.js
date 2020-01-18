import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import CardHome from "./cardHome";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Slider from "infinite-react-carousel";

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1
//   },
//   paper: {
//     height: 140,
//     width: 100
//   },
//   control: {
//     padding: theme.spacing(2)
//   }
// }));

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
}));

export default function SpacingGrid(props) {
  const classes = useStyles();

  // return (
  //   <Grid item xs={12}>
  //     <Grid container justify="center" spacing={8}>
  //       {props.list.map(value => (
  //         <Grid key={value} item>
  //           <CardHome title={value.name}></CardHome>
  //         </Grid>
  //       ))}
  //     </Grid>
  //   </Grid>
  // );
  return (
    <Slider dots>
      {props.list.map(tile => (
        <CardHome title={tile.name}></CardHome>
      ))}
    </Slider>
  );
  // <GridList className={classes.gridList} cols={4}>
  //   {props.list.map(tile => (
  //     <CardHome title={tile.name}></CardHome>
  //   ))}
  // </GridList>
}
