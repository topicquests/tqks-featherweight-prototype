"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setupAuthState;
function setupAuthState(_ref) {
  var userService = _ref.userService;

  var state = {
    accessToken: null, // The JWT
    payload: null, // The JWT payload

    isAuthenticatePending: false,
    isLogoutPending: false,

    errorOnAuthenticate: null,
    errorOnLogout: null,
    user: null
    // If a userService string was passed, add a user attribute
  };if (userService) {
    Object.assign(state, { userService: userService });
  }
  return state;
}
module.exports = exports["default"];