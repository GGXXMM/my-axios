'use strict';
import defaults from '../default';
import transform from './transform';

function transformResponseData(res) {
  res.data = transform(res.data, res.headers, res.config.transformResponse);
  return res;
}
export default function dispatchRequest(config) {
  const adapter = config.adapter || defaults.adapter;
  // 发送请求
  return adapter(config).then((res) => transformResponseData(res));
}