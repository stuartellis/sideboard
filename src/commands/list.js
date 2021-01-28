const {Command, flags} = require('@oclif/command')
const Table = require('cli-table')
const S3Adapter = require('../lib/s3adapter.js')
const UserConfig = require('../lib/userconfig.js')

class ListCommand extends Command {
  async run() {
    this.log('Sideboard: List')
    const {flags} = this.parse(ListCommand)
    let userConfig = new UserConfig()
    userConfig.dir = this.config.configDir
    try {
      await userConfig.load()
    } catch (error) {
      this.error(`Failed to load configuration file, ${error}`, {exit: 1})
    }
    this.log(`Listing contents of the S3 bucket ${userConfig.s3BucketName} in ${userConfig.awsRegion}`)

    if (flags.dryrun) {
      this.log('Dry run completed')
    } else {
      const s3 = new S3Adapter(userConfig.awsRegion, userConfig.s3BucketName)
      const bucketExists = await s3.bucketExists()
      if (bucketExists) {
        try {
          const objects = await s3.listAllObjects()
          this.renderTable(objects)
        } catch (error) {
          this.error(`Could not list the contents of the S3 bucket. Bucket: ${userConfig.s3BucketName} in ${userConfig.awsRegion}, ${error}`, {exit: 1})
        }
      } else {
        this.error(`the S3 bucket does not exist. Bucket: ${userConfig.s3BucketName} in ${userConfig.awsRegion}`, {exit: 1})
      }
    }
  }

  renderTable(objects) {
    const table = new Table({
      head: ['Object', 'Size'], colWidths: [50, 10],
    })
    objects.forEach(obj => table.push([obj.Key, obj.Size]))
    this.log(table.toString())
  }
}

ListCommand.description = `lists the contents of the bucket
Displays a list of the files in the bucket
`

ListCommand.flags = {
  dryrun: flags.boolean({char: 'd', description: 'dry run'}),
}

module.exports = ListCommand
