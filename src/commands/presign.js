const {Command, flags} = require('@oclif/command')
const S3Adapter = require('../lib/s3adapter.js')
const UserConfig = require('../lib/userconfig.js')

class PresignCommand extends Command {
  async run() {
    const {flags} = this.parse(PresignCommand)
    let userConfig = new UserConfig()
    userConfig.dir = this.config.configDir
    try {
      await userConfig.load()
    } catch (error) {
      this.error(`Failed to load configuration file, ${error}`, {exit: 1})
    }
    const duration = flags.duration || userConfig.presignedUrlExpiry
    const s3 = new S3Adapter(userConfig.awsRegion, userConfig.s3BucketName)
    if (flags.file) {
      const presignedUrl = await s3.presign(flags.file, duration)
      this.log(presignedUrl)
    } else {
      const error = 'No file path specified'
      this.error(`Please specify a file. Bucket: ${userConfig.s3BucketName} in ${userConfig.awsRegion}, ${error}`, {exit: 1})
    }
  }
}

PresignCommand.description = `shows a presigned URL for getting a file
...
Provides a presigned URL for getting a file in the S3 bucket
`

PresignCommand.flags = {
  duration: flags.integer({char: 'd', description: 'duration of URL in seconds'}),
  file: flags.string({char: 'f', description: 'file path'}),
}

module.exports = PresignCommand
