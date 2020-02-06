import React from "react";
import { Input, Select, Col, Row } from "antd";
import { COUNTRIES, CATEGORIES } from "helpers/constants";
import FormItem from "components/Form/Item";

const HeadlinesFilter = ({
  values,
  onChangeCountry,
  onChangeCategory,
  onSearch
}) => {
  return (
    <div style={{ maxWidth: 600 }}>
      <Row type="flex" gutter={12}>
        {onSearch && (
          <Col xs={24} md={12}>
            <FormItem label="Search">
              <Input
                value={values?.q || null}
                onChange={e => onSearch(e.target.value)}
              />
            </FormItem>
          </Col>
        )}
        {onChangeCountry && (
          <Col xs={24} md={6}>
            <FormItem label="Country">
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
            </FormItem>
          </Col>
        )}
        {onChangeCategory && (
          <Col xs={24} md={6}>
            <FormItem label="Category">
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
            </FormItem>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default HeadlinesFilter;
