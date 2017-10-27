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
    this.field('title', { boost: 4 })
    this.field('url', { boost: 4 })
    this.field('category', { boost: 2 })
    this.field('tags')
    this.field('keywords')
    this.field('content_text')

    pages
      .filter(filterPage)
      .forEach(page => { this.add(mapPageToIndex(page)) })
  })

  return idx
}

/**
 * Discards pages that we don't want
 */

function filterPage (page) {
  // Those with @ are deprecated (eg, `react@0.14`)
  if (page.url.includes('@')) {
    return false
  }

  // Assets are obviously not supposed to be there
  if (page.url.match(/^\/assets/)) {
    return false
  }

  return true
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
    url: page.url,
    category: page.category,
    intro_text: striptags(page.intro_html)
  }
}

/*
 * Export
 */

module.exports = {
  toIndex,
  toStore
}
