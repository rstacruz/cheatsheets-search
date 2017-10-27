-include ./Makefile.config

npmbin := ./node_modules/.bin

update: \
	public/CNAME \
	public/.nojekyll \
	public/v1/search.js \
	public/v1/index.json

deploy: update deploy-run

deploy-run:
	$(npmbin)/git-update-ghpages \
		--force --branch gh-pages \
		${REPO} public

public/v1/index.json:
	mkdir -p public/v1
	env DEBUG="app:*" node lib/indexer/cli.js \
		--input "${HOST}/data/search-index.json" \
		> $@

public/v1/search.js: public/v1/index.json
	mkdir -p public/v1
	$(npmbin)/webpack -p \
		--config lib/webpack/webpack.config.js

public/CNAME:
	mkdir -p public
	echo "${CNAME}" > $@

public/.nojekyll:
	mkdir -p public
	echo "" > $@
