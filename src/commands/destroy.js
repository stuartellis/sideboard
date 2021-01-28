const {Command, flags} = require('@oclif/command')
const S3Adapter = require('../lib/s3adapter.js')
const UserConfig = require('../lib/userconfig.js')

class DestroyCommand extends Command {
  async run() {
    this.log('Sideboard: Destroy')
    const {flags} = this.parse(DestroyCommand)
    let userConfig = new UserConfig()
    userConfig.dir = this.config.configDir
    try {
      await userConfig.load()
    } catch (error) {
      this.error(`Failed to load configuration file, ${error}`, {exit: 1})
    }
    if (flags.dryrun) {
      this.log(`Dry run: This would destroy the S3 bucket. Bucket ${userConfig.s3BucketName} in ${userConfig.awsRegion}`)
      this.log('Dry run completed')
    } else {
      const s3 = new S3Adapter(userConfig.awsRegion, userConfig.s3BucketName)
      const bucketExists = await s3.bucketExists()
      if (bucketExists) {
        try {
          await s3.emptyBucket()
          this.log(`Deleted the contents of the S3 bucket. Bucket: ${userConfig.s3BucketName} in ${userConfig.awsRegion}`)
        } catch (error) {
          this.error(`Could not delete the contents of the S3 bucket. Bucket: ${userConfig.s3BucketName} in ${userConfig.awsRegion}, ${error}`, {exit: 1})
        }
        try {
          await s3.deleteBucket()
          this.log(`Destroyed the S3 bucket. Bucket: ${userConfig.s3BucketName} in ${userConfig.awsRegion}`)
        } catch (error) {
          this.error(`Could not delete the S3 bucket. Bucket: ${userConfig.s3BucketName} in ${userConfig.awsRegion}, ${error}`, {exit: 1})
        }
      } else {
        this.error(`The S3 bucket does not exist. Bucket: ${userConfig.s3BucketName} in ${userConfig.awsRegion}`, {exit: 1})
      }
    }
  }
}

DestroyCommand.description = `destroys the bucket
This deletes all of the files in the bucket, and destroys the bucket.
`

DestroyCommand.flags = {
  dryrun: flags.boolean({char: 'd', description: 'dry run'}),
}

module.exports = DestroyCommand
