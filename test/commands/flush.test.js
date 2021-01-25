const {expect, test} = require('@oclif/test')

describe('flush', () => {
  test
  .stdout()
  .command(['flush'])
  .it('runs flush --dryrun', ctx => {
    expect(ctx.stdout).to.contain('Sideboard: Flush')
  })
})
