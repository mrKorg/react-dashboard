/*
 *  TODO::
 *  This hook won't be needed when `react-router` ships with
 *  its own hook implementation.
 */
import { useContext } from "react";
import { __RouterContext } from "react-router";

// import useForceUpdate from './useForceUpdate';

const useRouter = () => useContext(__RouterContext);

const useParams = () => {
  const { match } = useRouter();
  return match.params;
};

const useLocation = () => {
  const { location, history } = useRouter();

  function navigate(to, { replace = false } = {}) {
    if (replace) {
      history.replace(to);
    } else {
      history.push(to);
    }
  }

  return {
    location,
    navigate
  };
};

export { useParams, useLocation };

export default useRouter;
