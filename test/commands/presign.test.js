const {expect, test} = require('@oclif/test')

describe('presign', () => {
  test
  .skip()
  .stdout()
  .command(['presign', '-f', 'example.txt'])
  .it('runs presign -f example.txt', ctx => {
    expect(ctx.stdout).to.contain('example.txt')
  })
})
