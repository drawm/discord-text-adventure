dev:
	NODE_ENV=cli yarn start
start:
	DISCORD_TOKEN="${DISCORD_TOKEN:-supply a token}" NODE_ENV=prod yarn start
