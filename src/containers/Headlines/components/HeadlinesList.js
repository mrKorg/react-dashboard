import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Col, Row, Table, Pagination, Spin } from "antd";
import ArticlePreview from "components/ArticlePreview";
import TableTimestamp from "components/TableTimestamp";
import { GRID_MODES, ARTICLE_MODES } from "helpers/constants";

const HeadlinesList = ({ data, loading, onChange, params, mode }) => {
  useEffect(() => {
    console.log("HeadlinesList mount");
  }, []);

  const columns = [
    {
      title: "Article",
      key: "article",
      render: (_, record) => (
        <ArticlePreview data={record} mode={ARTICLE_MODES.IN_TABLE} />
      )
    },
    {
      title: "Date",
      key: "publishedAt",
      width: 200,
      render: (_, record) => <TableTimestamp timestamp={record.publishedAt} />
    }
  ];

  const pagination = {
    total: params.totalResults,
    pageSize: params.pageSize,
    current: params.page,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
    showQuickJumper: true
  };

  const renderPagination = () => (
    <div className="ant-table-pagination ant-pagination">
      <Pagination
        {...pagination}
        onChange={(page, pageSize) => onChange({ current: page, pageSize })}
        onShowSizeChange={(page, pageSize) =>
          onChange({ current: page, pageSize })
        }
      />
    </div>
  );

  const renderView = () => {
    switch (mode) {
      case GRID_MODES.TABLE:
        return (
          <Table
            loading={loading}
            dataSource={data}
            columns={columns}
            rowKey={(x, index) => index}
            pagination={pagination}
            onChange={onChange}
          />
        );
      case GRID_MODES.CARDS:
        return (
          <Spin spinning={loading}>
            <Row type="flex" gutter={[24, 24]}>
              {data.map((record, index) => (
                <Col xs={24} md={12} lg={6} key={index}>
                  <ArticlePreview data={record} mode={ARTICLE_MODES.CARD} />
                </Col>
              ))}
            </Row>
            {renderPagination()}
          </Spin>
        );
      case GRID_MODES.ROW:
        return (
          <Spin spinning={loading}>
            <Row type="flex" gutter={[24, 24]}>
              {data.map((record, index) => (
                <Col xs={24} key={index}>
                  <ArticlePreview data={record} mode={ARTICLE_MODES.ROW} />
                </Col>
              ))}
            </Row>
            {renderPagination()}
          </Spin>
        );
      default:
        return null;
    }
  };

  return renderView();
};

HeadlinesList.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(Object.keys(GRID_MODES).map(k => GRID_MODES[k]))
};

export default HeadlinesList;
