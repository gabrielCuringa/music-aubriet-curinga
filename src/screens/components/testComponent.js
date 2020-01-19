import React from "react";

const goToCompare = function(id) {
  console.log(id);
};

export default function testComponent(props) {
  return <h1>{props.match.params.name}</h1>;
}
