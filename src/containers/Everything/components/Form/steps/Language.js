import React from "react";
import { useFormikContext } from "formik";
import { Select } from "antd";
import { FormItem } from "components/Form";
import { LANGUAGES } from "helpers/constants";

const Language = () => {
  const formik = useFormikContext();

  return (
    <>
      <FormItem label="Select Language" name="language" required>
        <Select
          value={formik.values.language}
          onChange={v => formik.setFieldValue("language", v)}
          onBlur={() => formik.setFieldTouched("language")}
          style={{ width: "100%" }}
        >
          {LANGUAGES.map(item => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </FormItem>
    </>
  );
};

export default Language;
