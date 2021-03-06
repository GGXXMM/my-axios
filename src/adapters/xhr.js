'use strict';

module.exports = function xhrAdapter(config) {
  return new Promise((resolve, reject) => {
    let {
      data = null,
      url,
      method = "get",
      headers = {},
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
    } = config;

    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }
    // 判断是否有超时的配置，如果有则给request添加超时属性
    if (timeout) {
      request.timeout = timeout;
    }

    if (withCredentials) {
      request.withCredentials = withCredentials;
    }

    request.open(method.toUpperCase(), url, true);

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 0) {
        return;
      }
  
      const responseData =
        responseType && responseType !== "text"
          ? request.response
          : request.responseText;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request,
      };
      // 如果状态码在 200-300 之间正常 resolve，否则 reject 错误
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject();
      }
    };
    // 监听错误
    request.onerror = () => {
      reject();
    };
    // 监听超时
    request.ontimeout = () => {
      // ECONNABORTED 通常表示一个被中止的请求
      reject();
    };

    request.send(data);
  });
};
