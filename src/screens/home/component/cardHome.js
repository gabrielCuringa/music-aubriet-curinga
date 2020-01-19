import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { Button } from "@material-ui/core";
import { StyleRoot } from "radium";
import Fab from "@material-ui/core/Fab";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import Icon from "@material-ui/core/Icon";
const useStyles = makeStyles({
  card: {
    width: 400
  },
  media: {
    height: 400
  }
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={props.artist.picture.xl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ textAlign: "center" }}
          >
            {props.artist.name}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
