const assert = require('assert');
const app = require('../../src/app');

describe('\'quests\' service', () => {
  it('registered the service', () => {
    const service = app.service('quests');

    assert.ok(service, 'Registered the service');
  });
});
