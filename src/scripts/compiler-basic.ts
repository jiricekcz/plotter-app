
/**
 * 
 * @param shapeCode Code in the form of shape code.
 * @returns Plotter assembly code
 * @see https://github.com/jiricekcz/plotter-app/blob/main/language-docs/plotter-assembly.md
 * @see https://github.com/jiricekcz/plotter-app/blob/main/language-docs/shape-code.md
 */
export function compile(shapeCode: string): string {
    try {
        const segments = segmentize(shapeCode.trim());
        return segments.map(s => s.pss).join("\n");
    } catch (e) {
        if (e instanceof Error) return e.message;
    }

    throw new Error("Not implemented.");
}
export function segmentize(shapeCode: string): Array<Segment> {
    const lines = shapeCode.split("\n").map(v => v.trim());
    return lines.map(v => Segment.parse(v));

}
export abstract class Segment {
    abstract toString(): string;
    abstract arguments: Array<string | number>;
    abstract get pss(): string;
    static parse(segment: string): Segment {
        let mode: "name" | "arguments" = "name"
        let name = "";
        let args = "";
        for (const char of segment.trim()) {
            if (mode == "name" && char == "(") {
                mode = "arguments";
                continue;
            } else if (mode == "name" && char == ";" || mode == "arguments" && char == ")") {
                break;
            }

            if (mode == "name") {
                name += char;

            } else if (mode == "arguments") {
                args += char;
            }
        }
        const argsParsed = args.replaceAll(" ", "").split(",").map(v => {
            if (Number.isNaN(Number(v))) return v;
            return Number(v);
        });
        switch (name) {
            case "circle":
                if (argsParsed.length != 3 || !argsParsed.every(v => typeof v == "number")) throw new Error("Invalid use of the circle shape. Expected 3 number arguments.")
                return new Circle(...(<[number, number, number]>argsParsed));
            case "regPolygon":
                if (argsParsed.length != 5 && argsParsed.length != 4 || !argsParsed.every(v => typeof v == "number")) throw new Error("Invalid use of the regular polygon shape. Expected 4 or 5 number arguments.")
                return new RegularPolygon(...(<[number, number, number, number, number]>argsParsed));
            case "line":
                if (argsParsed.length != 4 || !argsParsed.every(v => typeof v == "number")) throw new Error("Invalid use of the line shape. Expected 4 number arguments.")
                return new Line(...(<[number, number, number, number]>argsParsed));
            case "point":
                if (argsParsed.length != 2 || typeof argsParsed[0] !== "number" || typeof argsParsed[1] !== "number") throw new Error("Invalid use of the point shape. Expected 2 number arguments.")
                return new Point(argsParsed[0], argsParsed[1]);
            default:
                throw new Error("Invalid segemnt.");
        }
    }
}
export class Point extends Segment {
    readonly x: number;
    readonly y: number;
    arguments: [number, number];
    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.arguments = [x, y];
    }
    toString(): string {
        return `point(${this.x}, ${this.y});`
    }
    get pss(): string {
        return `goto ${this.x} ${this.y}\npush\npull`;
    }
}
export class Line extends Segment {
    readonly x1: number;
    readonly y1: number;
    readonly x2: number;
    readonly y2: number;
    arguments: [number, number, number, number];
    constructor(x1: number, y1: number, x2: number, y2: number) {
        super();
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.arguments = [x1, y1, x2, y2];
    }
    toString(): string {
        return `line(${this.arguments.join(", ")});`
    }
    get pss(): string {
        return `goto ${this.x1} ${this.y1}\npush\ngoto ${this.x2} ${this.y2}\npull`;
    }
}
export class RegularPolygon extends Segment {
    readonly x: number;
    readonly y: number;
    readonly r: number;
    readonly n: number;
    readonly rotation: number;
    readonly arguments: [number, number, number, number, number];
    constructor(x: number, y: number, radius: number, n: number, rotation = 0) {
        super();
        this.x = x;
        this.y = y;
        this.r = radius;
        this.n = n;
        this.rotation = rotation;
        this.arguments = [x, y, radius, n, rotation];
    }
    get pss(): string {
        const points = this.getPoints();
        let rv = `goto ${points[0].join(" ")}\npush\n`;
        for (let i = 1; i < points.length; i++) {
            rv += `goto ${points[i].join(" ")}\n`;
        }
        rv += `goto ${points[0].join(" ")}\npull`;
        return rv;
    }
    toString(): string {
        return `regPolygon(${this.x, this.y, this.r, this.n, this.rotation})`;
    }
    private getPoints(): Array<[number, number]> {
        const angleIncrement = Math.PI * 2 / this.n;
        const rv: Array<[number, number]> = [];
        for (let i = 0; i < this.n; i++) {
            rv.push(movePointPolar([this.x, this.y], this.r, angleIncrement * i + this.rotation));
        }
        return rv;
    }
}
export class Circle extends RegularPolygon {
    constructor(x: number, y: number, r: number) {
        super(x, y, r, Math.round(2 * Math.PI * r / 1));
    }
}
export function movePointPolar(point: [number, number], mag: number, angle: number): [number, number] {
    const x = Math.cos(angle) * mag + point[0];
    const y = Math.sin(angle) * mag + point[1];
    return [x, y];
}