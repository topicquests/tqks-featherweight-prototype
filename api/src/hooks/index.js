module.exports = {
  // inject hooks

  isEnabled: require("./is-enabled.js"),
  isVerified: require("./is-verified"),
  logger: require("./log.js"),
  validateSignon: require("./validate-signon")

  // end inject hooks
};
