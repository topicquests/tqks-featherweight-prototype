const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const resendVerifyEmailAuth = require('../../src/hooks/resend-verify-email-auth');

describe('\'resend-verify-email-auth\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
