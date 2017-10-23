HOST ?= https://devhints.io
build: public/index.json

public/index.json:
	mkdir -p public
	env DEBUG="app:*" node lib/search/build_index.js \
		--input "${HOST}/data/search-index.json" \
		> $@

.PHONY: index.json
