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
import ListAlbums from "./component/listAlbums";

const HomePage = props => {
  const [loader, showLoader, hideLoader] = useLoader();

  const [artistsWithMostAlbums, setArtistsWithMostAlbums] = useState([]);

  useState(() => {
    function loadData() {
      showLoader();
      artistApi.getArtistsWithMostAlbums(0, 10).then(results => {
        let artistsPromises = [];
        console.log(results);

        results.forEach(artist => {
          artistsPromises.push(artistApi.getArtistById(artist._id));
        });
        Promise.all(artistsPromises)
          .then(artistsPromisesResult => {
            console.log("---artists");
            console.log(artistsPromisesResult);
            setArtistsWithMostAlbums(artistsPromisesResult);
            hideLoader();
          })
          .catch(error => {
            console.log(error);
            hideLoader();
          });
      });
    }
    loadData();
    // console.log(artistsWithMostAlbums);
  }, [artistsWithMostAlbums.length]);

  let artistsResult = [];
  // var res = await artistApi.getArtistById("56d8355153a7ddfc01f9583f");

  // console.log(res.item);
  // hideLoader();
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
            <h1 style={{ color: "white" }}>Artistes les plus productifs</h1>
          </Grid>

          <ListCard list={artistsWithMostAlbums}></ListCard>
        </Grid>
        <Grid container direction="column">
          <Grid container justifyContent="flex-start">
            <h1 style={{ color: "white" }}>Albums les plus</h1>
          </Grid>

          <ListAlbums list={artistsWithMostAlbums}></ListAlbums>
        </Grid>
      </div>
    );
  }

  return <div>{loader ? loader : build()}</div>;
};

export default HomePage;
