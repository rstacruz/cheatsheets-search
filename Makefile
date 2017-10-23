-include ./Makefile.config

npmbin := ./node_modules/.bin

build: public/index.json

update: public/CNAME public/index.json

deploy: update
	$(npmbin)/git-update-ghpages \
		--force --branch gh-pages \
		${REPO} public

public/index.json:
	mkdir -p public
	env DEBUG="app:*" node lib/search/build_index.js \
		--input "${HOST}/data/search-index.json" \
		> $@

public/CNAME:
	echo "${CNAME}" > $@

.PHONY: index.json
