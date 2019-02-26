'use strict';

var postcss = require('postcss');
var unprefixed = postcss.vendor.unprefixed;

var _require = require('./decls'),
    rtlifyDecl = _require.rtlifyDecl;

var _require2 = require('./rules'),
    rtlifyRule = _require2.rtlifyRule;

var isKeyframeRule = function isKeyframeRule(rule) {
  return rule.type === 'atrule' && unprefixed(rule.name) === 'keyframes';
};

var isKeyframeAlreadyProcessed = function isKeyframeAlreadyProcessed(rule) {
  return !!rule.params.match(/-ltr$|-rtl$/);
};

var isKeyframeSymmetric = function isKeyframeSymmetric(rule) {
  return !rtlifyRule(rule);
};

var rtlifyKeyframe = function rtlifyKeyframe(rule, options) {
  var ruleName = rule.params;

  rule.params = ruleName + '-ltr';

  if (!options.onlyDirection || options.onlyDirection === 'rtl') {
    var rtlRule = rule.cloneAfter({ params: ruleName + '-rtl' });

    rtlRule.walkDecls(function (decl) {
      var rtl = rtlifyDecl(decl);
      decl.value = rtl ? rtl.value : decl.value;
    });
  }

  if (options.onlyDirection && options.onlyDirection === 'rtl') {
    rule.remove();
  }
};

module.exports = {
  isKeyframeRule: isKeyframeRule,
  isKeyframeAlreadyProcessed: isKeyframeAlreadyProcessed,
  isKeyframeSymmetric: isKeyframeSymmetric,
  rtlifyKeyframe: rtlifyKeyframe
};