const assert = require('assert')
const app = require('../../src/app')

describe('\'tree-view\' service', () => {
  it('registered the service', () => {
    const service = app.service('tree-view')

    assert.ok(service, 'Registered the service')
  })
})
