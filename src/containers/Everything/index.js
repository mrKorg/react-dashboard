import React from "react";
import { useAxios } from "hooks";

const Sources = () => {
  const [loading, response, error] = useAxios(
    "/everything?q=bitcoin&from=2020-01-03&sortBy=publishedAt"
  );

  console.log(response);

  return <>Facts</>;
};

export default Sources;
