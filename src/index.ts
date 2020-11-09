import {APIMessage} from 'discord-api-types';
import * as Discord from 'discord.js';
import {Channel, Client, Message, MessageActivity, User} from "discord.js";
import Player from "./Player";
import Dungeon from "./Dungeon";
import {Tile} from "./Tile";
const client:Client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const dungeon = new Dungeon();

class DungeonMaster {
  constructor(private dungeon:Dungeon) {
  }

  describeTile(tile:Tile){
      if(tile.isUnique){

      }
    return tile.shortDescription
  }

  describeTiles(tiles:Tile[] = []){
    return tiles.map(tile => this.describeTile(tile)).join(', ');
  }
}
const dungeonMaster = new DungeonMaster(dungeon);


const commands = {
  enter: (msg)=>dungeon.enter(msg, msg.author),
  'enter dungeon': (msg)=>{
    const player = dungeon.enter(msg, msg.author);
    if(player){
      console.log(player)
      msg.reply(`You enter the Dungeon with ${player.hp}hp, a short sword and light armor.
 You stand on ${dungeonMaster.describeTile(player.position)}.
 You see ${dungeonMaster.describeTiles(player.position.neighbors.filter(tile=>tile.interactive))}, what is your next action?`)
    }
  },
  'nuke dungeon' : (msg) => msg.reply(':nuke: Boom! You and everyone else is dead...'),
  ping: (msg)=>msg.reply('Pong!'),
}


client.on('message', (msg:Message) => {
  if(msg.channel.id !== '775518545810817045'){
    return
  }

  console.log(msg)
  console.log(msg.content)


  const command = commands[msg.content.toLowerCase()];
  if(command){
    command(msg);
  }
});


client.login(process.env.DISCORD_TOKEN);

