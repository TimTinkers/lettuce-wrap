<p align="center"><img width=22.5% src="media/salad-logo.png"></p>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![Python](https://img.shields.io/badge/typescript-v3.3+-blue.svg)<!-- [![Build Status](https://travis-ci.org/anfederico/Clairvoyant.svg?branch=master)](https://travis-ci.org/anfederico/Clairvoyant) -->
![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg)
[![GitHub Issues](https://img.shields.io/github/issues/SaladTechnologies/lettuce-wrap.svg)](https://github.com/SaladTechnologies/lettuce-wrap/issues)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Lettuce Wrap

## Basic Overview

Lettuce Wrap is a Node.js wrapper around [ethminer](https://github.com/ethereum-mining/ethminer), allowing JavaScript and TypeScript developers to interface with an Ethereum mining solution that supports both OpenCL- and CUDA-compatible devices. Lettuce Wrap is currently being used in production by [Salad](salad.io).

**Lettuce Wrap currently only supports Windows-based Node.js environments and will not work in a browser. Ethminer supports OSX and Linux, so additional platform support is planned for future Lettuce Wrap releases.**

## Installation

- NPM: `npm install lettuce-wrap`
- Yarn: `yarn add lettuce-wrap`

Since Lettuce Wrap is built with TypeScript, typings are included in the package.

## Usage

You can either import individual Lettuce Wrap functions or the entire API.

```typescript
import * as lettuceWrap from 'lettuce-wrap'

import { getAllDevices } from 'lettuce-wrap'
```

For a complete example, check out `/example/example.ts`.

### Get Device List

Returns a list of all the detected OpenCL/CUDA devices.

```typescript
import { getAllDevices } from 'lettuce-wrap'

getAllDevices().then(list => {
  console.log(list)
})
```

### Start Mining

Start ethminer using all detected OpenCL and CUDA devices.

```typescript
import { startMiner } from 'lettuce-wrap'

startMiner({
  poolUrl: `{pool url}`,
})
```

## Contribute

All bug reports, pull requests and code reviews are very much welcome.
