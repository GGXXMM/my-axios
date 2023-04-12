"use strict";
import { deepMerge, isPlainObject } from "../utils";

const strats = Object.create(null);

// 默认策略：val2 为用户配置的值，用户配置不为空则使用，否则使用默认配置 val1
function defaultStrat(val1, val2) {
  return typeof val2 === "undefined" ? val2 : val1;
}

// 'url', 'params', 'data' 三种属性，只使用用户配置
function fromVal2Strat(val1, val2) {
  if (typeof val2 !== "undefined") {
    return val2;
  }
}

// 深度合并策略
function deepMergeStrat(val1, val2) {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2);
  } else if (typeof val2 !== "undefined") {
    return val2;
  } else if (isPlainObject(val1)) {
    return deepMerge(val1);
  } else {
    return val1;
  }
}
const stratKeysFromVal2 = ["url", "params", "data"];

stratKeysFromVal2.forEach((key) => {
  strats[key] = fromVal2Strat;
});

// 'header'、'auth' 两种属性需要深度合并
const stratKeysDeepMerge = ["headers", "auth"];

stratKeysDeepMerge.forEach((key) => {
  strats[key] = deepMergeStrat;
});
/**
 *
 * @param {Object} config1
 * @param {Object} config2
 * @return {Object} 将config2、config1合并
 */
export default function mergeConfig(config1, config2) {
  if (!config2) {
    config2 = {};
  }

  let config = Object.create(null);

  // 遍历用户配置
  for (let key in config2) {
    mergeField(key);
  }
  // 遍历默认配置
  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    // "策略模式"，不同的字段采用不同的策略函数，避免多个 if/else 判断
    const strat = strats[key] || defaultStrat;
    config[key] = strat(config1[key], config2[key]);
  }
  return config;
}
