import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  let local;
  try {
    local = JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.error("There is no localStorage API");
  }

  if (!local) {
    localStorage.setItem(key, JSON.stringify(initialValue));
    local = initialValue;
  }

  const [state, _setState] = useState(local);
  const setState = updater => {
    _setState(old => {
      let res;
      if (typeof updater === undefined) {
        res = updater(old);
      } else {
        res = updater;
      }
      localStorage.setItem(key, JSON.stringify(res));
      return res;
    });
  };
  return [state, setState];
};

export default useLocalStorage;
