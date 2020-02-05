import React, { useState } from "react";
import { useFormikContext } from "formik";
import {
  Input,
  Checkbox,
  Icon,
  Button,
  Col,
  Row,
  Typography,
  List,
  Card,
  Tooltip,
  Switch
} from "antd";
import { FormItem } from "components/Form";
import SlideDown from "components/SlideDown";

const InTitleDescription = props => {
  return (
    <Card title="Advanced search" {...props}>
      <List>
        <List.Item>
          <Typography.Text>
            Surround phrases with quotes (") for exact match.
          </Typography.Text>
        </List.Item>
        <List.Item>
          <Typography.Text>
            Prepend words or phrases that must appear with a + symbol. Eg:
            +bitcoin
          </Typography.Text>
        </List.Item>
        <List.Item>
          <Typography.Text>
            Prepend words that must not appear with a - symbol. Eg: -bitcoin
          </Typography.Text>
        </List.Item>
        <List.Item>
          <Typography.Text>
            Alternatively you can use the AND / OR / NOT keywords, and
            optionally group these with parenthesis. Eg: crypto AND (ethereum OR
            litecoin) NOT bitcoin.
          </Typography.Text>
        </List.Item>
      </List>
    </Card>
  );
};

const Keywords = () => {
  const formik = useFormikContext();
  const [isAdvancedSearchVisible, setAdvancedSearchVisible] = useState(false);

  return (
    <>
      <FormItem label="Keywords" name="keywords" required>
        <Input
          value={formik.values.keywords}
          onChange={e => formik.setFieldValue("keywords", e.target.value)}
          onBlur={() => formik.setFieldTouched("keywords")}
        />
      </FormItem>
      <Row type="flex" gutter={8}>
        <Col xs={24} md={12}>
          <FormItem name="inTitle">
            <Row type="flex" gutter={8} align="middle">
              <Col>
                <Checkbox
                  checked={formik.values.inTitle}
                  onChange={e =>
                    formik.setFieldValue("inTitle", e.target.checked)
                  }
                  onBlur={() => formik.setFieldTouched("inTitle")}
                >
                  Search in the article title only
                </Checkbox>
              </Col>
              <Col>
                <Tooltip title="Keywords or phrases to search for in the article title only.">
                  <Button type="link" style={{ padding: 0 }}>
                    <Icon type="info-circle" />
                  </Button>
                </Tooltip>
              </Col>
            </Row>
          </FormItem>
        </Col>
        <Col xs={24} md={12}>
          <FormItem>
            <Row type="flex" gutter={8} align="middle">
              <Col>Advanced Search</Col>
              <Col>
                <Switch
                  checked={isAdvancedSearchVisible}
                  onChange={v => setAdvancedSearchVisible(v)}
                />
              </Col>
            </Row>
          </FormItem>
        </Col>
      </Row>
      <SlideDown open={isAdvancedSearchVisible}>
        <InTitleDescription style={{ marginBottom: "1rem" }} />
      </SlideDown>
    </>
  );
};

export default Keywords;
