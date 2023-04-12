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
    // 定义一个数组，数组中存放发送真实请求的对象
    const chain = [
      {
        resolved: dispatchRequest,
        rejected: undefined,
      },
    ];
    // this.interceptors.request 通过遍历拦截器，插入 chain 数组的前面
    this.interceptors.request.forEach((interceptor) => {
      chain.unshift(interceptor);
    });
    // this.interceptors.response 通过遍历拦截，插入 chain 数组的后面
    this.interceptors.response.forEach((interceptor) => {
      chain.push(interceptor);
    });

    let promise = Promise.resolve(config);

    while (chain.length) {
      // 从 chain 数组，依次取出第一个元素，并返回后删除
      const { resolved, rejected } = chain.shift();
      // 借 promise 的复制，实现拦截器的链式调用
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
