import React from "react";
import { useFormikContext } from "formik";
import { FormItem } from "components/Form";
import TableTimestamp from "components/TableTimestamp";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
};

const Review = () => {
  const { values } = useFormikContext();

  return (
    <div>
      <FormItem label="Keywords" {...formItemLayout} style={{ margin: 0 }}>
        {values.keywords || "N/A"}
      </FormItem>
      <FormItem label="Language" {...formItemLayout} style={{ margin: 0 }}>
        {values.language || "N/A"}
      </FormItem>
      <FormItem label="Date" {...formItemLayout} style={{ margin: 0 }}>
        {(values.from || values.to) ? (
          <>
            From {values.from ? <TableTimestamp timestamp={values.from}/> : "N/A"}<br />
            to {values.to ? <TableTimestamp timestamp={values.to}/> : "N/A"}
          </>
        ) : 'N/A'}
      </FormItem>
    </div>
  );
};

export default Review;
