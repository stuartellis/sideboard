const path = require('path')
const {expect, test} = require('@oclif/test')

describe('flush', () => {
  test
  .stdout()
  .env({XDG_CONFIG_HOME: path.join(__dirname, '..', 'config')})
  .command(['flush', '--dryrun'])
  .it('runs flush --dryrun', ctx => {
    expect(ctx.stdout).to.contain('Sideboard: Flush')
  })
})
