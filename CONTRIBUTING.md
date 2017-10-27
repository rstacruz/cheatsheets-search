# Developer notes

**Update and deploy:** This will update `/public` (a gitignored path) and deploy it onto the `gh-pages` branch.

```
make -B deploy
```

**Update-only:** You can also update only (no deploy) to inspect what goes on.

```
make -B update
```

## search.js

search.devhints.io exposes a search.js that you can use as a plain JS script. It's much more preferable to use an async loader like loadjs though:

```html
<script src='https://search.devhints.io/v1/search.js'></script>
```

Exposes the following API:

```js
const Search = window.Search
```

```js
→ Search.search('react')
  [
    {
      ref: 'react', score: 0.985,
      object: { title: 'React', url: '/react', category: 'React' }
    }
  ]
