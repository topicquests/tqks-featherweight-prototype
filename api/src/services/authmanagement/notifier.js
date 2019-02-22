const Email = require('email-templates');

module.exports = function(app) {
  const emailConfig = app.get("emailconfig");

  const {
    SMTP_HOST = 'smtp.mailtrap.io',
    SMTP_PORT = 2525,
    SMTP_USER = 'af9a8766d909b7',
    SMTP_PASS = 'd803d787c8349d',
  } = emailConfig;
  
  const transport = {
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  };
  const baseURL = app.get('baseURL');
  function getLink(type, hash) {
    const url = `${baseURL}/token/${type}/${hash}`;
    return url;
  }

  function sendEmail(email) {
    return app
      .service('mailer')
      .create(email)
      .then(function(result) {
        console.log('Sent email', result);
      })
      .catch(err => {
        console.log('Error sending email', err);
      });
  }

  

  return {
    notifier: async function(type, user, notifierOptions) {
      let tokenLink;
      let email;
      switch (type) {
      case 'resendVerifySignup': //sending the user the verification email
        tokenLink = getLink('verify', user.verifyToken);
        console.info('Email', 'resendVerifySignup', {tokenLink});
          
        let emailOpts = {
          transport
        };

        let sendOpts = {
          template: 'verify',
          message: {
            to: user.email
          },
          locals: {
            link: tokenLink
          },
        };

  
        let testEmail = new Email(emailOpts);
        
        try {
          let result = await testEmail.send(sendOpts);
          console.info('Email', 'resendVerifySignup', 'success', {result});
        } catch (e) {
          console.error('Email', 'resendVerifySignup', 'failed', e);
        }
        break;
        // console.dir({testEmail});

          // email = {
          //   from: emailConfig.GMAIL,
          //   to: user.email,
          //   subject: "Verify Signup",
          //   html: tokenLink
          // };
        return sendEmail(email);
        break;

      case 'verifySignup': // confirming verification
        tokenLink = getLink('verify', user.verifyToken);
        email = {
          from: emailConfig.GMAIL,
          to: user.email,
          subject: 'Confirm Signup',
          html: tokenLink
        };
        return sendEmail(email);
        break;

      case 'sendResetPwd':
        tokenLink = getLink('reset', user.resetToken);
        email = {
          from: emailConfig.GMAIL,
          to: user.email,
          subject: 'Confirm reset password',
          html: tokenLink
        };
        return sendEmail(email);
        break;

      case 'resetPwd':
        tokenLink = getLink('reset', user.resetToken);
        email = {};
        return sendEmail(email);
        break;

      case 'passwordChange':
        email = {};
        return sendEmail(email);
        break;

      case 'identityChange':
        tokenLink = getLink('verifyChanges', user.verifyToken);
        email = {};
        return sendEmail(email);
        break;

      default:
        break;
      }
    }
  };
};
