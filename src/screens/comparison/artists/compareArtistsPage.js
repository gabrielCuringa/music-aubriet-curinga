import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chart from "react-google-charts";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Avatar,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as artistApi from "../../../services/artistApi";
import useLoader from "../../../hooks/useLoader";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: "100%",
    "& > *": {
      margin: theme.spacing(1)
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    }
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 200
  }
}));

const CompareArtistsPage = props => {
  //get the first and the second artists to compare
  const { first, second } = useParams();
  const [loader, showLoader, hideLoader] = useLoader();
  const classes = useStyles();

  const [firstInformations, setFirstInformationsToCompare] = useState({});
  const [secondInformations, setSecondInformationsToCompare] = useState({});

  useEffect(() => {
    showLoader();
    artistApi.getArtistByName(first).then(resultFirst => {
      console.log(resultFirst);
      setFirstInformationsToCompare(resultFirst);
      artistApi.getArtistByName(second).then(resultSecond => {
        console.log(resultSecond);
        setSecondInformationsToCompare(resultSecond);
        hideLoader();
      });
    });
  }, []);

  function getAgeFromLifeSpan(begin) {
    let beginTime = new Date(begin).getTime();
    let age = (new Date().getTime() - beginTime) / (1000 * 60 * 60 * 24 * 365);
    return Math.floor(age);
  }

  function build() {
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={1}>
            <Avatar
              alt="img"
              src={
                firstInformations &&
                firstInformations.picture &&
                firstInformations.picture.standard
              }
              className={classes.large}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography>{first}</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={1}>
            <Avatar
              alt="img"
              src={
                secondInformations &&
                secondInformations.picture &&
                secondInformations.picture.standard
              }
              className={classes.large}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography>{second}</Typography>
          </Grid>
        </Grid>

        {/* basic informations */}
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>
              Informations basiques
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid item xs={12}>
              <Chart
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                  [
                    "Element",
                    "Âge",
                    { role: "style" },
                    {
                      sourceColumn: 0,
                      role: "annotation",
                      type: "string",
                      calc: "stringify"
                    }
                  ],
                  [
                    firstInformations.name,
                    firstInformations &&
                      firstInformations.lifeSpan &&
                      getAgeFromLifeSpan(firstInformations.lifeSpan.begin),
                    "#b87333",
                    null
                  ],
                  [
                    secondInformations.name,
                    secondInformations &&
                      secondInformations.lifeSpan &&
                      getAgeFromLifeSpan(secondInformations.lifeSpan.begin),
                    "#b87333",
                    null
                  ]
                ]}
                options={{
                  title: "Density of Precious Metals, in g/cm^3",
                  bar: { groupWidth: "95%" },
                  legend: { position: "none" }
                }}
                // For tests
                rootProps={{ "data-testid": "6" }}
              />
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        {/* chart deezer fans */}
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>
              Comparaison des fans deezer
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid item xs={12}>
              <Chart
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                  [
                    "Deezer fans",
                    firstInformations.name,
                    secondInformations.name
                  ],
                  [
                    "Fans",
                    firstInformations.deezerFans,
                    secondInformations.deezerFans
                  ]
                ]}
                options={{
                  title: "Deezer fans",
                  chartArea: { width: "60%" },
                  isStacked: true,
                  hAxis: {
                    title: "Total deezer fans",
                    minValue: 0
                  }
                }}
                // For tests
                rootProps={{ "data-testid": "3" }}
              />
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }

  return <div>{loader ? loader : build()}</div>;
};

export default CompareArtistsPage;
