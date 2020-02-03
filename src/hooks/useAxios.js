import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import produce from "immer";
import hash from "object-hash";

import API from "utils/request";

const actions = {
  REQUEST_START: "REQUEST_START",
  REQUEST_SUCCESS: "REQUEST_SUCCESS",
  REQUEST_FAILURE: "REQUEST_FAILURE"
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.REQUEST_START:
      return produce(state, draft => {
        draft.loading = true;
      });
    case actions.REQUEST_SUCCESS:
      return produce(state, draft => {
        draft.loading = false;
        draft.response = action.payload;
        draft.error = null;
      });
    case actions.REQUEST_FAILURE:
      return produce(state, draft => {
        draft.loading = false;
        draft.error = action.payload;
        draft.response = null;
      });
    default:
      return state;
  }
};

export default (url, reqConfig = {}, trigger) => {
  const [innerTrigger, setInnerTrigger] = useState(0); // to re-trigger the axios call
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    response: null,
    error: null
  });

  const source = axios.CancelToken.source();
  const reqConfigHash = hash(reqConfig);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: actions.REQUEST_START });
      try {
        const response = await API.request({
          url,
          ...reqConfig,
          cancelToken: source.token
        });
        if (response.data === "An error occurred while running the query.") {
          // special case only for metabase query errors
          dispatch({
            type: actions.REQUEST_FAILURE,
            payload: "Metabase Error"
          });
        } else {
          dispatch({ type: actions.REQUEST_SUCCESS, payload: response.data });
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          dispatch({ type: actions.REQUEST_FAILURE, payload: err });
        }
      }
    };

    if (url) {
      fetchData();
    }

    return () => {
      source.cancel();
    };
    // reqConfigHash is the hash of reqConfig object, by default react does === comparison
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, url, reqConfigHash, innerTrigger]);

  return [
    state.loading,
    state.response,
    state.error,
    () => {
      setInnerTrigger(+new Date());
    }
  ];
};
