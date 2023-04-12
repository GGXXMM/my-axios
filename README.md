# 手写实现 axios 库

## 基本功能

### 一、发送请求

- [x] src/core/dispatchRequest.js

### 二、适配不同运行环境

- [x] src/default.js( getDefaultAdapter 方法)

### 三、拦截器

- [x] src/core/InterceptorManager.js

### 四、配置

#### 默认配置

- [x] src/default.js

#### 合并默认、自定义用户配置

- [x] src/core/mergeConfig.js

### 五、转换请求/响应数据

- [x] src/helpers/data.js

### 六、携带 cookie

- [x] src/adapters/xhr.js( withCredentials 字段)

### 七、取消请求

- [x] src/cancel/CancelToken.js

### 八、安全防御 csrf

- [x] src/adapters/xhr.js( xsrfCookieName、xsrfHeaderName 字段)

> 参考：https://juejin.cn/post/6914138611789070349
