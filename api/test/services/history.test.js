const assert = require('assert');
const app = require('../../src/app');

describe('\'history\' service', () => {
  it('registered the service', () => {
    const service = app.service('history');

    assert.ok(service, 'Registered the service');
  });
});
