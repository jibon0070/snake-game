export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(velocity) {
        this.x += velocity.x;
        this.y += velocity.y;
    }
}