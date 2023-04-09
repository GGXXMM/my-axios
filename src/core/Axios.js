"use strict";
import { forEach } from "../utils";
import dispatchRequest from "./dispatchRequest";
import InterceptorManager from "./InterceptorManager";
import mergeConfig from "./mergeConfig";

class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    };
  }
  /**
   * Dispatch a request
   */
  request(url, config) {
    // 处理 config
    if (typeof url === "string") {
      if (!config) {
        config = {};
      }
      config.url = url;
    } else {
      config = url;
    }

    // 合并config
    config = mergeConfig(this.defaults, config);

    const chain = [
      {
        resolved: dispatchRequest,
        rejected: undefined,
      },
    ];

    this.interceptors.request.forEach((interceptor) => {
      chain.unshift(interceptor);
    });

    this.interceptors.response.forEach((interceptor) => {
      chain.push(interceptor);
    });

    let promise = Promise.resolve(config);

    while (chain.length) {
      const { resolved, rejected } = chain.shift();
      promise = promise.then(resolved, rejected);
    }

    return promise;
  }
}

// Provide aliase for supported request methods
forEach(
  ["get", "delete", "head", "options"],
  function forEachMethodNoData(method) {
    Axios.prototype[method] = function (url, config) {
      return this.request(
        mergeConfig(config || {}, {
          method,
          url,
        })
      );
    };
  }
);

forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(
        mergeConfig(config || {}, {
          method,
          headers: isForm
            ? {
                "Content-Type": "multipart/form-data",
              }
            : {},
          url,
          data,
        })
      );
    };
  }
  Axios.prototype[method] = generateHTTPMethod();
  Axios.prototype[method + "Form"] = generateHTTPMethod(true);
});

export default Axios;
