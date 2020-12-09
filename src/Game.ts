import * as Discord from 'discord.js';
import {Client, Message} from "discord.js";
import Dungeon from "./Dungeon";
import {Tile} from "./Tile";
import {Scene, newScene} from "./Scene";
import Player from "./Player";
import {Description, newProp, Prop} from "./Prop";

const dungeon = new Dungeon();

class DungeonMaster {
    constructor(private dungeon: Dungeon) {
    }

    describeTile(tile: Tile) {
        if (tile.isUnique) {

        }
        return tile.shortDescription
    }

    describeTiles(tiles: Tile[] = []) {
        return tiles.map(tile => this.describeTile(tile)).join(', ');
    }
}

const dungeonMaster = new DungeonMaster(dungeon);

const doorDescription: Description = {
    name: 'door',
    shortDescription: 'a door, it seems unlocked',
    longDescription: 'a heavy wooden door with metal handle, it appears to be unlocked',
    multiple: 'doors',
    listable: 'a door',
}

const moveToScene = (scene: Scene) => (player: Player): void => {

};

const scenes: { [name: string]: Scene } = {};

scenes.sceneA = newScene(
    'room-a',
    'Dungeon Entrance',
    [
        newProp(
            'door-to-room-b',
            doorDescription,
            {
                open: moveToScene(scenes.sceneB),
            }
        )
    ],
);

scenes.sceneB = newScene(
    'room-b',
    'Barrack',
    [
        newProp(
            'door-to-room-a',
            doorDescription,
            {
                open: moveToScene(scenes.sceneA),
            }
        )
    ],
);


const commands = {
    enter: (msg: Message) => dungeon.enter(msg, msg.author),
    'enter dungeon': (msg: Message) => {
        const player = dungeon.enter(msg, msg.author);
        if (player) {
            msg.reply(`You enter the Dungeon with ${player.hp}hp, a short sword and light armor.
 You stand on ${dungeonMaster.describeTile(player.position)}.
 You see ${dungeonMaster.describeTiles(player.position.neighbors.filter(tile => tile.interactive))}, what is your next action?`)
        }
    },


    'nuke dungeon': (msg: Message) => msg.reply(':nuke: Boom! You and everyone else is dead...'),
    'ping': (msg: Message) => msg.reply('Pong!'),
}
