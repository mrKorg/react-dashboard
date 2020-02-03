import React, { useEffect } from "react";
import { Input, Select, Form } from "antd";
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
    <div>
      {onSearch && (
        <Form.Item label="Search">
          <Input
            value={values?.q || null}
            onChange={e => onSearch(e.target.value)}
          />
        </Form.Item>
      )}
      {onChangeCountry && (
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
      )}
      {onChangeCategory && (
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
      )}
    </div>
  );
};

export default HeadlinesFilter;
