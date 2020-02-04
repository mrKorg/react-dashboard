import React, { useState } from "react";
import { useFormikContext } from "formik";
import moment from "moment";
import { DatePicker, Row, Col } from "antd";
import { FormItem } from "components/Form";

const Date = () => {
  const formik = useFormikContext();
  const [isEndOpen, setEndOpen] = useState(false);

  const disabledStartDate = startValue => {
    return !startValue || !formik.values.to
      ? false
      : startValue.valueOf() > formik.values.to.valueOf();
  };
  const disabledEndDate = endValue => {
    return !endValue || !formik.values.from
      ? false
      : endValue.valueOf() <= formik.values.from.valueOf();
  };

  const onStartChange = v => formik.setFieldValue("from", moment(v).format());
  const onEndChange = v => formik.setFieldValue("to", moment(v).format());
  const handleStartOpenChange = open => !open && setEndOpen(true);
  const handleEndOpenChange = v => setEndOpen(v);

  return (
    <Row type="flex" gutter={24}>
      <Col md={12}>
        <FormItem label="From Date" name="from">
          <DatePicker
            disabledDate={disabledStartDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={formik.values.from ? moment(formik.values.from) : null}
            placeholder="Start"
            onChange={onStartChange}
            onOpenChange={handleStartOpenChange}
            style={{ width: "100%" }}
          />
        </FormItem>
      </Col>
      <Col md={12}>
        <FormItem label="To Date" name="to">
          <DatePicker
            disabledDate={disabledEndDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={formik.values.to ? moment(formik.values.to) : null}
            placeholder="End"
            onChange={onEndChange}
            open={isEndOpen}
            onOpenChange={handleEndOpenChange}
            style={{ width: "100%" }}
          />
        </FormItem>
      </Col>
    </Row>
  );
};

export default Date;
