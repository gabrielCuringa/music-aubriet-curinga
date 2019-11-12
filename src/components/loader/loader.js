import React from "react";
import Loader from "react-loaders";
import "loaders.css";

export function loader() {
  return <Loader type="ball-scale-multiple" active />;
}
