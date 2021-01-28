const {Command, flags} = require('@oclif/command')
const identifiers = require('../lib/identifiers.js')
const S3Adapter = require('../lib/s3adapter.js')
const UserConfig = require('../lib/userconfig.js')

class InitCommand extends Command {
  async run() {
    this.log('Sideboard: Initializing')
    const {flags} = this.parse(InitCommand)
    let userConfig = new UserConfig()
    userConfig.dir = this.config.configDir
    const configExists = await userConfig.fileExists()
    if (configExists) {
      if (flags.dryrun) {
        this.log('Dry run: Configuration file already exists')
      } else {
        this.warn('Configuration file already exists')
      }
      if (flags.force) {
        this.warn('Forcing reinitialization')
        await this.generateConfig(flags, userConfig)
        await userConfig.load()
      } else {
        await userConfig.load()
        if (userConfig.awsRegion) {
          this.log(`Existing configuration specifies an AWS Region. AWS Region: ${userConfig.awsRegion}`)
        }
        if (userConfig.s3BucketName) {
          this.log(`Existing configuration specifies an S3 bucket name. Bucket: ${userConfig.s3BucketName}`)
        }
      }
    } else if (flags.dryrun) {
      this.log('Dry run: This would generate a configuration file')
      await this.generateConfig(flags, userConfig)
    } else {
      this.log('Generating configuration file')
      await this.generateConfig(flags, userConfig)
      await userConfig.load()
    }

    const s3 = new S3Adapter(userConfig.awsRegion, userConfig.s3BucketName)
    const bucketExists = await this.checkBucket(flags, userConfig, s3)

    if (bucketExists) {
      this.warn(`Bucket already exists. Bucket: ${userConfig.s3BucketName} in ${userConfig.awsRegion}`)
    } else {
      await this.createBucket(flags, userConfig, s3)
    }
  }

  async checkBucket(flags, userConfig, s3) {
    let bucketExists = false
    if (flags.dryrun) {
      this.log(`Dry run: Would check for the S3 bucket: ${userConfig.s3BucketName} in ${userConfig.awsRegion}`)
    } else {
      try {
        bucketExists = await s3.bucketExists()
      } catch (error) {
        this.error(`Could not check for the S3 bucket. Bucket: ${userConfig.s3BucketName} in ${userConfig.awsRegion}, ${error}`, {exit: 1})
      }
    }
    return bucketExists
  }

  async createBucket(flags, userConfig, s3) {
    if (flags.dryrun) {
      this.log(`Dry run: Would create the S3 bucket: ${userConfig.s3BucketName} in ${userConfig.awsRegion}`)
    } else {
      try {
        await s3.createBucket()
        this.log(`Created the S3 bucket. Bucket: ${userConfig.s3BucketName} in ${userConfig.awsRegion}`)
        this.log(`To access this bucket, use the S3 address s3://${userConfig.s3BucketName}`)
        this.log(`Example: aws s3 ls s3://${userConfig.s3BucketName} --region ${userConfig.awsRegion}`)
      } catch (error) {
        this.error(`Could not create the S3 bucket. Bucket: ${userConfig.s3BucketName} in ${userConfig.awsRegion}, ${error}`, {exit: 1})
      }
    }
  }

  async generateConfig(flags, userConfig) {
    userConfig.awsRegion = flags.region || process.env.AWS_REGION || 'us-east-1'
    userConfig.s3BucketName = flags.name || `${identifiers().randString()}-${identifiers().randString()}-${userConfig.awsRegion}`
    if (flags.dryrun) {
      this.log(`Dry run: Configuration would specify the S3 bucket ${userConfig.s3BucketName} in ${userConfig.awsRegion}`)
    } else {
      this.log(`Generating configuration. Bucket: ${userConfig.s3BucketName} in ${userConfig.awsRegion}`)
      try {
        await userConfig.save()
      } catch (error) {
        this.error(`Could not save to ${this.config.configDir}, ${error}`, {exit: 1})
      }
      this.log(`New configuration saved to ${this.config.configDir}`)
    }
  }
}

InitCommand.description = `creates the configuration and the bucket
Creates the configuration file and the S3 bucket.
If you do not specify a name for the S3 bucket, the bucket will be created with a random name.
`

InitCommand.flags = {
  dryrun: flags.boolean({char: 'd', description: 'dry run'}),
  force: flags.boolean({char: 'f', description: 'force reinitialization'}),
  region: flags.string({char: 'r', description: 'AWS region for the S3 bucket'}),
  name: flags.string({char: 'n', description: 'name of the S3 bucket'}),
}

module.exports = InitCommand
