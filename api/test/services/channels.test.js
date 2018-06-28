const assert = require('assert');
const app = require('../../src/app');

describe('\'channels\' service', () => {
  it('registered the service', () => {
    const service = app.service('channels');

    assert.ok(service, 'Registered the service');
  });
});
