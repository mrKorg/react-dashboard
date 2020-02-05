import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import ArticlePreview from "components/ArticlePreview";
import TableTimestamp from "components/TableTimestamp";

const HeadlinesList = ({ data, loading, onTableChange, params }) => {
  useEffect(() => {
    console.log("HeadlinesList mount");
  }, []);

  const columns = [
    {
      title: "Article",
      key: "article",
      render: (_, record) => <ArticlePreview data={record} mode="IN_TABLE" />
    },
    {
      title: "Date",
      key: "publishedAt",
      width: 200,
      render: (_, record) => <TableTimestamp  timestamp={record.publishedAt}/>
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

  return (
    <Table
      loading={loading}
      dataSource={data}
      columns={columns}
      rowKey={(x, index) => index}
      pagination={pagination}
      onChange={onTableChange}
    />
  );
};

HeadlinesList.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onTableChange: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

export default HeadlinesList;
