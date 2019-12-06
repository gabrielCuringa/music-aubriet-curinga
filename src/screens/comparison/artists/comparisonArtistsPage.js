import React, { useState, useEffect, useCallback, useContext } from "react";
import * as artistApi from "../../../services/artistApi";
import useLoader from "../../../hooks/useLoader";

const ComparisonArtistsPage = props => {
  const [loader, showLoader, hideLoader] = useLoader();
  // const { dispatch } = useContext(StateContext);

  // const showLoader = useCallback(() => dispatch({ type: "show_loader" }), []);
  // const hideLoader = useCallback(() => dispatch({ type: "hide_loader" }), []);

  const [artistsWithMostBand, setArtistsWithMostBand] = useState([]);

  useEffect(() => {
    async function getArtistsWithMostBand() {
      showLoader();
      let result = await artistApi.getArtistsWithMostBand();
      console.log(result);
      setArtistsWithMostBand(result);
      console.log(artistsWithMostBand);
      hideLoader();
    }
    getArtistsWithMostBand();
  }, [artistsWithMostBand.length]);

  function build() {
    return (
      <div>
        <h1>hello</h1>
        <p>
          {artistsWithMostBand.length > 0 && artistsWithMostBand[0].membername}
        </p>
      </div>
    );
  }

  return <div>{loader ? loader : build()}</div>;
};

export default ComparisonArtistsPage;
