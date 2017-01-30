require("babel-register");
require("babel-polyfill");
require("babel-core").transform("code", {
  plugins: ["transform-async-to-module-method"]
});
require("./src/index.js");
console.log("Hello world!");
