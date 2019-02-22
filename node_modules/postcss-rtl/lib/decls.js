'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var rtlcss = require('rtlcss');

var getProcessedKeyframeValue = function getProcessedKeyframeValue(decl) {
  var keyframes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var dir = arguments[2];

  var value = decl.value;
  keyframes.forEach(function (keyframe) {
    var nameRegex = new RegExp('(^|\\s)' + keyframe + '($|\\s)');
    if (!value.match(nameRegex)) return;
    value = value.replace(nameRegex, ' ' + keyframe + '-' + dir + ' ');
  });
  return value;
};

var rtlifyDecl = function rtlifyDecl(decl, keyframes) {
  var prop = decl.prop,
      value = decl.value;


  if (decl.prop.match(/animation/)) {
    value = getProcessedKeyframeValue(decl, keyframes, 'rtl');
  } else {
    var rtlResult = rtlcss.process(decl, null, null);

    if (rtlResult === decl.toString()) {
      return null;
    }

    var _ref = rtlResult.match(/([^:]*):\s*(.*)/) || [];

    var _ref2 = _slicedToArray(_ref, 3);

    prop = _ref2[1];
    value = _ref2[2];


    value = value.replace(/\s*!important/, '');
  }
  return { prop: prop, value: value };
};

var ltrifyDecl = function ltrifyDecl(decl, keyframes) {
  if (decl.prop.match(/animation/)) {
    decl.value = getProcessedKeyframeValue(decl, keyframes, 'ltr');
  }
  return decl;
};

module.exports = {
  ltrifyDecl: ltrifyDecl,
  rtlifyDecl: rtlifyDecl
};