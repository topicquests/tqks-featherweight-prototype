"use strict";

/* eslint-env node */

var errors = require("@feathersjs/errors");
var debug = require("debug")("authManagement:verifySignup");

var _require = require("./helpers"),
  getUserData = _require.getUserData,
  ensureObjPropsValid = _require.ensureObjPropsValid,
  ensureValuesAreStrings = _require.ensureValuesAreStrings,
  notifier = _require.notifier;

module.exports.verifySignupWithLongToken = function(options, verifyToken) {
  return Promise.resolve().then(function() {
    ensureValuesAreStrings(verifyToken);

    return verifySignup(
      options,
      { verifyToken: verifyToken },
      { verifyToken: verifyToken }
    );
  });
};

module.exports.verifySignupWithShortToken = function(
  options,
  verifyShortToken,
  identifyUser
) {
  return Promise.resolve().then(function() {
    ensureValuesAreStrings(verifyShortToken);
    ensureObjPropsValid(identifyUser, options.identifyUserProps);

    return verifySignup(options, identifyUser, {
      verifyShortToken: verifyShortToken
    });
  });
};

function verifySignup(options, query, tokens) {
  debug("verifySignup", query, tokens);
  var users = options.app.service(options.service);
  var usersIdName = users.id;
  var sanitizeUserForClient = options.sanitizeUserForClient;

  return users
    .find({ query: query })
    .then(function(data) {
      return getUserData(data, [
        "isNotVerifiedOrHasVerifyChanges",
        "verifyNotExpired"
      ]);
    })
    .then(function(user) {
      if (
        !Object.keys(tokens).every(function(key) {
          return tokens[key] === user[key];
        })
      ) {
        return eraseVerifyProps(user, user.isVerified).then(function() {
          throw new errors.BadRequest(
            "Invalid token. Get for a new one. (authManagement)",
            { errors: { $className: "badParam" } }
          );
        });
      }

      return eraseVerifyProps(
        user,
        user.verifyExpires > Date.now(),
        user.verifyChanges || {}
      )
        .then(function(user1) {
          return notifier(options.notifier, "verifySignup", user1);
        })
        .then(function(user1) {
          return sanitizeUserForClient(user1);
        });
    });

  function eraseVerifyProps(user, isVerified, verifyChanges) {
    var patchToUser = Object.assign({}, verifyChanges || {}, {
      isVerified: isVerified,
      verifyToken: null,
      verifyShortToken: null,
      verifyExpires: null,
      verifyChanges: {}
    });

    return patchUser(user, patchToUser);
  }

  function patchUser(user, patchToUser) {
    return users
      .patch(user[usersIdName], patchToUser, {}) // needs users from closure
      .then(function() {
        return Object.assign(user, patchToUser);
      });
  }
}
