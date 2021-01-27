const path = require('path')
const {expect, test} = require('@oclif/test')

describe('info', () => {
  test
  .stdout()
  .env({XDG_CONFIG_HOME: path.join(__dirname, '..', 'config')})
  .command(['info'])
  .it('runs info', ctx => {
    expect(ctx.stdout).to.contain('Sideboard: Info')
  })
})
