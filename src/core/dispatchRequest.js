'use strict';

var defaults = require('../default');
var transform = require('./transform');

function transformResponseData(res) {
  res.data = transform(res.data, res.headers, res.config.transformResponse);
  return res;
}
function dispatchRequest(config) {
  const adapter = config.adapter || defaults.adapter;
  // 发送请求
  return adapter(config).then((res) => transformResponseData(res));
}

module.exports = dispatchRequest;