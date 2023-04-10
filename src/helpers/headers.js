"use strict";
import { isPlainObject } from "../utils";

export const normalizeHeaderName = (headers, normalizedName) => {
  if (!headers) {
    return;
  }
  // 遍历所有 headers
  Object.keys(headers).forEach((name) => {
    // 处理这种情况 如果 name 是 content-type，normalizedName 是 Content-Type，则统一使用 Content-Type
    // 并且删除 content-type。
    if (
      name !== normalizedName &&
      name.toUpperCase() === normalizedName.toUpperCase()
    ) {
      headers[normalizedName] = headers[name];
      delete headers[name];
    }
  });
};
// 处理headers，添加 content-type
export const processHeaders = (headers, data) => {
  normalizeHeaderName(headers, "Content-Type");
  // 如果 data 是对象，则设置上 'Content-Type'
  if (isPlainObject(data)) {
    if (headers && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json;charset=utf-8";
    }
  }
  return headers;
};
// 解析headers
export const parseHeaders = (headers) => {
  let parsed = {};
  if (!headers) return parsed;

  headers.split("\r\n").forEach((line) => {
    let i = line.indexOf(":");
    let key = line.substring(0, i).trim().toLowerCase();
    let val = line.substring(i + 1).trim();
    if (!key) return;

    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
