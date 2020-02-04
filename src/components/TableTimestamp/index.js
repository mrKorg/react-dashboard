import React, { memo } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { DATE_FORMAT, TIME_FORMAT } from "helpers/constants";
import { Typography } from "antd";

const TableTimestamp = memo(({ timestamp = null }) => {
  if (timestamp) {
    const m = moment(timestamp);
    return (
      <>
        <Typography.Text strong>{m.format(DATE_FORMAT)}</Typography.Text>{' '}
        <Typography.Text disabled>{m.format(TIME_FORMAT)}</Typography.Text>
      </>
    );
  }
  return null;
});

TableTimestamp.propTypes = {
  timestamp: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default TableTimestamp;
