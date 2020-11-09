import {User} from "discord.js";
import {Tile} from "./Tile";

export default class Player{
    public hp:number = 20;
    constructor(private user:User, public position:Tile){

    }
}

