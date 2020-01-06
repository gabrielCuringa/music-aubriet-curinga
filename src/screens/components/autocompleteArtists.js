import React, { useState } from "react";
import _ from "lodash";
import { TextField, Grid } from "@material-ui/core";
import Autosuggest from "react-autosuggest";
import * as artistsApi from "../../services/artistApi";

const style = {
  borderRadius: "3px",
  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#757575",
  padding: "2px 0",
  fontSize: "90%",
  position: "fixed",
  overflow: "auto",
  maxHeight: "50%",
  optional: {
    highlightedItem: "#4caf50"
  }
};

const AutocompleteArtists = props => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionSelected, setSuggestionSelected] = useState("");

  const onChange = (event, { newValue }) => {
    setSuggestionSelected(newValue);
  };

  const onSelect = val => {
    setSuggestionSelected(val);
    props.onSelect(val);
    return val;
  };

  const getArtistsSearch = async input => {
    const response = await artistsApi.getArtistsSearch(input);
    return response;
  };

  const onSuggestionsFetchRequested = _.debounce(async input => {
    if (input.value) {
      let suggestions = await getArtistsSearch(input.value);
      let suggestionsMap = suggestions.map((item, index) => {
        return {
          datas: item,
          key: index
        };
      });
      setSuggestions(suggestionsMap);
    }
  }, 500);

  const renderSuggestion = (suggestion, isHighlighted) => {
    return (
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        className="autocomplete-item"
        key={suggestion.key}
      >
        <Grid item xs={4}>
          <img src={suggestion.datas.picture} alt={"img"} />
        </Grid>
        <Grid item xs={8}>
          {suggestion.datas.name}
        </Grid>
      </Grid>
    );
  };

  const inputProps = {
    value: suggestionSelected, // usually comes from the application state
    onChange: onChange, // called every time the input value changes
    placeholder: "Artiste"
  };

  return (
    <Autosuggest
      className="autocomplete-input"
      focusInputOnSuggestionClick={false}
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={() => setSuggestions([])}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      getSuggestionValue={suggestion => onSelect(suggestion.datas.name)}
    />
  );
};

export default AutocompleteArtists;
