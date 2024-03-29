'use strict';
class InterceptorManager{
  constructor() {
    // 存储拦截器数组
    this.interceptors = [];
  }
  // 向数组推入拦截器对象
  use(resolved, rejected) {
    this.interceptors.push({
      resolved,
      rejected,
    });
    return this.interceptors.length - 1;
  }
  // 遍历数组
  forEach(fn) {
    this.interceptors.forEach((interceptor) => {
      if (interceptor !== null) {
        fn(interceptor);
      }
    });
  }
  // 根据索引删除拦截器
  eject(id) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }
}

export default InterceptorManager;
