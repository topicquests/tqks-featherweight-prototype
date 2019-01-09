const assert = require('assert');
const app = require('../../src/app');

describe('\'invitations\' service', () => {
  it('registered the service', () => {
    const service = app.service('invitations');

    assert.ok(service, 'Registered the service');
  });
});
