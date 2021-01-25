const {it} = require('mocha')
const assert = require('assert')
const S3Adapter = require('../../src/lib/s3adapter.js')

describe('S3Adapter', function () {
  describe('#constructor', function () {
    it('returns S3Adapter with expected attributes', function () {
      const adapter = new S3Adapter('eu-west-1', 'sideboard')
      assert.strictEqual(adapter.bucketName, 'sideboard')
    })
  })
})
