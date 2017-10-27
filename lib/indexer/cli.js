#!/usr/bin/env node
const { toIndex, toStore } = require('./indexer')
const fetch = require('node-fetch')
const debug = require('debug')('app:build_index')
const run = require('./runner').run

/* eslint-disable no-unused-vars */
const cli = require('meow')(`
  Usage:
    $ build-index

  Options:
        --input URL

    -h, --help       show usage information
    -v, --version    print version info and exit
`, {
  boolean: [
    'help',
    'version'
  ],
  alias: {
    h: 'help',
    v: 'version'
  }
})

if (!cli.flags.input) {
  throw new Error('Missing --input')
}

run({
  input: cli.flags.input
})
.then(result => {
  console.log(JSON.stringify(result))
})
