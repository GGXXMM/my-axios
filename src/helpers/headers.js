"use strict";
/**
 * 处理headers
 */
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
