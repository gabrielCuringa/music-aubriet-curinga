import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  Link,
  View
} from "react";
import * as artistApi from "../../services/artistApi";
import useLoader from "../../hooks/useLoader";
import ListCard from "./component/listCardHome";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const HomePage = props => {
  const [loader, showLoader, hideLoader] = useLoader();

  const [artistsWithMostAlbums, setArtistsWithMostAlbums] = useState([]);

  useEffect(() => {
    async function loadData() {
      showLoader();
      let artistsResult = [];
      // var res = await artistApi.getArtistById(null, "56d8355153a7ddfc01f9583f");

      // console.log(res.item);
      // hideLoader();
      artistApi.getArtistsWithMostAlbums(null, 0, 10).then(results => {
        // artistApi.getArtistById(null, results[0]._id).then(testResult => {
        //   console.log("je suis un test");
        //   console.log(testResult);
        //   hideLoader();
        // });

        // Promise.all({}
        //   results.map(element => {
        //     // artistsResult.add(artistApi.getArtistById(element.id));
        //     var result = artistApi.getArtistById(element.id);
        //     console.log(result);
        //   })
        // );
        setArtistsWithMostAlbums(results);
        hideLoader();
      });
    }
    loadData();
    // console.log(artistsWithMostAlbums);
  }, [artistsWithMostAlbums.length]);

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      height: 140,
      width: 100
    },
    control: {
      padding: theme.spacing(2)
    }
  }));

  function build() {
    return (
      <div>
        <Grid container direction="column">
          <Grid container justifyContent="flex-start">
            <h1>Artistes les plus productifs</h1>
          </Grid>

          <ListCard list={artistsWithMostAlbums}></ListCard>
        </Grid>
        <Grid container direction="column">
          <Grid container justifyContent="flex-start">
            <h1>Artistes les plus productifs</h1>
          </Grid>

          <ListCard list={artistsWithMostAlbums}></ListCard>
        </Grid>
      </div>
    );
  }

  return <div>{loader ? loader : build()}</div>;
};

export default HomePage;
