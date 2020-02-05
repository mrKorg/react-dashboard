import React from "react";
import { useAxios } from "hooks";
import Counter from "components/Counter";
import Graph from "./components/Graph";

const Sources = () => {
  const [loading, response, error] = useAxios("/sources");
  const { sources = [] } = response || {};
  const total = sources?.length;

  return (
    <>
      <Counter value={total} title="Sources" />
      <Graph />
    </>
  );
};

export default Sources;
