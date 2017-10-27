-include ./Makefile.config

npmbin := ./node_modules/.bin

update: \
	public/CNAME \
	public/.nojekyll \
	public/search.js \
	public/index.json

deploy: update deploy-run

deploy-run:
	$(npmbin)/git-update-ghpages \
		--force --branch gh-pages \
		${REPO} public

public/index.json:
	mkdir -p public
	env DEBUG="app:*" node lib/indexer/cli.js \
		--input "${HOST}/data/search-index.json" \
		> $@

public/search.js: public/index.json
	$(npmbin)/webpack \
		--config lib/webpack/webpack.config.js

public/CNAME:
	echo "${CNAME}" > $@

public/.nojekyll:
	echo "" > $@
