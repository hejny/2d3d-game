import {IGame} from '../model/game'
import {Vector2} from '../classes/vector2'
import {renderSnake} from './render-snake'
import {renderFoods} from './render-foods'
import {renderWalls} from './render-walls'

export function render(ctx:CanvasRenderingContext2D, game:IGame){


    const durationGame = game.updated - game.started;


    ctx.fillStyle = '#333333';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);




    ctx.fillStyle = '#f00';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(100,50);
    ctx.lineTo(50, 100);
    ctx.lineTo(0, 90);
    ctx.closePath();
    ctx.fill();




}