import React, { useEffect, useReducer } from "react";
import produce from "immer";
import { useAxios } from "hooks";
import { PAGE_SIZE } from "helpers/constants";
import { Col, Row, Alert } from "antd";
import HeadlinesList from "./components/HeadlinesList";
import HeadlinesFilter from "./components/HeadlinesFilter";

const paramsReducer = (state, action) =>
  produce(state, draft => {
    switch (action?.type) {
      case "TABLE":
        draft.page = action.pagination?.current || 1;
        if (action.pagination?.pageSize !== draft.pageSize) {
          draft.pageSize = action.pagination.pageSize;
          draft.page = 1;
        }
        break;
      case "FILTER":
        if (action.country) {
          draft.country = action.country;
        }
        if (action.category) {
          draft.category = action.category;
        }
        draft.page = 1;
        break;
      case "SEARCH":
        draft.q = action.value;
        draft.page = 1;
        break;
      default:
        break;
    }
  });

const Headlines = () => {
  useEffect(() => {
    console.log("Headlines mount");
  }, []);

  const [params, paramsDispatch] = useReducer(paramsReducer, {
    pageSize: PAGE_SIZE,
    country: "us",
    page: 1,
    category: null,
    q: null
  });
  const [loading, response, error] = useAxios("/top-headlines", { params });
  const { articles = [], totalResults = 0 } = response || {};

  const onTableChange = (pagination, filters, sorter) =>
    paramsDispatch({ type: "TABLE", pagination, filters, sorter });
  const onChangeCountry = data =>
    paramsDispatch({ type: "FILTER", country: data });
  const onChangeCategory = data =>
    paramsDispatch({ type: "FILTER", category: data });
  const onSearch = value => paramsDispatch({ type: "SEARCH", value });

  return error ? (
    <Alert type="error" message="Sorry, something went wrong there." />
  ) : (
    <Row type="flex" gutter={24}>
      <Col xs={24} lg={6}>
        <HeadlinesFilter
          values={params}
          onSearch={onSearch}
          onChangeCountry={onChangeCountry}
          onChangeCategory={onChangeCategory}
        />
      </Col>
      <Col xs={24} lg={18}>
        <HeadlinesList
          loading={loading}
          data={articles}
          onTableChange={onTableChange}
          params={{ ...params, totalResults }}
        />
      </Col>
    </Row>
  );
};

export default Headlines;
