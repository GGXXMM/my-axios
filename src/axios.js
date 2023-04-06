import Axios from './core/Axios';
import defaults from './default';
import mergeConfig from './core/mergeConfig';

// 创建 axios 实例的工厂函数
function createInstance(defaultConfig) {
  // 创建 axios 实例
  const context = new Axios(defaultConfig)
  // 变量 instance 保存了 Axios 类上的 request 方法
  const instance = Axios.prototype.request.bind(context)
  return instance;
}

const axios = createInstance(defaults);

// 支持 create 创建请求，并自定义配置
axios.create = function(config) {
  return createInstance(mergeConfig(defaults, config));
}

// 支持 es module、commonjs模块导出
export default axios;
module.exports.default = axios;