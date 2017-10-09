import {Vector2} from '../classes/vector2'
import {BOUNDS} from "../config";

export interface ISnake{
    length: number,
    headRotation: number;
    segments: Vector2[];
}
export interface IFood{
    position: Vector2;
    rotation: number;
    size: number;
    speed: number;
    rotationError: number;

}
/*export enum IWallType {
    WALL,
    SPACE
}*/
export interface IWall{
    position: Vector2;
    radius: number,
    radiusDest: number
}

export enum IGamePhase {
    //BEFORE,
    PLAY,
    PAUSE,
    //AFTER
}
export interface IGame{
    started: number;
    updated: number;
    phase: IGamePhase;
    score: number;
    snake: ISnake;
    foods: IFood[];
    walls: IWall[];
}

//todo separate files for snake, food, wall
export function wallCollide(wall:IWall,point:Vector2,bounds:number=0):boolean{
    return Vector2.distance(wall.position,point)<=wall.radiusDest-bounds;
}

//todo ?should it be pure function???
export function spawnRandomFoods(wall:IWall,density:number,foods:IFood[]):void{

    if(density>1 || density<0){
        throw new Error('Density should be between 0 and 1.');
    }

    const volume = Math.pow(wall.radiusDest,2)*Math.PI*2;
    let volumeFoods = 0;

    //console.log(volumeFoods , volume*density);

    //while (volumeFoods < volume*density) {

        const size = Math.random()*10+10;
        const speed = (Math.random()+0.5)*0.1;

        volumeFoods += Math.PI*size*size/4;

        //console.log('Spawning food.');
        foods.push({
            position:Vector2.randomCircle(wall.position,wall.radiusDest),
            rotation:0,
            size,speed,
            rotationError: (Math.random()-0.5)*Math.PI*2*(3/4)
        });

    //}
}


/*
export function wallSnap(wall:IWall,point:Vector2,bounds:number=0):Vector2{

    return new Vector2(0,0);

    const rotation = Math.atan2(point.y-wall.position.y,point.x-wall.position.x);

    return new Vector2(
        wall.position.x+Math.cos(rotation)*(wall.radius-bounds),
        wall.position.y+Math.sin(rotation)*(wall.radius-bounds)
    )

}*/


/*
export function wallOnCorner(wall:IWall,point:Vector2,bounds:number=0):boolean{
    let corners = 0;
    if(wall.position.x+wall.radius.x/2-bounds<point.x)corners++;
    if(wall.position.y+wall.radius.y/2-bounds<point.y)corners++;
    if(wall.position.x-wall.radius.x/2+bounds>point.x)corners++;
    if(wall.position.y-wall.radius.y/2+bounds>point.y)corners++;
    return corners>=2;
}

export function wallCollideOnlyLine(wall:IWall,point:Vector2,bounds:number=0):boolean{
    if(wallOnCorner(wall,point,bounds)){
        return(true);
    }else{
        return(wallCollide(wall,point,bounds));
    }
}

export function wallSnapOnlyLine(wall:IWall,point:Vector2,bounds:number=0):Vector2{
    if(wallOnCorner(wall,point,bounds)){
        return(point);
    }else{
        return(wallSnap(wall,point,bounds));
    }
}


function createRandomCorners(){
    return {
        a: Math.floor(Math.random()*1000)%10,
        b: Math.floor(Math.random()*1000)%10,
        c: Math.floor(Math.random()*1000)%10,
        d: Math.floor(Math.random()*1000)%10
    }
}*/

export function createGame():IGame{

    let walls=[];

    walls.push({
        position: new Vector2(0,0),
        radius: 250,
        radiusDest: 250,
    });

    walls.push({
        position: new Vector2(100,300),
        radius: 100,
        radiusDest: 150
    });


    let foods=[];
    for(let wall of walls){
        spawnRandomFoods(wall,0.002,foods);//todo food density as const in config
    }



    return {

        started: (new Date()).getTime(),
        updated: null,


        phase: IGamePhase.PLAY,
        score: 0,


        snake: {

            length: 300,
            headRotation: 0,
            segments:[
                {x: 0, y: 0}
            ]


        },
        foods,
        walls

    };


};