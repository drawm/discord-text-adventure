import {createInterface} from 'readline';

const readline = createInterface({
    input: process.stdin,
    output: process.stdout
});


const getAction = () => new Promise((resolve) => {
    readline.question('->', (name:string) => {
        resolve(name);
    });
})

export default async () => {
    let action = null;
    while(action = (await getAction())){
        console.log(action);
    }
}
