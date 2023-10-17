start:
	docker compose --env-file .dev.env -f docker-compose.dev.yml up
stop:
	docker compose --env-file .dev.env -f docker-compose.dev.yml down
destroy:
	docker compose --env-file .dev.env -f docker-compose.dev.yml down -v
