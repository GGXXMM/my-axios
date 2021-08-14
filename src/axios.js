'use strict';

var defaults = require('./default');

// 创建axios实例
function createInstance() {

}
const axios = createInstance(defaults);

// 支持 es module、commonjs模块导出
export default axios;
module.exports.default = axios;