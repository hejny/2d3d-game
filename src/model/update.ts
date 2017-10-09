import IGameData from '../interfaces/IGameData'

export default function update(game: IGameData): IGameData {

    const currentTime = (new Date()).getTime(); //todo provider

    //const lastUpdated = game.updated || game.started;
    game.updated = currentTime;

    return game; //todo create new object
}