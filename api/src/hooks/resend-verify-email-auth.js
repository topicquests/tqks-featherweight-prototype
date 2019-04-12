// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
      if (context.params.user.isVerified) {
        return context;
      } else {
        // Call Auth Mgmt to send a new email
      try {
        const identifyUser = {
          email: context.params.user.email
        };
        const payload = {
          action: 'resendVerifySignup',
          value: identifyUser,
        };
        await context.app.services.authManagement.create(payload);
        console.info('Auth', 'resend verify email auth', 'send verify email success');

      } catch (e) {
        console.error('Auth', 'resend verify email auth', 'unable to send verify email', e);
      }
        throw new errors.Forbidden('User is not verified, please check your email to verify');
      }
  };
};
