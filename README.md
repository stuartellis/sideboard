Sideboard
=========

Instant file sharing and storage.

This creates and manages an S3 bucket for you.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![License](https://img.shields.io/github/license/stuartellis/sideboard.svg)](https://github.com/stuartellis/sideboard)
![tests](https://github.com/stuartellis/sideboard/workflows/tests/badge.svg)

<!-- toc -->

<!-- tocstop -->
<!-- deployment -->
## Deployment 

To run this command-line utility from a Git clone, use *npm link* to register it on your system:

    npm link

Use *oclif-dev* to build native packages:

    npx oclif-dev pack:win

> To build Windows packages, you must run this command on a Windows system that has [7-Zip](https://www.7-zip.org/) installed.
<!-- deploymentstop -->

<!-- usage -->
```sh-session
$ npm install -g sideboard
$ sb COMMAND
running command...
$ sb (-v|--version|version)
sideboard/0.1.0 darwin-x64 node-v12.20.1
$ sb --help [COMMAND]
USAGE
  $ sb COMMAND
...
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

destroys the bucket

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

empties the S3 bucket

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

display help for sb

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

shows the current configuration

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

creates the configuration and the bucket

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

lists the contents of the bucket

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
