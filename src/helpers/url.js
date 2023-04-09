"use strict";
import { isDate, isObject, isURLSearchParams } from "../utils";

export const encode = (val) => {
  return encodeURIComponent(val)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
};

export const buildURL = (url, params) => {
  // 如果 params 参数
  if (!params) return url;

  // 定义一个变量，用来保存最后拼接后的参数
  let serializedParams;
  if (isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    // 定义一个数组
    let parts = [];
    Object.keys(params).forEach((key) => {
      const val = params[key];
      if (val === null || typeof val === "undefined") return;

      let values = [];
      // 判断 val 是否是数组类型
      if (Array.isArray(val)) {
        values = val;
        key += "[]";
      } else {
        values = [val];
      }
      values.forEach((val) => {
        // 如果是日期对象
        if (isDate(val)) {
          // toISOString返回Date对象的标准的日期时间字符串格式的字符串
          val = val.toISOString();
        } else if (isObject(val)) {
          val = JSON.stringify(val);
        }
        // 处理参数结果
        parts.push(`${encode(key)}=${encode(val)}`);
      });
    });
    // 最后拼接数组
    serializedParams = parts.join("&");
  }

  if (serializedParams) {
    // 处理 hash 的情况
    const markIndex = url.indexOf("#");
    if (markIndex !== -1) {
      url = url.substring(0, markIndex);
    }
    // 拼接参数，兼容传入已经带有参数
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
};
