import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

const HeadlinesList = ({ data, loading, onTableChange, params }) => {
  useEffect(() => {
    console.log("HeadlinesList mount");
  }, []);

  const columns = [
    {
      title: "Title",
      key: "title",
      render: (_, record) => (
        <>
          <>{record.title}</>
          <>{record.description}</>
        </>
      )
    },
    {
      title: "Author",
      key: "author",
      width: 200,
      render: (_, record) => <>{record.author}</>
    },
    {
      title: "Date",
      key: "publishedAt",
      width: 200,
      render: (_, record) => <>{record.publishedAt}</>
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
