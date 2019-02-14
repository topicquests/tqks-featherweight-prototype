const assert = require('assert');
const app = require('../../src/app');

describe('\'configuration\' service', () => {
  it('registered the service', () => {
    const service = app.service('configuration');

    assert.ok(service, 'Registered the service');
  });
});
