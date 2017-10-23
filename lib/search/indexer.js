const lunr = require('lunr')
const striptags = require('striptags')

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
 * Builds lunr store
 */

function toStore (pages) {
  return pages.map(mapPageToStore)
}

/*
 * Map pages to lunr index
 */

function mapPageToIndex (page) {
  return {
    ...page,
    content_text: striptags(page.content_html)
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
