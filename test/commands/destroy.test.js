const path = require('path')
const {expect, test} = require('@oclif/test')

describe('destroy', () => {
  test
  .stdout()
  .env({XDG_CONFIG_HOME: path.join(__dirname, '..', 'config')})
  .command(['destroy', '--dryrun'])
  .it('runs destroy --dryrun', ctx => {
    expect(ctx.stdout).to.contain('Sideboard: Destroy')
  })
})
