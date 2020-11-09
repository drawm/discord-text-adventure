export class Tile {
    public neighbors: Tile[] = [];
    constructor(
        public char:string,
        public name:string,
        public shortDescription: string,
        public blocker:boolean = false,
        public interactive:boolean = false,
        public isUnique:boolean = false,
    ) {
    }
}

const TILES:{[tileChar:string]:()=>Tile} = {
    ' ': ()=> new Tile(' ', 'wall', 'a wall', true),
    '.': ()=> new Tile('.', 'passage', 'a passage', false),
    's': ()=> new Tile('s', 'start', 'the entrance', false),
    'd': ()=> new Tile('d', 'door', 'a door', true, true),
    't': ()=> new Tile('t', 'treasure', 'a treasure', false, true),
}

export function charToTile(char:string):Tile {
    return (TILES[char] ?? TILES[' '])();
}
