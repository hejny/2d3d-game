import {Vector2} from './vector2';

export class Line2 {
    constructor(public point1: Vector2, public point2: Vector2) {
    }


    collidePoint(point: Vector2): boolean {

        let
            a1x = this.point1.x,
            a1y = this.point1.y,
            a2x = this.point2.x,
            a2y = this.point2.y,
            b1x = point.x,
            b1y = point.y;


        a2x -= a1x;
        a2y -= a1y;

        b1x -= a1x;
        b1y -= a1y;


        var aSlope = a2y / a2x;
        var bSlope = b1y / b1x;


        if (aSlope != bSlope)return false;

        var aDist = Vector2.distance0(this.point2);
        var bDist = Vector2.distance0(point);
        //var aDist = TOWNS.TMath.xy2dist(a2y, a2x);
        //var bDist = TOWNS.TMath.xy2dist(b1y, b1x);

        return (aDist >= bDist);

    }


    collideLine(line: Line2,edges:boolean): boolean {

        let
            a1x = this.point1.x,
            a1y = this.point1.y,
            a2x = this.point2.x,
            a2y = this.point2.y,
            b1x = line.point1.x,
            b1y = line.point1.y,
            b2x = line.point2.x,
            b2y = line.point2.y;

        var denominator = ((a2x - a1x) * (b2y - b1y)) - ((a2y - a1y) * (b2x - b1x));
        var numerator1 = ((a1y - b1y) * (b2x - b1x)) - ((a1x - b1x) * (b2y - b1y));
        var numerator2 = ((a1y - b1y) * (a2x - a1x)) - ((a1x - b1x) * (a2y - a1y));
        var collision;

        //console.log(denominator,numerator1,numerator2);

        //todo is it correct
        if(!edges && !numerator1)return false;

        // Detect coincident lines (has a problem, read below)
        if (denominator === 0) {


            //var collision= (numerator1 == 0 && numerator2 == 0);
            //collision=false;


            var bOnA = this.collidePoint(line.point1);
            var aOnB = line.collidePoint(this.point1);
            //var bOnA = TOWNS.TMath.isOnLine(a1x, a1y, a2x, a2y, b1x, b1y);
            //var aOnB = TOWNS.TMath.isOnLine(b1x, b1y, b2x, b2y, a1x, a1y);

            return (bOnA || aOnB);


        } else {

            //

            var r = numerator1 / denominator;
            var s = numerator2 / denominator;

            collision = ((r >= 0 && r <= 1) && (s >= 0 && s <= 1));

        }

        return collision;

    }


}