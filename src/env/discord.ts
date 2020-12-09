import * as Discord from 'discord.js';
import {Client, Message} from "discord.js";

export default ()=>{

    const client: Client = new Discord.Client();

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('message', (msg: Message) => {
        if (msg.channel.id !== '775518545810817045' && msg.content[0] !== '!') {
            return
        }

        const command = commands[msg.content.toLowerCase()];
        if (command) {
            command(msg);
        }
    });

    client.login(process.env.DISCORD_TOKEN);

}
