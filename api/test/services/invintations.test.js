const assert = require('assert');
const app = require('../../src/app');

describe('\'invintations\' service', () => {
  it('registered the service', () => {
    const service = app.service('invintations');

    assert.ok(service, 'Registered the service');
  });
});
