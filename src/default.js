"use strict";
import xhrAdapter from "./adapters/xhr";
import httpAdapter from "./adapters/http";

const getDefaultAdapter = () => {
  let adapter;
  if (typeof XMLHttpRequest !== "undefined") {
    // 浏览器环境
    adapter = xhrAdapter;
  } else if (
    typeof process !== "undefined" &&
    Object.prototype.toString.call(process) === "[object process]"
  ) {
    // node环境
    adapter = httpAdapter;
  }
  return adapter;
};
const defaults = {
  method: "get",
  timeout: 0,
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
    },
  },
  adapter: getDefaultAdapter(),
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
