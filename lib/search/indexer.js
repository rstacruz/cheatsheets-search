const lunr = require('lunr')
const striptags = require('striptags')
const { unescape } = require('html-escaper')

/**
 * Builds lunr indices.
 * Returns a Lunr Index instance.
 */

function toIndex (pages) {
  const idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('category')
    this.field('tags')
    this.field('keywords')
    this.field('content_text')

    pages.forEach(page => { this.add(mapPageToIndex(page)) })
  })

  return idx
}

/*
 * Builds store (not used by Lunr directly). This is an object
 */

function toStore (pages) {
  const store = pages.reduce((result, page) => {
    result[page.id] = mapPageToStore(page)
    return result
  }, {})

  return store
}

/*
 * Map pages to lunr index
 */

function mapPageToIndex (page) {
  return {
    ...page,
    content_text: unescape(striptags(page.content_html))
  }
}

/*
 * Map page to lunr store
 */

function mapPageToStore (page) {
  return {
    title: page.title,
    url: page.url
  }
}

/*
 * Export
 */

module.exports = {
  toIndex,
  toStore
}
