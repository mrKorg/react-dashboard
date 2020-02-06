import React from "react";
import { useAxios } from "hooks";
import Counter from "components/Counter";
import { Row, Col } from "antd";

const CounterPage = () => {
  const [loading, response, error] = useAxios("/sources");
  const { sources = [] } = response || {};
  const total = sources?.length;
  return (
    <Row type="flex" justify="center">
      <Col>
        <Counter value={error ? 0 : total} loading={loading} title="Sources" />
      </Col>
    </Row>
  );
};

export default CounterPage;
