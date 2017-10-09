export class Vector2 {

    static distance0(vector: Vector2) {
        return (Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2)));
    }

    static distance(vectorA: Vector2, vectorB: Vector2) {
        return (Math.sqrt(Math.pow(vectorA.x - vectorB.x, 2) + Math.pow(vectorA.y - vectorB.y, 2)));
    }

    static add(vectorA: Vector2, vectorB: Vector2) {
        return (new Vector2(
            vectorA.x + vectorB.x,
            vectorA.y + vectorB.y
        ));
    }

    static subtract(vectorA: Vector2, vectorB: Vector2) {
        return (new Vector2(
            vectorA.x - vectorB.x,
            vectorA.y - vectorB.y
        ));
    }

    static random(rangeX: number, rangeY: number, centerX: number = 0, centerY: number = 0) {
        return (new Vector2(
            (Math.random() - 0.5) * rangeX + centerX,
            (Math.random() - 0.5) * rangeY + centerY
        ));
    }

    static randomCircle(center: Vector2, maxRadius: number) {

        const rotation = Math.random() * Math.PI * 2;
        const radius = Math.random() * maxRadius;

        return (new Vector2(
            center.x + Math.cos(rotation) * radius,
            center.y + Math.sin(rotation) * radius
        ));
    }

    constructor(public x: number, public y: number) {
    }

}
