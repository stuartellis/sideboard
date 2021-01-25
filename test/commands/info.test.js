const {expect, test} = require('@oclif/test')

describe('info', () => {
  test
  .stdout()
  .command(['info'])
  .it('runs info', ctx => {
    expect(ctx.stdout).to.contain('Sideboard: Info')
  })
})
