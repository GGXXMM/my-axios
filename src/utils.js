"use strict";
/**
 * 对象/数组遍历函数
 * @param {Object|Array} obj
 * @param {Function} fn
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
export function forEach(obj, fn, { allOwnKeys = false } = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === "undefined") {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== "object") {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys
      ? Object.getOwnPropertyNames(obj)
      : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

// 继承
export const extend = (to, from, ctx) => {
  // 继承方法
  Object.getOwnPropertyNames(from).forEach((key) => {
    to[key] = from[key].bind(ctx);
  });
  // 继承 ctx 自身属性
  for (let val in ctx) {
    if (ctx.hasOwnProperty(val)) {
      to[val] = ctx[val];
    }
  }
  return to;
};

// 判断是否是日期
export const isDate = (val) => {
  return Object.prototype.toString.call(val) === "[object Date]";
};

// 判断是否是对象
export const isPlainObject = (val) => {
  return Object.prototype.toString.call(val) === "[object Object]";
};

// 判断是否是数组
const { isArray } = Array;

export const isURLSearchParams = (val) => {
  return typeof val !== "undefined" && val instanceof URLSearchParams;
};

// 判断是否是相同域
const urlParsingNode = document.createElement("a");
const currentOrigin = _resolveURL(window.location.href);

function _resolveURL(url) {
  urlParsingNode.setAttribute("href", url);
  const { protocol, host } = urlParsingNode;
  return {
    protocol,
    host,
  };
}
export function isURLSameOrigin(requestURL) {
  const parsedOrigin = _resolveURL(requestURL);
  return (
    parsedOrigin.protocol === currentOrigin.protocol &&
    parsedOrigin.host === currentOrigin.host
  );
}

// 深度合并拷贝
export const deepMerge = (...objs) => {
  const result = Object.create(null);
  objs.forEach((obj) => {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key];
        if (isPlainObject(obj)) {
          result[key] = deepMerge(val);
        } else {
          result[key] = val;
        }
      });
    }
  });
  return result;
};
