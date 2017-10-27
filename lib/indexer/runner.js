// @flow

/*::
  export type Options = {
    input: string  // url
  }
*/

const { toIndex, toStore } = require('./indexer')
const fetch = require('node-fetch')
const debug = require('debug')('app:runner')

/**
 * Runs. Returns JSON packet as a JS object
 */

async function run (opts /*: Options */) {
  const { input } = opts

  // Read the input and build the index/store
  const data = await readJson(input)
  const [ index, store ] = [ toIndex(data), toStore(data) ]

  // Build final output
  return { index, store }
}

/**
 * Read JSON from file
 *
 * @example
 *
 *     readJson('https://devhints.io/data/search-index.json')
 */

async function readJson (input) {
  // Append a timestamp (?t=...) to bypass Cloudflare caching
  const timestamp = +new Date()
  const data = await fetchJson(`${input}?t=${timestamp}`)
  return data
}

function fetchJson (url) {
  debug('Fetching:', url)
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
}

/**
 * Checks status of a fetch
 */

function checkStatus (res) {
  if (res.status >= 200 && res.status < 300) return res
  debug('Error:', err.status, err.statusText)
  var err = new Error(res.statusText)
  err.response = res
  throw err
}

/*
 * Export
 */

module.exports = {
  run
}
