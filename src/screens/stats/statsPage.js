import React, { useEffect, useState } from "react";
import * as statsApi from "../../services/statsApi";
import Chart from "react-google-charts";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Grid,
  Container,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  makeStyles,
  Slider
} from "@material-ui/core";
import useLoader from "../../hooks/useLoader";

const useStyles = makeStyles(theme => ({
  root: {
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    }
  }
}));

const StatsPage = props => {
  const classes = useStyles();
  const limits = [
    {
      value: 1
    },
    {
      value: 5
    },
    {
      value: 10
    },
    {
      value: 15
    }
  ];
  const [loader, showLoader, hideLoader] = useLoader();
  const [languagesStats, setLanguagesStats] = useState([]);
  const [genresByPopularity, setGenreByPopularity] = useState([]);

  const initDatas = () => {
    showLoader();
    statsApi
      .getStatsAboutLyricsLanguages()
      .then(lyricsStats => {
        statsApi
          .getGenresByPopularity(5)
          .then(result => {
            setLanguagesStats(lyricsStats);
            setGenreByPopularity(result);
            hideLoader();
          })
          .catch(error => {
            hideLoader();
            console.log(error);
          });
      })
      .catch(error => {
        hideLoader();
        console.log(error);
      });
  };

  const updateGenresByPopularity = limit => {
    showLoader();
    statsApi
      .getGenresByPopularity(limit)
      .then(result => {
        setGenreByPopularity(result);
        hideLoader();
      })
      .catch(error => {
        hideLoader();
        console.log(error);
      });
  };

  const updateStatsAboutLanguages = limit => {
    showLoader();
    statsApi
      .getStatsAboutLyricsLanguages(limit)
      .then(result => {
        setLanguagesStats(result);
        hideLoader();
      })
      .catch(error => {
        hideLoader();
        console.log(error);
      });
  };

  const majorsLanguagesStatsDatas = () => {
    let chartDatas = [["Langues", "Popularité"]];
    let temp = [...languagesStats];
    temp.splice(5);
    temp.forEach(item => {
      chartDatas.push([item._id, item.sum]);
    });
    return chartDatas;
  };

  const minorsLanguagesStatsDatas = () => {
    let chartDatas = [["Langues", "Popularité"]];
    let temp = [...languagesStats];
    let splitted = temp.splice(5);
    splitted.forEach(item => {
      chartDatas.push([item._id, item.sum]);
    });
    return chartDatas;
  };

  const genresByPopularityDatas = () => {
    let chartDatas = [["Genres", "Popularité"]];
    genresByPopularity.forEach(item => {
      chartDatas.push([item._id, item.sum]);
    });
    return chartDatas;
  };

  useState(() => {
    initDatas();
  });

  return (
    <div>
      {loader}
      <Container>
        {languagesStats.length > 0 && (
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>
                Langues les plus utilisées dans les paroles
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container>
                <Grid item xs={12}>
                  <Chart
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={majorsLanguagesStatsDatas()}
                    options={{
                      // Material design options
                      chart: {
                        title: "Popularité des langues majeures"
                      }
                    }}
                    // For tests
                    rootProps={{ "data-testid": "2" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Chart
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={minorsLanguagesStatsDatas()}
                    options={{
                      // Material design options
                      chart: {
                        title: "Popularité des langues mineures"
                      }
                    }}
                    // For tests
                    rootProps={{ "data-testid": "2" }}
                  />
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}

        {genresByPopularity.length > 0 && (
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>
                Genres les plus populaires
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container>
                <Grid item xs={12}>
                  <Typography id="discrete-slider" gutterBottom>
                    Nombre de genres
                  </Typography>
                  <Slider
                    defaultValue={5}
                    getAriaValueText={value => value}
                    onChangeCommitted={(event, value) => {
                      console.log(value);
                      updateGenresByPopularity(value);
                    }}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={5}
                    marks={limits}
                    min={1}
                    max={20}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Chart
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={genresByPopularityDatas()}
                    options={{
                      // Material design options
                      chart: {
                        title: "Popularité des genres majeurs"
                      }
                    }}
                    // For tests
                    rootProps={{ "data-testid": "2" }}
                  />
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
      </Container>
    </div>
  );
};

export default StatsPage;
