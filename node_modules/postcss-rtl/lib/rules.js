'use strict';

var rtlcss = require('rtlcss');

var _require = require('./selectors'),
    isSelectorHasDir = _require.isSelectorHasDir,
    addDirToSelectors = _require.addDirToSelectors;

var getDirRule = function getDirRule(rule, dir, options) {
  var next = rule.next();
  var selector = rule.selector;

  selector = isSelectorHasDir(selector, options) ? selector : addDirToSelectors(selector, dir, options);

  if (rule.selector === selector) {
    return rule;
  } else if (next && next.selector === selector) {
    return next;
  } else {
    return rule.cloneAfter({ selector: selector }).removeAll();
  }
};

var setRuleDir = function setRuleDir(rule, dir, options) {
  var selector = rule.selector;

  rule.selector = isSelectorHasDir(selector, options) ? selector : addDirToSelectors(selector, dir, options);
};

var rtlifyRule = function rtlifyRule(rule) {
  var rtlResult = rtlcss.process(rule, null, null);

  return rtlResult !== rule.toString() ? rtlResult : false;
};

var processSrcRule = function processSrcRule(rule, options) {
  if (rule.nodes.length === 0) {
    rule.remove();
  } else {
    setRuleDir(rule, null, options);
  }
};

module.exports = {
  getDirRule: getDirRule,
  setRuleDir: setRuleDir,
  rtlifyRule: rtlifyRule,
  processSrcRule: processSrcRule
};