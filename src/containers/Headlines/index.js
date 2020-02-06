import React, { useReducer, useState } from "react";
import produce from "immer";
import { useAxios } from "hooks";
import { PAGE_SIZE } from "helpers/constants";
import { Alert, Row, Col, Button, Tooltip } from "antd";
import HeadlinesList from "./components/HeadlinesList";
import HeadlinesFilter from "./components/HeadlinesFilter";
import { GRID_MODES } from "helpers/constants";

const defaultParams = {
  pageSize: PAGE_SIZE,
  country: "us",
  page: 1,
  category: null,
  q: null
};

const paramsReducer = (state, action) =>
  produce(state, draft => {
    switch (action?.type) {
      case "PAGINATION":
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
      case "RESET":
        Object.keys(defaultParams).forEach(key => {
          draft[key] = defaultParams[key];
        });
        break;
      default:
        break;
    }
  });

const Headlines = () => {
  const [view, setView] = useState(GRID_MODES.TABLE);
  const [params, paramsDispatch] = useReducer(paramsReducer, defaultParams);
  const [loading, response, error] = useAxios("/top-headlines", { params });
  const { articles = [], totalResults = 0 } = response || {};

  const onPaginationChange = (pagination, filters, sorter) =>
    paramsDispatch({ type: "PAGINATION", pagination, filters, sorter });
  const onChangeCountry = data =>
    paramsDispatch({ type: "FILTER", country: data });
  const onChangeCategory = data =>
    paramsDispatch({ type: "FILTER", category: data });
  const onSearch = value => paramsDispatch({ type: "SEARCH", value });

  const renderActions = () => (
    <Row type="flex" gutter={12} style={{ marginBottom: 28 }}>
      <Col>
        <Tooltip title="Reset filter">
          <Button
            type="danger"
            icon="reload"
            onClick={() => paramsDispatch({ type: "RESET" })}
          />
        </Tooltip>
      </Col>
      <Col>
        <Tooltip title="Table view">
          <Button
            type={view === GRID_MODES.TABLE ? "primary" : null}
            icon="table"
            onClick={() => setView(GRID_MODES.TABLE)}
          />
        </Tooltip>
      </Col>
      <Col>
        <Tooltip title="Row view">
          <Button
            type={view === GRID_MODES.ROW ? "primary" : null}
            icon="unordered-list"
            onClick={() => setView(GRID_MODES.ROW)}
          />
        </Tooltip>
      </Col>
      <Col>
        <Tooltip title="Cards view">
          <Button
            type={view === GRID_MODES.CARDS ? "primary" : null}
            icon="pic-left"
            onClick={() => setView(GRID_MODES.CARDS)}
          />
        </Tooltip>
      </Col>
    </Row>
  );

  return error ? (
    <Alert type="error" message="Sorry, something went wrong there." />
  ) : (
    <>
      <Row type="flex" gutter={24} justify="space-between" align="bottom">
        <Col style={{ flex: "1 1 auto" }}>
          <HeadlinesFilter
            values={params}
            onSearch={onSearch}
            onChangeCountry={onChangeCountry}
            onChangeCategory={onChangeCategory}
          />
        </Col>
        <Col>{renderActions()}</Col>
      </Row>
      <HeadlinesList
        loading={loading}
        data={articles}
        onChange={onPaginationChange}
        params={{ ...params, totalResults }}
        mode={view}
      />
    </>
  );
};

export default Headlines;
