const {expect, test} = require('@oclif/test')

describe('init', () => {
  test
  .stdout()
  .command(['init', '--dryrun'])
  .it('runs init --dryrun', ctx => {
    expect(ctx.stdout).to.contain('Sideboard: Initializing')
  })
})
