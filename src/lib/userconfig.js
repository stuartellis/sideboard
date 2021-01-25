const path = require('path')
const fs = require('fs-extra')

class UserConfig {
  constructor() {
    this.dir = '.'
    this.file = 'config.json'
    this.awsRegion = ''
    this.s3BucketName = ''
  }

  get path() {
    return path.join(this.dir, this.file)
  }

  async fileExists() {
    return fs.pathExists(this.path)
  }

  async load() {
    const {awsRegion, s3BucketName} = await fs.readJSON(this.path)
    this.awsRegion = awsRegion
    this.s3BucketName = s3BucketName
  }

  async save() {
    const data = {awsRegion: this.awsRegion, s3BucketName: this.s3BucketName}
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
