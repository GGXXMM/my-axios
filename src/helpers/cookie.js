"use strict";

const cookie = {
  // 获取cookie某个字段值
  read(name) {
    let match = document.cookie.match(
      new RegExp("(^|;\\s*)(" + name + ")=([^;]*)")
    );
    return match ? decodeURIComponent(match[3]) : null;
  },
};

export default cookie;
