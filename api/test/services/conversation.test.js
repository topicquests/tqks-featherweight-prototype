const assert = require('assert');
const app = require('../../src/app');

describe('\'conversation\' service', () => {
  it('registered the service', () => {
    const service = app.service('conversation');

    assert.ok(service, 'Registered the service');
  });
});
