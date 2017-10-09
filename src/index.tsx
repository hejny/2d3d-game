import './style/index.css';
import * as _ from "lodash";
import {createGame,IGame,IGamePhase} from './model/game';
import {update} from './model/update';
import {render} from './render/render';
import {Vector2} from "./classes/vector2";
const gamee = (window as any).gamee;//todo import gamee from 'gamee';


const canvas = document.getElementById("scene") as HTMLCanvasElement;
const boundingClientRect = canvas.getBoundingClientRect();
canvas.width=boundingClientRect.width;
canvas.height=boundingClientRect.height;
const ctx = canvas.getContext("2d");




let game:IGame=null;// = createGame();


let pointerX = 0,pointerY = 0;//todo Vector2
canvas.addEventListener('pointermove',(event)=> {
    pointerX = canvas.width / 2 - event.clientX;
    pointerY = canvas.height / 2 - event.clientY;
});




const updateState = _.debounce(function(game:IGame){
    gamee.gameSave(game);//todo why Uncaught data provided to gameSave function must be object
},1000);



function drawLoop() {
    if(game) {

        //const durationGame = game.updated - game.started;
        //const pointerDistance = Vector2.distance0(new Vector2(pointerX,pointerY));
        //const px = Math.cos(durationGame/100)*pointerDistance/10;//todo screen
        //const py = Math.sin(durationGame/100)*pointerDistance/10;
        const cursorRotation = Math.atan2(pointerY, pointerX) + Math.PI;


        game = update(game,cursorRotation,(new Date()).getTime());

        if(!game){
            gamee.gameOver();
        }else {

            updateState(game);
            gamee.updateScore(game.score);
            render(ctx, game);

        }

    }

    window.requestAnimationFrame(drawLoop);
}



let saveState: IGame = null;
gamee.gameInit("FullScreen", {}, ["saveState"], function(/*error,*/ data) {


    try{
        saveState = JSON.parse(data.saveState);
    }catch(error){
        console.warn(error);
    }


    gamee.gameReady(function(error) {
        if(error !== null){
            console.warn(error)
        }

        window.requestAnimationFrame(drawLoop);


    });

});



// Will be emitted when user will start game or restart it.
gamee.emitter.addEventListener("start", function(event) {
    console.log('Gamee emits start.');

    if(saveState){
        game = saveState;
        game.updated = (new Date()).getTime();
    }else{
        game = createGame();
    }

    //game.phase = IGamePhase.PLAY;//todo send action
    event.detail.callback();
});

// Will be emitted when user paused the game.
gamee.emitter.addEventListener("pause", function(event) {
    console.log('Gamee emits pause.');

    game.phase = IGamePhase.PAUSE;//todo send action
    event.detail.callback();
});

// Will be emitted after user resumes the game after
// pause or GameeApp suspension.
gamee.emitter.addEventListener("resume", function(event) {
    console.log('Gamee emits resume.');

    game.phase = IGamePhase.PLAY;//todo send action
    game.updated = (new Date()).getTime();
    event.detail.callback();
});

// Will be emitted when user clicks the mute button
// and the game must mute all game sounds.
gamee.emitter.addEventListener("mute", function(event) {
    console.log('Gamee emits mute.');

    event.detail.callback();
});

// Will be emitted when user clicks the unmute button
// and the game should unmute all game sounds.
gamee.emitter.addEventListener("unmute", function(event) {
    console.log('Gamee emits unmute.');

    event.detail.callback();
});