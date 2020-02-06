import React, { useMemo } from "react";
import { useAxios } from "hooks";
import Graph from "containers/Sources/components/Graph";
import { Col, Row, Card } from "antd";

const GRAPHS = [
  {
    key: "category",
    title: "Categories",
    mode: "radar"
  },
  {
    key: "language",
    title: "Languages",
    mode: "bar"
  },
  {
    key: "country",
    title: "Countries",
    mode: "pie"
  }
];

const GraphPage = () => {
  const [loading, response, error] = useAxios("/sources");
  const { sources = [] } = response || {};

  const preparedData = useMemo(() => {
    const data = {};
    GRAPHS.forEach(entity => (data[entity.key] = {}));
    sources.forEach(item =>
      Object.keys(data).forEach(
        key =>
          (data[key][item[key]] = [...(data[key]?.[item[key]] || []), item])
      )
    );
    Object.keys(data).forEach(
      key =>
        (data[key] = Object.keys(data[key]).map(subKey => ({
          name: subKey,
          value: data[key][subKey]?.length || 0,
          items: data[key][subKey] || []
        })))
    );
    return data;
  }, [sources]);

  return (
    <Row type="flex" gutter={[24, 24]}>
      {GRAPHS.map(entity => (
        <Col xs={24} lg={12} key={entity.key}>
          <Card title={entity.title}>
            <Graph data={preparedData[entity.key]} mode={entity.mode} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default GraphPage;
