import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import { Grid, Button, Container } from "@material-ui/core";
import * as artistsApi from "../../services/artistApi";
import _ from "lodash";
import "../../styles/autosuggest.css";
import CompareArtistsForm from "../components/compareArtistsForm";
import useLoader from "../../hooks/useLoader";

const ComparePage = props => {
  // const [selectedArtists, setPromises] = useState([]);
  const [loader, showLoader, hideLoder] = useLoader();
  const [datas, setDatas] = useState([]);

  const compare = selectedArtists => {
    console.log(selectedArtists);
    console.log("starting...");
    showLoader();
    let promises = [];
    selectedArtists.forEach(artist => {
      promises.push(artistsApi.getArtistByName(artist));
    });
    Promise.all(promises)
      .then(values => {
        console.log(values);
        setDatas(values);
        hideLoder();
      })
      .catch(error => {
        console.log(error);
        hideLoder();
      });
  };

  return (
    <div>
      {loader}
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <CompareArtistsForm compare={compare} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ComparePage;
