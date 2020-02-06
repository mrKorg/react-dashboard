import React from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { Typography, Spin } from "antd";

const formatNumber = (number, isInteger = false) =>
  isInteger
    ? number.toFixed(0).toLocaleString()
    : parseFloat(number.toFixed(2)).toLocaleString();

const Counter = ({ value, title, loading }) => {
  const changeProps = useSpring({
    from: { val: 0 },
    to: { val: value },
    config: { delay: 1000 }
  });

  return (
    <Spin spinning={loading}>
      <Circle style={changeProps}>
        <div>
          <Count>
            {changeProps.val.interpolate(x => `${formatNumber(x, true)}`)}
          </Count>
          <Title>{title}</Title>
        </div>
      </Circle>
    </Spin>
  );
};

Counter.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string,
  loading: PropTypes.bool
};

const Circle = styled(animated.div)`
  text-align: center;
  display: grid;
  align-items: center;
  justify-items: center;
  width: 100px;
  height: 100px;
  background: #f0f2f5;
  border-radius: 50%;
`;

const Count = styled(animated.div)`
  font-size: 30px;
  font-weight: bold;
  line-height: 1.2;
`;

const Title = styled(Typography.Paragraph)`
  &&& {
    margin-bottom: 0;
    font-size: 10px;
  }
`;

export default Counter;
