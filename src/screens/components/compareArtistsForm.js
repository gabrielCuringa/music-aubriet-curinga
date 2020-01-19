import React, { useState, useEffect } from "react";
import {
  Grid,
  IconButton,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  ButtonGroup,
  Avatar,
  Typography,
  ListItemAvatar,
  makeStyles
} from "@material-ui/core";
import * as artistApi from "../../services/artistApi";
import AutocompleteArtists from "./autocompleteArtists";
import "../../styles/autosuggest.css";
import useLoader from "../../hooks/useLoader";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

const CompareArtistsForm = props => {
  const classes = useStyles();
  const [loader, showLoader, hideLoader] = useLoader();
  const [additionalFields, setAdditionalFields] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const clearAditionalFields = () => {
    setAdditionalFields([]);
    setSelectedArtists([]);
  };

  const onArtistSelected = (index, value) => {
    let temp = [...additionalFields];
    artistApi.getArtistByName(value).then(result => {
      let newField = (
        <div>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt={result.name} src={result.picture.standard}></Avatar>
            </ListItemAvatar>
            <ListItemText primary={result.name} secondary={result.genres} />
          </ListItem>
        </div>
      );

      temp[index] = newField;
      setAdditionalFields(temp);
      setSelectedArtists(prevState => [...prevState, value]);
    });
  };

  const addArtist = () => {
    let generatedIndex = additionalFields.length + 1;
    let newField = (
      <AutocompleteArtists
        key={generatedIndex}
        onSelect={value => onArtistSelected(generatedIndex, value)}
      />
    );
    setAdditionalFields(prevState => [...prevState, newField]);
  };

  const compare = () => {
    props.compare(selectedArtists);
  };

  useState(() => {
    console.log();
    let firstField = (
      <AutocompleteArtists
        key={0}
        onSelect={value => onArtistSelected(0, value)}
      />
    );
    setAdditionalFields([firstField]);
  });

  return (
    <div>
      {loader}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <List className={classes.root}>
            <h2>{props.match.params.name}</h2>
            <p>Sélectionner les artistes à comparer.</p>
            <ListItem>
              <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="contained primary button group"
              >
                {/*launch comparison*/}
                <Button variant="contained" color="primary" onClick={addArtist}>
                  Ajouter un artiste
                </Button>
                {/*launch comparison*/}
                <Button variant="contained" color="primary" onClick={compare}>
                  Comparer
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={clearAditionalFields}
                >
                  Réinitialiser
                </Button>
              </ButtonGroup>
            </ListItem>
            {additionalFields.map((field, index) => {
              return (
                <ListItem key={index}>
                  {field}

                  {/* {index > 0 && (
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="start"
                        aria-label="delete"
                        onClick={() => removeAutocompleteField(index)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  )} */}
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default CompareArtistsForm;
