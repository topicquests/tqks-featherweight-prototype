const Console = console;
module.exports = function(app) {
  const emailConfig = app.get('emailconfig');
  const baseURL = app.get('baseURL');

  function getLink(type, hash, email = '') {
    let url = `${baseURL}/token/${type}/${hash}`;
    if (email.length > 0) {
      url += `/${new Buffer(email, 'utf8').toString('base64')}`;
    }
    return url;
  }

  function sendEmail(email) {
    return app
      .service('mailer')
      .create(email)
      .then(function(result) {
        Console.log('Sent email', result);
      })
      .catch(err => {
        Console.log('Error sending email', err);
      });
  }

  return {
    notifier: function(type, user, notifierOptions) {
      let tokenLink;
      let email;
      switch (type) {
      case 'resendVerifySignup': //sending the user the verification email
        tokenLink = getLink('verify', user.verifyToken, user.email);
        email = {
          from: emailConfig.GMAIL,
          to: user.email,
          subject: 'Verify Signup',
          html: tokenLink
        };
        return sendEmail(email);
      case 'verifySignup': // confirming verification
        tokenLink = getLink('verify', user.verifyToken, user.email);
        email = {
          from: emailConfig.GMAIL,
          to: user.email,
          subject: 'Confirm Signup',
          html: tokenLink
        };
        return sendEmail(email);
      case 'sendResetPwd':
        tokenLink = getLink('reset', user.resetToken, user.email);
        email = {
          from: emailConfig.GMAIL,
          to: user.email,
          subject: 'Confirm reset password',
          html: tokenLink
        };
        return sendEmail(email);
      case 'resetPwd':
        tokenLink = getLink('reset', user.resetToken, user.email);
        email = {};
        return sendEmail(email);
      case 'passwordChange':
        email = {};
        return sendEmail(email);
      case 'identityChange':
        tokenLink = getLink('verifyChanges', user.verifyToken, user.email);
        email = {};
        return sendEmail(email);
      default:
        break;
      }
    }
  };
};
