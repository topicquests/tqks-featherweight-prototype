'use strict';

var prefixes = require('./prefixes-config');

var isSelectorHasDir = function isSelectorHasDir() {
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var _ref = arguments[1];
  var prefixType = _ref.prefixType;
  return !!selector.match(prefixes[prefixType].regex);
};

var isHtmlSelector = function isHtmlSelector() {
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return !!selector.match(/^html/);
};

var isRootSelector = function isRootSelector() {
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return !!selector.match(/:root/);
};

var addDirToSelectors = function addDirToSelectors() {
  var selectors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var dir = arguments[1];
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var addPrefixToSelector = options.addPrefixToSelector,
      prefixType = options.prefixType;

  var prefix = prefixes[prefixType].prefixes[dir];
  if (!prefix) return selectors;

  return selectors.split(/\s*,\s*/).map(function (selector) {
    if (addPrefixToSelector) {
      selector = addPrefixToSelector(selector, prefix);
    } else if (isHtmlSelector(selector)) {
      // only replace `html` at the beginning of selector
      selector = selector.replace(/^html/ig, 'html' + prefix);
    } else if (isRootSelector(selector)) {
      selector = selector.replace(/:root/ig, prefix + ':root');
    } else {
      // add prefix without html for least change of the priority level
      selector = prefix + ' ' + selector;
    }
    return selector;
  }).join(', ');
};

module.exports = {
  isSelectorHasDir: isSelectorHasDir,
  isHtmlSelector: isHtmlSelector,
  isRootSelector: isRootSelector,
  addDirToSelectors: addDirToSelectors
};