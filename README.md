# chatio

A peer-to-peer audio/video PWA.

## Table of Contents

* [Getting Started](#getting-started)
* [Security](#security)
* [Contributing](#contributing)
  * [Development](#development)
  * [Commit Standards](#commit-standards)

## Getting Started

`chatio` is currently completely browser based which means you'll need an internet connection to use it for the first time. After that, it will be saved to your device and be used on any local network your connected to so long a signaling server is in reach.

## Security

All peer traffic is encrypted and there is work under way for making `chatio` calls more secure.

### Development

#### Installing
```bash
yarn
```

#### Dev server
```bash
quasar dev
```

#### Linting
```bash
yarn run lint
```

#### Build in production mode
```bash
quasar build
```

### Commit Standards
`chatio` follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) spec in order
to have clear and concise messages, as well as, an auto-generated changelog using [standard-version](https://github.com/conventional-changelog/standard-version).
