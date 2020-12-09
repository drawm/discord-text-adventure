import cli from `./env/cli`;
import discord from `./env/discord`;
const env = process.env.NODE_ENV;

if(env === 'prod'){
    discort()
} else {
    cli()
}
