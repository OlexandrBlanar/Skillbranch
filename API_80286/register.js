require("babel-register");
require("babel-polyfill");
require("babel-core").transform("code", {
  plugins: ["transform-async-to-module-method"]
});
require("./index.js");
