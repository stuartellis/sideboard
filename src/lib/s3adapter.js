const {S3, CreateBucketCommand, DeleteBucketCommand, DeleteObjectsCommand, GetObjectCommand, HeadBucketCommand, ListObjectsV2Command} = require('@aws-sdk/client-s3')
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner')

class S3Adapter {
  constructor(region, bucketName) {
    this.region = region
    this.s3 = new S3({region: region})
    this.bucketName = bucketName
  }

  get basicBucketParams() {
    return {
      Bucket: this.bucketName,
    }
  }

  async bucketExists() {
    const headBucketCommand = new HeadBucketCommand(this.basicBucketParams)
    try {
      const query = await this.s3.send(headBucketCommand)
      if (query.$metadata && query.$metadata.httpStatusCode && query.$metadata.httpStatusCode === 200) {
        return true
      }
    } catch (error) {
      if (error.$metadata && error.$metadata.httpStatusCode) {
        switch (error.$metadata.httpStatusCode) {
        case 404:
          return false
        default:
          throw error
        }
      } else {
        throw error
      }
    }
    return false
  }

  async createBucket() {
    const commandParams = {
      Bucket: this.bucketName,
      LocationConstraint: this.region,
    }
    const command = new CreateBucketCommand(commandParams)
    return this.s3.send(command)
  }

  async deleteBucket() {
    const command = new DeleteBucketCommand(this.basicBucketParams)
    return this.s3.send(command)
  }

  async emptyBucket() {
    const contents = await this.listAllObjects()
    if (contents.length > 0) {
      const objects = contents.map(({Key}) => {
        return {Key}
      })
      const deleteParams = {
        Bucket: this.bucketName,
        Delete: {
          Objects: objects,
        },
      }
      const deleteCommand = new DeleteObjectsCommand(deleteParams)
      return this.s3.send(deleteCommand)
    }
  }

  async listAllObjects(data = [], continuationToken = undefined) {
    const params = {Bucket: this.bucketName, ContinuationToken: continuationToken}
    const listCommand = new ListObjectsV2Command(params)
    const response = await this.s3.send(listCommand)
    if (response.Contents) {
      data.push(...response.Contents)
    }
    if (response.IsTruncated) {
      return this.listAllObjects(data, response.NextContinuationToken)
    }
    return data
  }

  async presign(filePath, expiresIn) {
    const getObjectParams = {Bucket: this.bucketName, Key: filePath}
    const command = new GetObjectCommand(getObjectParams)
    return getSignedUrl(this.s3, command, {expiresIn: expiresIn})
  }
}

module.exports = S3Adapter
