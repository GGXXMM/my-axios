'use strict';
function InterceptorManager() {
  this.interceptors = [];
}

InterceptorManager.prototype.use = function use(resolved, rejected) {
  this.interceptors.push({
    resolved,
    rejected,
  });
  return this.interceptors.length - 1;
};

InterceptorManager.prototype.forEach = function forEach(fn) {
  this.interceptors.forEach((interceptor) => {
    if (interceptor !== null) {
      fn(interceptor);
    }
  });
};

InterceptorManager.prototype.eject = function eject(id) {
  if (this.interceptors[id]) {
    this.interceptors[id] = null;
  }
};

module.exports = InterceptorManager;
