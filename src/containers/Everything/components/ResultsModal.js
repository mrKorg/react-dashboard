import React from "react";
import PropTypes from "prop-types";
import { Alert, Modal, Table } from "antd";
import { useAxios } from "hooks";

const ResultsModal = ({ isOpen, onClose, params, onTableChange }) => {
  const [loading, response, error] = useAxios("/top-headlines", { params });
  const { articles = [], totalResults = 0 } = response || {};

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
    }
  ];

  const pagination = {
    total: totalResults,
    pageSize: params.pageSize,
    current: params.page,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
    showQuickJumper: true
  };

  return isOpen ? (
    <Modal
      title="Search results"
      visible={isOpen}
      width={800}
      footer={false}
      onCancel={onClose}
    >
      {error ? (
        <Alert type="error" message="Sorry, something went wrong there." />
      ) : (
        <Table
          loading={loading}
          dataSource={articles}
          columns={columns}
          rowKey={(x, index) => index}
          pagination={pagination}
          onChange={onTableChange}
        />
      )}
    </Modal>
  ) : null;
};

ResultsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onTableChange: PropTypes.func.isRequired
};

export default ResultsModal;
