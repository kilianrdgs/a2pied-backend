.PHONY: dev build prod fix

dev:
	npm run dev
build:
	npm run build	
prod:
	docker compose up -d --build
	docker compose logs -f api
fix:
	npm run fix