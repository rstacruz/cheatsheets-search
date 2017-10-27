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

```
https://search.devhints.io/search.js
```

Has the following API:

```
const Search = window.Search

Search.search('react')
=> [
  {
    ref: 'react', score: 0.985,
    object: { title: 'React', url: '/react', category: 'React' }
  }
]
