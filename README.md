Sideboard
=========

Convenient short-term file storage and sharing.

This command-line tool creates and manages a storage bucket on AWS for you.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![License](https://img.shields.io/github/license/stuartellis/sideboard.svg)](https://github.com/stuartellis/sideboard)
![tests](https://github.com/stuartellis/sideboard/workflows/tests/badge.svg)

<!-- toc -->

<!-- tocstop -->
<!-- installation -->
## Installation 

To run this command-line utility from a Git clone of the repository, use *npm link* to register it on your system:

    npm link

Use *oclif-dev* to build native packages:

    npx oclif-dev pack:win

> To build Windows packages, you must run this command on a Windows system that has [7-Zip](https://www.7-zip.org/) installed.
<!-- deploymentstop -->
## Usage

Ensure that you have an AWS configuration on your computer, with a profile.

<!-- usage -->
```sh-session
$ sb init
Sideboard: Initializing
Generating configuration. Bucket: xcinat26g5r-qhokbxs2jr-eu-west-1 in eu-west-1
New configuration saved to /Users/you/.config/sideboard
Created the S3 bucket. Bucket: xcinat26g5r-qhokbxs2jr-eu-west-1 in eu-west-1
To access this bucket, use the S3 address s3://xcinat26g5r-qhokbxs2jr-eu-west-1
Example: aws s3 ls s3://xcinat26g5r-qhokbxs2jr-eu-west-1 --region eu-west-1
```

Use the *list* subcommand to see the contents of the bucket: 

```sh-session
❯ sb list
Sideboard: List
Listing contents of the S3 bucket xcinat26g5r-qhokbxs2jr-eu-west-1 in eu-west-1
┌──────────────────────────────────────────────────┬──────────┐
│ Object                                           │ Size     │
├──────────────────────────────────────────────────┼──────────┤
│ example.docx                                     │ 1049     │
└──────────────────────────────────────────────────┴──────────┘
```

Use the *presign* subcommand to get a URL for any file in the bucket:

<!-- usage -->
```sh-session
$ sb presign -f example.docx
https://xcinat26g5r-qhokbxs2jr-eu-west-1.s3.eu-west-1.amazonaws.com/example.docx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU3K6EMT53PLHZSE2%2F20210518%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20210518T194421Z&X-Amz-Expires=3600&X-Amz-Signature=070ff99887327a688f91b3375022b4ec60611773fc01c7a87d45cf0095c3b2d5&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js%2F3.6.0%20os%2Fdarwin%2F19.6.0%20lang%2Fjs%20md%2Fnodejs%2F12.22.1%20api%2Fs3%2F3.6.0&x-id=GetObject
```

Once it has been generated, a presigned URL can be used by *anyone* to download the file. They do not need to have an AWS account.

> Each presigned URL is only valid for a specified length of time. By default, *sideboard presign* generates URLs that valid for one hour.

You can empty or delete the S3 bucket at any time. Use the *destroy* subcommand to empty the bucket and remove it from AWS:

```sh-session
$ sb destroy
Sideboard: Destroy
Deleted the contents of the S3 bucket. Bucket: xcinat26g5r-qhokbxs2jr-eu-west-1 in eu-west-1
Destroyed the S3 bucket. Bucket: xcinat26g5r-qhokbxs2jr-eu-west-1 in eu-west-1
```

<!-- usagestop -->

<!-- commands -->
* [`sb destroy`](#sb-destroy)
* [`sb flush`](#sb-flush)
* [`sb help [COMMAND]`](#sb-help-command)
* [`sb info`](#sb-info)
* [`sb init`](#sb-init)
* [`sb list`](#sb-list)
* [`sb presign`](#sb-presign)

## `sb destroy`

Destroys the S3 bucket.

```
USAGE
  $ sb destroy

OPTIONS
  -d, --dryrun  dry run

DESCRIPTION
  This deletes all of the files in the bucket, and destroys the bucket.
```

_See code: [src/commands/destroy.js](https://github.com/stuartellis/sideboard/blob/v0.1.0/src/commands/destroy.js)_

## `sb flush`

Empties the S3 bucket.

```
USAGE
  $ sb flush

OPTIONS
  -d, --dryrun  dry run

DESCRIPTION
  This deletes all of the files in the S3 bucket.
```

_See code: [src/commands/flush.js](https://github.com/stuartellis/sideboard/blob/v0.1.0/src/commands/flush.js)_

## `sb help [COMMAND]`

Display help information for the Sideboard tool.

```
USAGE
  $ sb help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_

## `sb info`

Shows the current configuration of Sideboard.

```
USAGE
  $ sb info

OPTIONS
  -a, --all  show all settings

DESCRIPTION
  By default, this only shows the settings from the configuration file.
  Use the -a option to see the automatically calculated settings as well.
```

_See code: [src/commands/info.js](https://github.com/stuartellis/sideboard/blob/v0.1.0/src/commands/info.js)_

## `sb init`

Creates a configuration and the S3 bucket.

```
USAGE
  $ sb init

OPTIONS
  -d, --dryrun         dry run
  -f, --force          force reinitialization
  -n, --name=name      name of the S3 bucket
  -r, --region=region  AWS region for the S3 bucket

DESCRIPTION
  Creates the configuration file and the S3 bucket.
  If you do not specify a name for the S3 bucket, the bucket will be created with a random name.
```

_See code: [src/commands/init.js](https://github.com/stuartellis/sideboard/blob/v0.1.0/src/commands/init.js)_

## `sb list`

Lists the current contents of the S3 bucket.

```
USAGE
  $ sb list

OPTIONS
  -d, --dryrun  dry run

DESCRIPTION
  Displays a list of the files in the bucket
```

_See code: [src/commands/list.js](https://github.com/stuartellis/sideboard/blob/v0.1.0/src/commands/list.js)_

## `sb presign`

Provides a presigned URL for a file in the S3 bucket.

```
USAGE
  $ sb presign

OPTIONS
  -d, --duration=7200 duration of URL in seconds (optional)
  -f, --file=path     path of file in S3 bucket

DESCRIPTION
  ...
  Provides a presigned URL for getting a file in the S3 bucket
```

_See code: [src/commands/presign.js](https://github.com/stuartellis/sideboard/blob/v0.1.0/src/commands/presign.js)_
<!-- commandsstop -->
