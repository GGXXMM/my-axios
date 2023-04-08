"use strict";
import xhrAdapter from "./adapters/xhr";
import httpAdapter from "./adapters/http";

const getDefaultAdapter = () => {
  let adapter;
  if (typeof XMLHttpRequest !== "undefined") {
    adapter = xhrAdapter;
  }else{
    adapter = httpAdapter;
  }
  return adapter;
};
const defaults = {
  method: "get",
  timeout: 0,
  Headers: {
    common: {
      Accept: "application/json, text/plain, */*",
    },
  },
  adapter: getDefaultAdapter()
};

const methodsNoData = ["delete", "get", "head", "options"];

methodsNoData.forEach((method) => {
  defaults.headers[method] = {};
});

const methodsWithData = ["post", "put", "patch"];

methodsWithData.forEach((method) => {
  defaults.headers[method] = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
});

export default defaults;
