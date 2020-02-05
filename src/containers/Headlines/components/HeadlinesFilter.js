import React, { useEffect } from "react";
import { Input, Select, Form, Col, Row } from "antd";
import { COUNTRIES, CATEGORIES } from "helpers/constants";

const HeadlinesFilter = ({
  values,
  onChangeCountry,
  onChangeCategory,
  onSearch
}) => {
  useEffect(() => {
    console.log("HeadlinesList mount");
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Row type="flex" gutter={24}>
        {onSearch && (
          <Col xs={24} md={12}>
            <Form.Item label="Search">
              <Input
                value={values?.q || null}
                onChange={e => onSearch(e.target.value)}
              />
            </Form.Item>
          </Col>
        )}
        {onChangeCountry && (
          <Col xs={24} md={6}>
            <Form.Item label="Country">
              <Select
                value={values?.country || null}
                onChange={onChangeCountry}
                style={{ width: "100%" }}
              >
                {COUNTRIES.map(item => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}
        {onChangeCategory && (
          <Col xs={24} md={6}>
            <Form.Item label="Category">
              <Select
                value={values?.category || null}
                onChange={onChangeCategory}
                style={{ width: "100%" }}
              >
                {CATEGORIES.map(item => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default HeadlinesFilter;
