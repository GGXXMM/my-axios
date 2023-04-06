import utils from '../utils';
import dispatchRequest  from './dispatchRequest';
import InterceptorManager from './InterceptorManager';
import mergeConfig from './mergeConfig';

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
  request(configOrUrl, config) {
    // 处理 config
    if(typeof config === 'string'){
      config = config || {};
      config.url = configOrUrl;
    }
    if (config.method) {
      config.method = config.method.toLowerCase();// 转换成小写
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase();
    } else {
      config.method = 'get';
    }
    // 合并config
    
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
}

// Provide aliase for supported request methods
utils.forEach(['get', 'delete', 'head', 'options'], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }))
  }
})

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }
  Axios.prototype[method] = generateHTTPMethod()
  Axios.prototype[method + 'Form'] = generateHTTPMethod(true)
})

export default Axios;