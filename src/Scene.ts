import Player from "./Player";
import {Prop} from "./Prop";

export type Scene = {
    name: string,
    id: string,
    players: Player[],
    npcs: Player[],
    props: Prop[],
}

export const newScene = (
    id: string,
    name: string,
    props: Prop[] = [],
    npcs: Player[] = [],
): Scene => {
    return {
        name,
        id,
        props,
        npcs,
        players:[],
    };
}