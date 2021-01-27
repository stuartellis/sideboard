const path = require('path')
const {expect, test} = require('@oclif/test')

describe('init', () => {
  test
  .stdout()
  .env({XDG_CONFIG_HOME: path.join(__dirname, '..', 'config')})
  .command(['init', '--dryrun'])
  .it('runs init --dryrun', ctx => {
    expect(ctx.stdout).to.contain('Sideboard: Initializing')
  })
})
