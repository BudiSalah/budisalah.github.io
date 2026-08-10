.DEFAULT_GOAL := help

.PHONY: help install dev build preview clean

help: ## Show this help
	@grep -E '^[a-z-]+:.*##' $(MAKEFILE_LIST) | sed 's/:.*##/\t/' | expand -t 12

install: ## Install dependencies
	npm install

dev: ## Run the dev server on :3000
	npm run dev

build: ## Build the single-file site into dist/
	npm run generate

preview: ## Serve dist/ on :4173
	npx -y serve dist -l 4173

clean: ## Remove build output
	rm -rf dist .output .nuxt
