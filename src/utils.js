/**
 * 对象/数组遍历函数
 * @param {Object|Array} obj
 * @param {Function} fn
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, { allOwnKeys = false } = {}) {
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
const extend = (to, from, ctx) => {
  // 继承方法
  Object.getOwnPropertyNames(from).forEach((key)=> {
    to[key] = from[key].bind(ctx);
  });
  // 继承 ctx 自身属性
  for(let val in ctx) {
    if(ctx.hasOwnProperty(val)) {
      to[val] = ctx[val];
    }
  }
  return to;
}

// 判断是否是数组
const { isArray } = Array;


export default {
    forEach,
    isArray,
    extend
}