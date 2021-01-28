Sideboard
=========

Instant file sharing and storage.

This creates and manages an S3 bucket for you.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

<!-- toc -->
* [Deployment](#deployment)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
<!-- deployment -->
## Deployment 

To run this command-line utility from a Git clone, use *npm link* to register it on your system:

    npm link

Use *oclif-dev* to build native packages:

    npx oclif-dev pack:win

> To build Windows packages, You must run this command on a Windows system that has [7-Zip](https://www.7-zip.org/) installed.

<!-- usage -->
## Usage

> To use this tool, you must have an AWS account and AWS credentials set up.

First, run *init* to create an S3 bucket:

    sb init

By default, Sideboard creates a bucket with a random name in the us-east-1 region. To specify a name and region, use the *-n* and *-r* options.

    sb init -n my-bucket-name -r eu-west-1

```
❯ sb init
Sideboard: Initializing
Generating configuration. Bucket: tr8u3ptr6pi-k47gbmndilj-us-east-1 in us-east-1
New configuration saved to /Users/stuartellis/.config/sideboard
Created the S3 bucket. Bucket: tr8u3ptr6pi-k47gbmndilj-us-east-1 in us-east-1
To access this bucket, use the S3 address s3://tr8u3ptr6pi-k47gbmndilj-us-east-1
Example: aws s3 ls s3://tr8u3ptr6pi-k47gbmndilj-us-east-1 --region us-east-1
```

This will also generate a configuration file in within your home directory. For example, on macOS, it will create the configuration file in *.config/sideboard/*.

To see the contents of the bucket, use the *list* command:

    sb list

To delete all of the files in the bucket, use the *flush* command:

    sb flush

To empty and delete the bucket, use the *destroy* command:

    sb destroy

The configuration file will remain, so that you can recreate the bucket with the same name each time that you run *sb init*. 

To reset Sideboard completely, first destroy the bucket, and then force it to reinitialize:

    sb destroy
    sb init -f

<!-- usagestop -->

<!-- deploymentstop -->
<!-- commands -->
## `sb help [COMMAND]`

Displays the help for Sideboard

```
USAGE
  $ sb help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_

## `sb init`

Creates the configuration and the S3 bucket

```
USAGE
  $ sb init

OPTIONS
  -d, --dryrun         dry run
  -f, --force          force reinitialization
  -n, --name=name      name of the S3 bucket
  -r, --region=region  AWS region for the S3 bucket

DESCRIPTION
  Creates the configuration file and S3 bucket
```

_See code: [src/commands/init.js](https://github.com/stuartellis/sideboard/blob/v0.1.0/src/commands/init.js)_

## `sb list`

Lists the contents of the bucket

```
USAGE
  $ sb list

OPTIONS
  -d, --dryrun  dry run

DESCRIPTION
  Displays a list of the files in the bucket
```

_See code: [src/commands/list.js](https://github.com/stuartellis/sideboard/blob/v0.1.0/src/commands/list.js)_

## `sb flush`

Creates the configuration

```
USAGE
  $ sb flush

OPTIONS
  -d, --dryrun  dry run

DESCRIPTION
  This deletes all of the files in the S3 bucket.
```

_See code: [src/commands/flush.js](https://github.com/stuartellis/sideboard/blob/v0.1.0/src/commands/flush.js)_

## `sb destroy`

Destroys the bucket

```
USAGE
  $ sb destroy

OPTIONS
  -d, --dryrun  dry run

DESCRIPTION
  This deletes all of the files in the bucket, and destroys the bucket.
```

_See code: [src/commands/destroy.js](https://github.com/stuartellis/sideboard/blob/v0.1.0/src/commands/destroy.js)_

## `sb info`

Shows the current configuration

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
<!-- commandsstop -->

