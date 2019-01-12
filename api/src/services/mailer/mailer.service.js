// Initializes the `mailer` service on path `/mailer`
const hooks = require("./mailer.hooks");
const Emailer = require("feathers-mailer");
const smtpTransport = require("nodemailer-smtp-transport");

module.exports = function(app) {
  const emailConfig = app.get("emailconfig");

  // Initialize our service with any options it requires
  app.use(
    "/mailer",
    Emailer(
      smtpTransport({
        service: "gmail",
        auth: {
          user: emailConfig.GMAIL,
          pass: emailConfig.GMAIL_PASSWORD
        }
      })
    )
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("mailer");

  service.hooks(hooks);
};
