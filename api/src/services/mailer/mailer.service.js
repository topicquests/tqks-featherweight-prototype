// Initializes the `mailer` service on path `/mailer`
const hooks = require("./mailer.hooks");
const Emailer = require("feathers-mailer");
const smtpTransport = require("nodemailer-smtp-transport");
const nodemailer = require('nodemailer');

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

  // Initialize our service with any options it requires
  app.use(
    "/mailer",
    Emailer(
      transport
    )
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("mailer");

  service.hooks(hooks);
};
