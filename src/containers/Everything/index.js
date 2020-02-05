import React, { useEffect, useReducer, useState } from "react";
import produce from "immer";
import { PAGE_SIZE } from "helpers/constants";
import Form from "./components/Form/index";
import ResultsModal from "./components/ResultsModal";

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
        if (action?.filter) {
          if (action.filter?.keywords) {
            draft.q = action.filter.keywords;
          }
          if (action.filter?.inTitle) {
            draft.q = null;
            draft.qInTitle = action.filter.keywords;
          }
          if (action.filter?.language) {
            draft.language = action.filter.language;
          }
          if (action.filter?.from) {
            draft.from = action.filter.from;
          }
          if (action.filter?.to) {
            draft.to = action.filter.to;
          }
          draft.page = 1;
        }
        break;
      case "SEARCH":
        draft.q = action.value;
        draft.page = 1;
        break;
      default:
        break;
    }
  });

const Everything = () => {
  useEffect(() => {
    console.log("Everything mount");
  }, []);

  const [isResultsShow, setResultsShow] = useState(false);
  const [params, paramsDispatch] = useReducer(paramsReducer, {
    pageSize: PAGE_SIZE,
    page: 1,
    q: null,
    qInTitle: null,
    from: null,
    to: null,
    language: null,
    sortBy: null
  });

  const onSubmitForm = async filter => {
    paramsDispatch({ type: "FILTER", filter });
    setResultsShow(true);
  };

  const onTableChange = (pagination, filters, sorter) =>
    paramsDispatch({ type: "TABLE", pagination, filters, sorter });

  return (
    <>
      <Form onSubmit={onSubmitForm} />
      {isResultsShow && (
        <ResultsModal
          isOpen={isResultsShow}
          params={params}
          onClose={() => {
            setResultsShow(false);
          }}
          onTableChange={onTableChange}
        />
      )}
    </>
  );
};

export default Everything;
