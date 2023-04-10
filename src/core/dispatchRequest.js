'use strict';
import { buildURL } from '../helpers/url';
import transform from './transform';
import defaults from '../default';

const transformURL = config => {
  const {url, params} = config;
  return buildURL(url, params);
}
const processConfig = config => {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest);
}
const transformResponseData = res => {
  res.data = transform(res.data, res.headers, res.config.transformResponse);
  return res;
}
export default function dispatchRequest(config) {
  const adapter = config.adapter || defaults.adapter;
  // 处理传入的配置
  processConfig(config)
  // 发送请求
  return adapter(config).then((res) => transformResponseData(res));
}