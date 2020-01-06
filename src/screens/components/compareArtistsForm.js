import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Grid,
  IconButton,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import AutocompleteArtists from "./autocompleteArtists";
import "../../styles/autosuggest.css";

const CompareArtistsForm = props => {
  const [additionalFields, setAdditionalFields] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);

  // const addAutocompleteField = () => {
  //   let generatedIndex = additionalFields.length;
  //   let newField = (
  //     <AutocompleteArtists key={generatedIndex} onSelect={onArtistSelected} />
  //   );

  //   setAdditionalFields(prevState => [...prevState, newField]);
  // };

  const clearAditionalFields = () => {
    let firstField = (
      <AutocompleteArtists key={0} onSelect={onArtistSelected} />
    );
    setAdditionalFields([firstField]);
    setSelectedArtists([]);
  };

  const removeAutocompleteField = index => {
    setAdditionalFields(
      additionalFields.filter((el, i) => {
        console.log(i + " | " + index);
        return i !== index;
      })
    );
    setSelectedArtists(selectedArtists.filter((_, i) => i !== index));
  };

  const onArtistSelected = value => {
    let generatedIndex = additionalFields.length;
    let newField = (
      <AutocompleteArtists key={generatedIndex} onSelect={onArtistSelected} />
    );
    setAdditionalFields(prevState => [...prevState, newField]);
    setSelectedArtists(prevState => [...prevState, value]);
  };

  const compare = () => {
    props.compare(selectedArtists);
  };

  useState(() => {
    let firstField = (
      <AutocompleteArtists key={0} onSelect={onArtistSelected} />
    );
    setAdditionalFields([firstField]);
  });

  return (
    <div>
      <Grid container spacing={3}>
        {/* <Grid item>
          
          <Button
            variant="contained"
            color="primary"
            onClick={addAutocompleteField}
          >
            Ajouter un artiste à comparer
          </Button>
        </Grid> */}

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={clearAditionalFields}
          >
            Réinitialiser
          </Button>
        </Grid>

        <Grid item>
          {/*launch comparison*/}
          <Button variant="contained" color="primary" onClick={compare}>
            Comparer
          </Button>
        </Grid>
      </Grid>
      <List>
        {additionalFields.map((field, index) => {
          return (
            <ListItem key={index}>
              {field}

              {index > 0 && (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="start"
                    aria-label="delete"
                    onClick={() => removeAutocompleteField(index)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default CompareArtistsForm;
