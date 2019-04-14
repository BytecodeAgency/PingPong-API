# Bytecode PingPong Api [![Project maintainers](https://img.shields.io/badge/Project%20maintained%20by-Bytecode%20Digital%20Agency-brightgreen.svg)](https://bytecode.nl)

[![Build Status](https://travis-ci.org/BytecodeOpenSource/PingPong-API.svg?branch=master)](https://travis-ci.org/BytecodeOpenSource/PingPong-API)
[![codecov](https://codecov.io/gh/BytecodeOpenSource/PingPong-API/branch/master/graph/badge.svg)](https://codecov.io/gh/BytecodeOpenSource/PingPong-API)
[![Known Vulnerabilities](https://snyk.io/test/github/BytecodeOpenSource/PingPong-API/badge.svg?targetFile=package.json)](https://snyk.io/test/github/BytecodeOpenSource/PingPong-API?targetFile=package.json)
[![NodeJS Version](https://img.shields.io/badge/Node%20Version-%3E%3D%20v8.0.0-green.svg)](https://img.shields.io/badge/Node%20Version-%3E%3D%20v8.0.0-green.svg)
[![AGPLv3 license](https://img.shields.io/badge/License-AGPLv3-blue.svg)](https://github.com/BytecodeOpenSource/PingPong-API/blob/master/LICENSE)

## Requirements

This application is built to support NodeJS v8 LTS and later.

It is advised to use Yarn as a package manager.

Any database supported by [KnexJS](https://knexjs.org) can be used.

## Installation

After cloning the repository, run `yarn` to install all dependencies.

## Configuration

Before running the application, run the following commands:

```sh
cp knexfile.js.example knexfile.js
cp .env.example .env
```

Now set your configs in the `knexfile.js` and `.env` files.

## Running the application

For starting the application, run `yarn run start`, with the `NODE_ENV` environment variable set matching the environment you want to use in your `knexfile.js` file.

The `NODE_ENV`s available by default (package.json) are:

* `development`, for `yarn run dev`
* `production`, for `yarn run start`
* `test`, for `yarn run test`, `yarn run test:watch` and `yarn run coverage`

## Development

For development and running the integration tests, PostgreSQL should be used.

To use Nodemon (auto restart on save), run `yarn run dev`.

If you want to run the tests while developing, run `yarn run test:watch`.

### Testing

Tests should be present where possible. Jest is used as testing framework.

For any pull-requests to be accepted, the following commands should pass:

* `yarn run lint`
* `yarn run test`
* `yarn run build`

For checking the code coverage, run `yarn run coverage`.

## Routes

All routes are based on `/api/v1`

#### GET /status

Returns http code 200

#### POST /team/create

```
name: string
```

#### POST /team/get-all-data

Requires auth, add an `Authentication` header with value `Bearer [token]`.

```
id: number
```

#### POST /player/register

```
username: string
email: string
teamid: number
password: string
```

#### POST /player/auth

```
username: string
password: string
```

#### POST /game/create

## License and maintainers

This project is AGPL-3.0 licensed.

This project is maintained by [Bytecode Digital Agency](https://bytecode.nl).

Currently, this project is maintained by Bytecode team-members:

* [Luciano Nooijen](https://github.com/LucianoNooijen)
* [Jeroen van Steijn](https://github.com/JeroenVanSteijn)

For questions regarding this project, please send an email to
[pingpong@bytecode.nl](mailto:pingpong@bytecode.nl).

