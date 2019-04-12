// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const errors = require('@feathersjs/errors');

module.exports = function () {
  return async context => {
    const config = await context.app.service('configuration').get(1);

    const invitiationService = context.app.service('invitations');
    const invitesResponse = await invitiationService.find({});

    const emails = invitesResponse.data.map(invite => invite.email.toLowerCase());
    const isInvited = emails.includes(context.data.email.toLowerCase());

    if (config.requiresInvite && !isInvited) {
      console.log('fail!');
      console.log('config.requiresInvite:', config.requiresInvite);
      console.log('!isInvited:', !isInvited);
      console.log('((config.requiresInvite === \'false\') && !isInvited):', ((config.requiresInvite === 'false') && !isInvited));
      throw new errors.Forbidden('Your email has not been invited');
    }
    return context;
  };
};
