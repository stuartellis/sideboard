const {expect, test} = require('@oclif/test')

describe('list', () => {
  test
  .stdout()
  .command(['list', '--dryrun'])
  .it('runs list --dryrun', ctx => {
    expect(ctx.stdout).to.contain('Sideboard: List')
  })
})
