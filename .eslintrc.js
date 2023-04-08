module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "babel-eslint",
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    strict: "off", // 严格模式，规则关闭
    "no-console": "off", // 禁用 console 对象方法，规则关闭
    "global-require": "off", // 要求 require() 出现在顶层模块作用域中，规则关闭
    "require-yield": "off", // 要求 generator 函数内有 yield，规则关闭
  },
};
