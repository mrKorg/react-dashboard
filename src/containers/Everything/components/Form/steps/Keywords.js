import React from "react";
import { useFormikContext } from "formik";
import { Input, Checkbox, Icon, Popover, Col, Row } from "antd";
import { FormItem } from "components/Form";

const InTitleDescription = () => (
  <div style={{ fontSize: 12 }}>
    <p>Keywords or phrases to search for in the article title only.</p>
    <p>Advanced search is supported here:</p>
    <ul style={{ maxWidth: 300 }}>
      <li>Surround phrases with quotes (") for exact match.</li>
      <li>
        Prepend words or phrases that must appear with a + symbol. Eg: +bitcoin
      </li>
      <li>Prepend words that must not appear with a - symbol. Eg: -bitcoin</li>
      <li>
        Alternatively you can use the AND / OR / NOT keywords, and optionally
        group these with parenthesis. Eg: crypto AND (ethereum OR litecoin) NOT
        bitcoin.
      </li>
    </ul>
  </div>
);

const Keywords = () => {
  const formik = useFormikContext();

  return (
    <>
      <FormItem label="Keywords" name="keywords" required>
        <Input
          value={formik.values.keywords}
          onChange={e => formik.setFieldValue("keywords", e.target.value)}
          onBlur={() => formik.setFieldTouched("keywords")}
        />
      </FormItem>
      <FormItem name="inTitle">
        <Row type="flex" gutter={8} align="middle">
          <Col>
            <Checkbox
              checked={formik.values.inTitle}
              onChange={e => formik.setFieldValue("inTitle", e.target.checked)}
              onBlur={() => formik.setFieldTouched("inTitle")}
            >
              Search in the article title only
            </Checkbox>
          </Col>
          <Col>
            <Popover
              placement="rightTop"
              title="Instruction"
              trigger="click"
              content={<InTitleDescription />}
            >
              <Icon type="info-circle" />
            </Popover>
          </Col>
        </Row>
      </FormItem>
    </>
  );
};

export default Keywords;
