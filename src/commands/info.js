const {Command, flags} = require('@oclif/command')
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
      this.log(this.config)
    }
    this.log(userConfig)
  }
}

InfoCommand.description = `shows the current configuration
By default, this shows the settings from the configuration file.
Use the -a option to see the automatically calculated settings as well.

`

InfoCommand.flags = {
  all: flags.boolean({char: 'a', description: 'show complete configuration'}),
}

module.exports = InfoCommand
