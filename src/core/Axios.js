'use strict';
var dispatchRequest = require('./dispatchRequest');
var InterceptorManager = require('./InterceptorManager');

function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  };
}

Axios.prototype.request = function request(config) {
  // 处理 config
  if(typeof config === 'string'){
    config = arguments[1] || {};
    config.url = arguments[0];
  }
  if (config.method) {
    config.method = config.method.toLowerCase();// 转换成小写
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  const chain = [{
    resolved: dispatchRequest,
    rejected: undefined,
  }]

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

module.exports = Axios;