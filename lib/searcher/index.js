const lunr = require('lunr')

/**
 * The serialized index
 */

const { index: rawIndex, store } = require('../../public/index.json')

/**
 * The Lunr index
 */

const index = lunr.Index.load(rawIndex)

/**
 * Performs a search
 */

function search (keyword) {
  // { ref, score, matchData }
  var matches = index.search(keyword)

  return matches.map(match => {
    const { ref, score } = match
    const object = store[ref]

    return {
      ref,
      score,
      object
    }
  })
}

/*
 * Export
 */

module.exports = {
  rawIndex,
  index,
  store,
  search
}
