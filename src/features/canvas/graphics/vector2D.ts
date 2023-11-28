export class Vec2D {
    x: number
    y: number
    len: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.len = Math.sqrt(x * x + y * y)
    }

    public '+'(vector: Vec2D): Vec2D {
        return new Vec2D(this.x + vector.x, this.y + vector.y)
    }

    public '-'(vector: Vec2D): Vec2D {
        return new Vec2D(this.x - vector.x, this.y - vector.y)
    }

    public '*'(vector: Vec2D): Vec2D {
        return new Vec2D(this.x * vector.x, this.y * vector.y)
    }

    public '/'(vector: Vec2D): Vec2D {
        return new Vec2D(this.x / vector.x, this.y / vector.y)
    }

    public '==='(vector: Vec2D): boolean {
        return this.x === vector.x && this.y === vector.y
    }

    public '=='(vector: Vec2D): boolean {
        return this.len === vector.len
    }

    public '<'(vector: Vec2D): boolean {
        return this.len < vector.len
    }

    public '>'(vector: Vec2D): boolean {
        return this.len > vector.len
    }

    public line(vector: Vec2D): string[] {
        const dots = []
        for (let t = 0; t < 1; t += 0.0001) {
            dots.push(
                `${Math.floor(this.x + (vector.x - this.x) * t)};${Math.floor(
                    this.y + (vector.y - this.y) * t,
                )}`,
            )
        }
        return [...new Set(dots)]
    }

    public lineLength(vector: Vec2D): number {
        return Math.floor(
            Math.sqrt(
                Math.pow(Math.abs(this.x - vector.x), 2) +
                    Math.pow(Math.abs(this.y - vector.y), 2),
            ),
        )
    }

    public circle(radius: number): string[] {
        const dots = []
        for (let t = 0; t < 2 * Math.PI; t += 0.0001) {
            dots.push(
                `${Math.floor(this.x + radius * Math.cos(t))};${Math.floor(
                    this.y + radius * Math.sin(t),
                )}`,
            )
        }
        return [...new Set(dots)]
    }

    public rotateCircle(
        objects: Vec2D[],
        clockSide: boolean,
        tick: number,
        speed: number,
    ): Vec2D[] {
        const newObjects = []
        for (const object of objects) {
            const angle = Math.acos(
                (this.x - object.x) / this.lineLength(object),
            )
            newObjects.push(
                new Vec2D(
                    this.x +
                        Math.floor(
                            this.lineLength(object) *
                                Math.cos(angle + tick / speed),
                        ) *
                            (clockSide ? -1 : 1),
                    this.y +
                        Math.floor(
                            this.lineLength(object) *
                                Math.sin(angle + tick / speed),
                        ),
                ),
            )
        }
        return newObjects
    }
}
