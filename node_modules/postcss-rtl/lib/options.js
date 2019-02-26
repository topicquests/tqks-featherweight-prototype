'use strict';

var defaultOptions = {
  addPrefixToSelector: false, // customized function for joining prefix and selector
  prefixType: 'attribute', // type of dir-prefix: attribute [dir] or class .dir,
  onlyDirection: false // "ltr", "rtl": compile only one-direction version
};

var validateOptions = function validateOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var addPrefixToSelector = options.addPrefixToSelector,
      prefixType = options.prefixType,
      onlyDirection = options.onlyDirection;

  var fixedOptions = {};

  if (addPrefixToSelector && typeof addPrefixToSelector !== 'function') {
    fixedOptions.addPrefixToSelector = defaultOptions.addPrefixToSelector;
    console.warn('Incorrect **addPrefixToSelector option. Must be a function');
  }

  if (onlyDirection && typeof onlyDirection !== 'string') {
    fixedOptions.onlyDirection = defaultOptions.onlyDirection;
    console.warn('Incorrect onlyDirection option. Allowed values: ltr, rtl');
  }

  if (prefixType && ['attribute', 'class'].indexOf(prefixType) < 0) {
    fixedOptions.prefixType = defaultOptions.prefixType;
    console.warn('Incorrect prefixType option. Allowed values: attribute, class');
  }

  return Object.assign({}, defaultOptions, options, fixedOptions);
};

module.exports = {
  validateOptions: validateOptions
};