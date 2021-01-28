const {Command, flags} = require('@oclif/command')
const Table = require('cli-table')
const UserConfig = require('../lib/userconfig.js')

class InfoCommand extends Command {
  async run() {
    this.log('Sideboard: Info')
    const {flags} = this.parse(InfoCommand)
    let userConfig = new UserConfig()
    userConfig.dir = this.config.configDir
    try {
      await userConfig.load()
    } catch (error) {
      this.warn(`Failed to load configuration file, ${error}`)
    }
    if (flags.all) {
      this.log('Application:')
      this.renderTable(Object.entries(this.config))
    }
    this.log('Configuration File:')
    this.renderTable(Object.entries(userConfig))
  }

  renderTable(objects) {
    const table = new Table()
    objects.forEach(obj => table.push(obj))
    this.log(table.toString())
  }
}

InfoCommand.description = `shows the current configuration
By default, this only shows the settings from the configuration file.
Use the -a option to see the automatically calculated settings as well.

`

InfoCommand.flags = {
  all: flags.boolean({char: 'a', description: 'show all settings'}),
}

module.exports = InfoCommand
