const {expect, test} = require('@oclif/test')

describe('destroy', () => {
  test
  .stdout()
  .command(['destroy', '--dryrun'])
  .it('runs destroy --dryrun', ctx => {
    expect(ctx.stdout).to.contain('Sideboard: Destroy')
  })
})
