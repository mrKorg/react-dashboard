import React from "react";
import { useAxios } from "hooks";

const Sources = () => {
  const [loading, response, error] = useAxios("/sources");

  console.log(response);

  return <>Facts</>;
};

export default Sources;
