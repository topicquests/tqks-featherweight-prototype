"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setupVuePlugin;
function setupVuePlugin(globalModels) {
  return {
    install: function install(Vue, options) {
      Vue.$FeathersVuex = globalModels;
      Vue.prototype.$FeathersVuex = globalModels;
    }
  };
}
module.exports = exports["default"];