import Player from "./Player";

export type Interaction = (player:Player) => void;
type Interactions = {
    [name: string]: Interaction,
}

export type Description = {
    name: string,
    shortDescription: string,
    longDescription: string,
    multiple: string,
    listable: string,
}

export type Prop = {
    id: string,
    description: Description,
    interactions: Interactions,
}

export const newProp = (
    id: string,
    description: Description,
    interactions: Interactions = {},
): Prop => {
    return {
        id,
        description,
        interactions,
    };
}