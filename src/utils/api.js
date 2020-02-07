import axios from "axios";
/**
 * Represents a api.
 * @constructor
 * @param { url = "",  headers = "",  params = "",  body = "",  method = "['get','put','post','patch']"} payload - The request payload
 */
export default function api({
  url = "",
  headers = "",
  params = "",
  body = "",
  method = ""
} = {}) {
  const methods = ["put", "post", "patch", "delete"];

  if (body) {
    if (methods.indexOf(method) !== -1) {
      switch (methods[methods.indexOf(method)]) {
        case "put":
          return axios
            .put(url, body, {
              headers
            })
            .then(response => {
              return response;
            })
            .catch(error => {
              throw error.response;
            });
        case "post":
          return axios
            .post(url, body, {
              headers
            })
            .then(response => {
              return response;
            })
            .catch(error => {
              throw error.response;
            });
        case "delete":
          return axios({
            method: "delete",
            url: url,
            data: body,
            headers: headers
          })
            .then(response => {
              return response;
            })
            .catch(error => {
              throw error.response;
            });
        case "patch":
          return axios
            .patch(url, body, {
              headers
            })
            .then(response => {
              return response;
            })
            .catch(error => {
              throw error.response;
            });
        default:
          break;
      }
    }
  } else {
    return axios
      .get(url, {
        params: params,
        headers
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        throw error.response;
      });
  }
}
