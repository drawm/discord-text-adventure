import {User} from "discord.js";
import Player from "./Player";
import {charToTile, Tile} from "./Tile";



export default class Dungeon {
    private players:Player[] = [];
    private map = `
  s       
  d       
 d.d      
  .       
  t `;
    private tiles:Tile[][] = [[]];
    private startPoint: Tile;

    constructor(){
       const charCount = this.map
           .trim()
           .split('')
           .filter(char => !!char && char !== ' ' && char !== '\n') // only char with non-whitespace
           .reduce<{[char:string]:number}>((acc, char)=>{
           acc[char] = (acc[char] ?? 0) + 1;
           return acc;
       }, {});

       console.log(charCount);
       this.tiles = this.map.split('\n')
           .map(line=>line.split('').map(charToTile))
           .filter(line => line.length > 1);

       this.tiles.forEach((tileRow, y) => {
           tileRow.forEach((tile, x) => {
               tile.neighbors = [
                   tileRow?.[x-1],
                   tileRow?.[x+1],
                   this.tiles[y-1]?.[x],
                   this.tiles[y+1]?.[x],
               ].filter(tile => !!tile);

               console.log(tile.neighbors.length)

               tile.isUnique = charCount[tile.char] === 1;
           })
       })

       this.startPoint = this.tiles.flat().find(tile => {
           console.log('tileRow.find', tile.char);
           return tile.char === 's';
       });
       console.log('startPoint', this.startPoint);
    }

    isUserInDungeon(user:User){
        return !!this.players.find(player => player.user.id === user.id);
    }

    enter(msg, user:User):Player|null{
        if(user.username === 'mats852'){
           msg.reply(`T'a pas ldroit!`);
        }
        if(!this.isUserInDungeon(user)){
            console.log(`New player ${user.username} join the game`)
            const player = new Player(user, this.startPoint);
            this.players.push(player);
            return player;
        }


        return null;
    }
}
