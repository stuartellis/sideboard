const path = require('path')
const fs = require('fs-extra')

class UserConfig {
  constructor() {
    this.dir = '.'
    this.file = 'config.json'
    this.awsRegion = ''
    this.s3BucketName = ''
    this.presignedUrlExpiry = 3600
  }

  get path() {
    return path.join(this.dir, this.file)
  }

  async fileExists() {
    return fs.pathExists(this.path)
  }

  async load() {
    const {awsRegion, s3BucketName, presignedUrlExpiry} = await fs.readJSON(this.path)
    this.awsRegion = awsRegion
    this.s3BucketName = s3BucketName
    this.presignedUrlExpiry = presignedUrlExpiry
  }

  async save() {
    const data = {awsRegion: this.awsRegion, s3BucketName: this.s3BucketName, presignedUrlExpiry: this.presignedUrlExpiry}
    await this.makeDir()
    await fs.writeJSON(this.path, data)
  }

  async makeDir() {
    const dirExists = await fs.pathExists(this.dir)
    if (!dirExists) {
      await fs.mkdir(this.dir)
    }
  }
}

module.exports = UserConfig
