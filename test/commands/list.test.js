const path = require('path')
const {expect, test} = require('@oclif/test')

describe('list', () => {
  test
  .stdout()
  .env({XDG_CONFIG_HOME: path.join(__dirname, '..', 'config')})
  .command(['list', '--dryrun'])
  .it('runs list --dryrun', ctx => {
    expect(ctx.stdout).to.contain('Sideboard: List')
  })
})
