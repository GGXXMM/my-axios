'use strict';

var defaults = {
  method: 'get',
  timeout: 0,
  adapter: getDefaultAdapter()
}

// 适配器：兼容浏览器端和服务器端
function getDefaultAdapter() {
  let adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // web浏览器端
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // 服务器端
    adapter = require('./adapters/http');
  }
  return adapter;
}
module.exports = defaults;