import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import {
  Grid,
  Button,
  Container,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  makeStyles,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import * as artistsApi from "../../services/artistApi";
import _ from "lodash";
import "../../styles/autosuggest.css";
import CompareArtistsForm from "../components/compareArtistsForm";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useLoader from "../../hooks/useLoader";
import useDialog from "../../hooks/useDialog";
import Chart from "react-google-charts";
import randomColor from "random-material-color";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: "100%",
    "& > *": {
      margin: theme.spacing(1)
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightBold
    },
    textBody: {
      fontSize: theme.typography.pxToRem(10),
      fontWeight: theme.typography.fontWeightLight
    }
  }
}));

const ComparePage = props => {
  const classes = useStyles();
  const [loader, showLoader, hideLoader] = useLoader();
  const [dialog, showDialog, hideDialog] = useDialog();
  const [artistsDatas, setArtistsDatas] = useState([]);

  const getAgeFromLifeSpan = begin => {
    let beginTime = new Date(begin).getTime();
    let age = (new Date().getTime() - beginTime) / (1000 * 60 * 60 * 24 * 365);
    return Math.floor(age);
  };

  const basicInformationsDatas = () => {
    let chartDatas = [
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
      ]
    ];
    artistsDatas.forEach(data => {
      chartDatas.push([
        data.name,
        getAgeFromLifeSpan(data.lifeSpan.begin),
        randomColor.getColor(),
        null
      ]);
    });

    return chartDatas;
  };

  const deezerFansDatas = () => {
    let chartDatas = [["Fans Deezer"], ["Fans"]];
    artistsDatas.forEach(data => {
      chartDatas[0].push(data.name);
      chartDatas[1].push(data.deezerFans);
    });
    return chartDatas;
  };

  const timelineDatas = () => {
    let chartDatas = [
      [
        { type: "string", id: "Artiste" },
        { type: "string", id: "Album" },
        { type: "date", id: "Start" },
        { type: "date", id: "End" }
      ]
    ];

    artistsDatas.forEach(artist => {
      artist.albums.forEach(album => {
        let releaseDate;
        let releaseDateWithDuration;
        let albumDuration = album.length.split(":");

        if (!album.dateRelease) {
          if (album.publicationDate) {
            releaseDate = new Date(album.publicationDate);
            releaseDateWithDuration = new Date(
              album.publicationDate
            ).setMinutes(albumDuration[0], albumDuration[1]);
          } else return;
        } else {
          releaseDate = new Date(album.dateRelease);
          releaseDateWithDuration = new Date(album.dateRelease).setMinutes(
            albumDuration[0],
            albumDuration[1]
          );
        }
        if (releaseDate && releaseDateWithDuration)
          chartDatas.push([
            artist.name,
            album.title,
            releaseDate,
            releaseDateWithDuration
          ]);
      });
    });
    return chartDatas;
  };

  const albumsNumberDatas = () => {
    let chartDatas = [["Artiste", "Nombre d'albums"]];
    artistsDatas.forEach(artist => {
      chartDatas.push([artist.name, artist.albums && artist.albums.length]);
    });
    return chartDatas;
  };

  const compare = selectedArtists => {
    if (selectedArtists.length <= 0) {
      showDialog(
        "Informations",
        "Vous devez sélectionner au minimum un artiste.",
        [{ text: "Fermer" }]
      );
    } else {
      showLoader();
      let artistsPromises = [];
      selectedArtists.forEach(artist => {
        artistsPromises.push(artistsApi.getSongsOfAlbumsByArtistName(artist));
      });
      Promise.all(artistsPromises)
        .then(artistsPromisesResult => {
          console.log(artistsPromisesResult);
          setArtistsDatas(artistsPromisesResult);
          hideLoader();
        })
        .catch(error => {
          console.log(error);
          hideLoader();
        });
    }
  };
  return (
    <div>
      {loader}
      {dialog}
      <Container>
        <h1>{props.match.params.name}</h1>

        <Grid container>
          <Grid item xs={12}>
            <CompareArtistsForm compare={compare} />
          </Grid>
        </Grid>
        {/* basic informations */}
        {artistsDatas.length > 0 && (
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
                  data={basicInformationsDatas()}
                  options={{
                    title: "Âges des artistes",
                    bar: { groupWidth: "95%" },
                    legend: { position: "none" }
                  }}
                  // For tests
                  rootProps={{ "data-testid": "6" }}
                />
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
        {artistsDatas.length > 0 && (
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
                  data={deezerFansDatas()}
                  options={{
                    title: "Deezer fans",
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
        )}
        {/* TIMELINE */}
        {/* nb albums */}
        {/* nb songs */}
        {artistsDatas.length > 0 && (
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>
                Comparaison des albums
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container>
                <Grid item xs={12}>
                  <Typography className={classes.textBody}>
                    Les albums ne contenant pas le champ "length" ou une date de
                    sortie correcte ne sont pas affichés.
                  </Typography>
                  <Chart
                    chartType="Timeline"
                    loader={<div>Loading Chart</div>}
                    data={timelineDatas()}
                    options={{
                      title: "Timeline",
                      chartArea: { width: "60%" },
                      isStacked: true,
                      hAxis: {
                        title: "Total deezer fans",
                        minValue: 0
                      }
                    }}
                    rootProps={{ "data-testid": "1" }}
                  />
                </Grid>
                {/* {unvalidsAlbumsForTimeline.length > 0 && (
                  <Grid item xs={12}>
                    <Typography>
                      Les albums suivants n'ont pas pû être classés.
                    </Typography>
                    <List>
                      {unvalidsAlbumsForTimeline.forEach(album => {
                        return (
                          <ListItem>
                            <ListItemText>{album.title}</ListItemText>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Grid>
                )} */}
                <Grid item xs={12}>
                  <Chart
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={albumsNumberDatas()}
                    options={{
                      title: "Nombre d'albums"
                    }}
                    rootProps={{ "data-testid": "1" }}
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

export default ComparePage;
