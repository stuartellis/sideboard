Sideboard
=========

Instant file sharing and storage.

This creates and manages an S3 bucket for you.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

## Deployment 

To run this command-line utility from a Git clone, use Use *npm link* to register it on your system:

    npm link

Use *oclif-dev* to build native packages:

    npx oclif-dev pack:macos

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

